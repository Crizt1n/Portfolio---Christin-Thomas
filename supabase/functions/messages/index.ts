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

    // POST /messages - Public endpoint for contact form
    if (req.method === "POST") {
      const body = await req.json();
      const { name, email, subject, message } = body;

      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ error: "Name, email, and message are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data, error } = await supabaseClient
        .from("messages")
        .insert([{ name, email, subject: subject || "", message }])
        .select()
        .single();

      if (error) throw error;

      console.log("New message received:", { name, email });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Message sent successfully",
          data,
        }),
        {
          status: 201,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // GET /messages - Admin only
    if (req.method === "GET") {
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

      const { data, error } = await supabaseClient
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in messages function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
