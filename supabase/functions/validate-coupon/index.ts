
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Special school codes that have unlimited uses but can't be used by the same email twice
const UNLIMITED_SCHOOL_CODES = ['PVAMU', 'TEXAS', 'TULANE'];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get parameters from request
    const requestData = await req.json();
    const { code, email, ticketType } = requestData;
    
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

    // Check if it's a group ticket - discounts don't apply to groups
    const isGroupTicket = ticketType === 'student-group';
    
    if (isGroupTicket) {
      return new Response(
        JSON.stringify({
          isValid: false,
          message: "Discount codes cannot be applied to group tickets"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
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

    // Log the coupon code being validated for debugging
    console.log(`Validating coupon code: ${code.toUpperCase()}`);

    // Query the coupon_codes table
    const upperCaseCode = code.toUpperCase();
    
    // First check if this is one of our special unlimited school codes
    if (UNLIMITED_SCHOOL_CODES.includes(upperCaseCode)) {
      console.log(`Processing unlimited school code: ${upperCaseCode}`);
      
      // For school codes, we need to check if this email has used it before
      if (email) {
        // Check if email has used this code before
        const { data: usageData, error: usageError } = await supabaseAdmin
          .from('conference_registrations')
          .select('id')
          .eq('coupon_code', upperCaseCode)
          .eq('email', email)
          .limit(1);
          
        if (usageError) {
          console.error("Error checking coupon usage history:", usageError);
          return new Response(
            JSON.stringify({
              isValid: false,
              message: "Error validating school code"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        if (usageData && usageData.length > 0) {
          // This email has already used this coupon code
          return new Response(
            JSON.stringify({
              isValid: false,
              message: "You have already used this coupon code"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Email hasn't used this code before, so it's valid
        // Hardcoded discount for school codes
        return new Response(
          JSON.stringify({
            isValid: true,
            message: "School code is valid",
            discount: { type: "percentage", amount: 100 } // 100% discount for school codes
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } else {
        // Email is required for school codes
        return new Response(
          JSON.stringify({
            isValid: false,
            message: "Email is required to use school discount codes"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    
    // Now using the get_coupon_by_code database function
    const { data: couponData, error: dbError } = await supabaseAdmin.rpc(
      'get_coupon_by_code',
      { coupon_code_param: upperCaseCode }
    );
      
    if (dbError) {
      console.error("Database error:", dbError);
      
      // Try a direct query as a fallback
      const { data: fallbackData, error: fallbackError } = await supabaseAdmin
        .from('coupon_codes')
        .select('*')
        .eq('code', upperCaseCode)
        .eq('is_active', true)
        .maybeSingle();
        
      if (fallbackError || !fallbackData) {
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
      
      // Check if coupon has reached max uses
      if (fallbackData.max_uses !== null && fallbackData.current_uses >= fallbackData.max_uses) {
        return new Response(
          JSON.stringify({
            isValid: false,
            message: "This coupon has reached its maximum number of uses"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Check if coupon has expired
      if (fallbackData.expires_at && new Date(fallbackData.expires_at) < new Date()) {
        return new Response(
          JSON.stringify({
            isValid: false,
            message: "This coupon has expired"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Coupon is valid
      return new Response(
        JSON.stringify({
          isValid: true,
          message: "Coupon is valid",
          discount: {
            type: fallbackData.discount_type,
            amount: parseFloat(fallbackData.discount_amount)
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Check if coupon exists and is valid from the DB function response
    if (!couponData || (Array.isArray(couponData) && couponData.length === 0)) {
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
        console.log(`Using demo coupon: ${upperCaseCode}`);
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
    
    // Extract data from the database function response
    const coupon = Array.isArray(couponData) ? couponData[0] : couponData;
    
    console.log("Coupon data from database:", coupon);
    
    // Return the validated coupon details
    return new Response(
      JSON.stringify({
        isValid: true,
        message: "Coupon is valid",
        discount: {
          type: coupon.discount_type,
          amount: parseFloat(coupon.discount_amount)
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error validating coupon:", error);
    return new Response(
      JSON.stringify({
        isValid: false,
        message: "Server error validating coupon"
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
