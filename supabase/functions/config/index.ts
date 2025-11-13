import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", // ✅ use service key here
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // GET /config - Public endpoint
    if (req.method === "GET") {
      const { data, error } = await supabaseClient
        .from("site_config")
        .select("*");

      if (error) throw error;

      // Convert array to object for easier access
      const configObj = data.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {});

      return new Response(JSON.stringify({ success: true, data: configObj }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // PATCH /config - Admin only
    if (req.method === "PATCH") {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: adminData } = await supabaseClient
        .from("admin_users")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (!adminData) {
        return new Response(
          JSON.stringify({ error: "Forbidden: Admin access required" }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const body = await req.json();

      // Update each config key-value pair
      for (const [key, value] of Object.entries(body)) {
        const { error } = await supabaseClient
          .from("site_config")
          .update({
            value: value as string,
            updated_at: new Date().toISOString(),
          })
          .eq("key", key);

        if (error) {
          console.error(`Error updating config key ${key}:`, error);
          throw error;
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Configuration updated successfully",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in config function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
