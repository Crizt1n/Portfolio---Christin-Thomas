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

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    // GET /skills - Public endpoint
    if (req.method === "GET") {
      const { data, error } = await supabaseClient
        .from("skills")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify admin access for write operations
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

    // POST /skills - Create or update skill
    if (req.method === "POST") {
      const { id, name, category, proficiency, order_index } = body;

      if (id) {
        // Update existing skill
        const { data, error } = await supabaseClient
          .from("skills")
          .update({
            name,
            category,
            proficiency,
            order_index,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        // Create new skill
        const { data, error } = await supabaseClient
          .from("skills")
          .insert([{ name, category, proficiency, order_index }])
          .select()
          .single();

        if (error) {
          console.error("Error inserting skill:", error);
          throw error;
        }

        return new Response(JSON.stringify({ success: true, data }), {
          status: 201,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // DELETE /skills/:id
    if (req.method === "DELETE") {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");

      if (!id) {
        return new Response(JSON.stringify({ error: "Skill ID required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error } = await supabaseClient
        .from("skills")
        .delete()
        .eq("id", id);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, message: "Skill deleted" }),
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
    console.error("Error in skills function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
