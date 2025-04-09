
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get parameters from request
    const { code } = await req.json();
    
    if (!code || typeof code !== 'string') {
      return new Response(
        JSON.stringify({ 
          isValid: false, 
          message: "Missing or invalid coupon code" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      {
        auth: {
          persistSession: false
        }
      }
    );

    // For demo purposes, implementing a basic validation pattern
    // In a real application, this would query a coupons table
    // with validation logic for expiration, maximum uses, etc.

    // Example fixed coupon codes for testing
    const validCoupons = {
      "DEMO25": { type: "percentage", amount: 25 },
      "DEMO50": { type: "percentage", amount: 50 },
      "DEMO100": { type: "percentage", amount: 100 },
      "DEMO10DOLLARS": { type: "fixed", amount: 10 },
      "DEMO25DOLLARS": { type: "fixed", amount: 25 },
      "EARLYBIRD2025": { type: "percentage", amount: 15 }
    };

    const upperCaseCode = code.toUpperCase();
    
    if (upperCaseCode in validCoupons) {
      return new Response(
        JSON.stringify({
          isValid: true,
          message: "Coupon is valid",
          discount: validCoupons[upperCaseCode as keyof typeof validCoupons]
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    return new Response(
      JSON.stringify({
        isValid: false,
        message: "Invalid coupon code"
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error validating coupon:", error);
    
    return new Response(
      JSON.stringify({
        isValid: false,
        message: "Error processing coupon",
        error: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
