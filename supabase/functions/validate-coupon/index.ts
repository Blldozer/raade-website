
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

    // Query the coupon_codes table
    const upperCaseCode = code.toUpperCase();
    
    const { data: couponData, error: dbError } = await supabaseAdmin
      .from('coupon_codes')
      .select('*')
      .eq('code', upperCaseCode)
      .eq('is_active', true)
      .maybeSingle();
      
    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({
          isValid: false,
          message: "Error validating coupon"
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Check if coupon exists and is valid
    if (!couponData) {
      // Fallback to hardcoded coupons for testing/demo purposes
      const demoValidCoupons = {
        "DEMO25": { type: "percentage", amount: 25 },
        "DEMO50": { type: "percentage", amount: 50 },
        "DEMO100": { type: "percentage", amount: 100 },
        "DEMO10DOLLARS": { type: "fixed", amount: 10 },
        "DEMO25DOLLARS": { type: "fixed", amount: 25 },
        "EARLYBIRD2025": { type: "percentage", amount: 15 }
      };
      
      if (upperCaseCode in demoValidCoupons) {
        return new Response(
          JSON.stringify({
            isValid: true,
            message: "Demo coupon is valid",
            discount: demoValidCoupons[upperCaseCode as keyof typeof demoValidCoupons]
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({
          isValid: false,
          message: "Invalid coupon code"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Check if coupon is expired
    if (couponData.expires_at && new Date(couponData.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({
          isValid: false,
          message: "Coupon has expired"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Check max usage limit if set
    if (couponData.max_uses !== null && couponData.current_uses >= couponData.max_uses) {
      return new Response(
        JSON.stringify({
          isValid: false,
          message: "Coupon usage limit reached"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Create the discount object based on the discount type
    const discount = {
      type: couponData.discount_type as "percentage" | "fixed",
      amount: Number(couponData.discount_amount)
    };
    
    // Increment the current_uses count via RPC call
    const { data: usageData, error: usageError } = await supabaseAdmin.rpc(
      'increment_coupon_usage',
      { coupon_code_param: upperCaseCode }
    );
    
    if (usageError) {
      console.error("Error incrementing coupon usage:", usageError);
      // We still continue since validation was successful
    }
    
    return new Response(
      JSON.stringify({
        isValid: true,
        message: "Coupon is valid",
        discount,
        couponId: couponData.id
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
