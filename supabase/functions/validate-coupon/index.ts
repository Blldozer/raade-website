
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Special school codes that have unlimited uses but can't be used by the same email twice
const UNLIMITED_SCHOOL_CODES = ['PVAMU', 'TEXAS', 'TULANE'];

// For debugging purposes, create a helper function to log the process
function logDebug(requestId: string, message: string, data?: any) {
  console.log(`[${requestId}] ${message}`, data ? JSON.stringify(data) : '');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Generate a unique request ID for tracking
  const requestId = crypto.randomUUID().substring(0, 8);
  logDebug(requestId, "Starting coupon validation");

  try {
    // Get parameters from request
    const requestData = await req.json();
    const { code, email, ticketType } = requestData;
    
    logDebug(requestId, "Received request data", { code, email, ticketType });
    
    if (!code || typeof code !== 'string') {
      logDebug(requestId, "Missing or invalid coupon code");
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
      logDebug(requestId, "Group ticket - discounts not applicable");
      return new Response(
        JSON.stringify({
          isValid: false,
          message: "Discount codes cannot be applied to group tickets"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    logDebug(requestId, "Initializing Supabase client", { 
      hasUrl: !!supabaseUrl, 
      hasKey: !!supabaseServiceRoleKey 
    });

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      logDebug(requestId, "Missing Supabase environment variables");
      return new Response(
        JSON.stringify({
          isValid: false,
          message: "Server configuration error"
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          persistSession: false
        }
      }
    );

    // Query the coupon_codes table directly
    const upperCaseCode = code.toUpperCase();
    logDebug(requestId, `Checking coupon code: ${upperCaseCode}`);
    
    // First check if it's a demo coupon
    const demoValidCoupons = {
      "DEMO25": { type: "percentage", amount: 25 },
      "DEMO50": { type: "percentage", amount: 50 },
      "DEMO100": { type: "percentage", amount: 100 },
      "DEMO10DOLLARS": { type: "fixed", amount: 10 },
      "DEMO25DOLLARS": { type: "fixed", amount: 25 },
      "EARLYBIRD2025": { type: "percentage", amount: 15 }
    };
    
    if (upperCaseCode in demoValidCoupons) {
      logDebug(requestId, "Demo coupon found", demoValidCoupons[upperCaseCode as keyof typeof demoValidCoupons]);
      return new Response(
        JSON.stringify({
          isValid: true,
          message: "Demo coupon is valid",
          discount: demoValidCoupons[upperCaseCode as keyof typeof demoValidCoupons]
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if it's an unlimited school code
    if (UNLIMITED_SCHOOL_CODES.includes(upperCaseCode)) {
      logDebug(requestId, "School code detected");
      
      // For unlimited school codes, check if this email has used the code before
      if (email) {
        const { data: usageData, error: usageError } = await supabaseAdmin
          .from('conference_registrations')
          .select('id')
          .eq('coupon_code', upperCaseCode)
          .eq('email', email)
          .limit(1);
          
        if (usageError) {
          logDebug(requestId, "Error checking school code usage", usageError);
        } else if (usageData && usageData.length > 0) {
          logDebug(requestId, "Email already used this school code");
          return new Response(
            JSON.stringify({
              isValid: false,
              message: "You have already used this coupon code"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // School code valid and not used by this email
        logDebug(requestId, "School code valid - 100% discount");
        return new Response(
          JSON.stringify({
            isValid: true,
            message: "School code accepted",
            discount: { type: "percentage", amount: 100 }
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    
    // For regular coupons, query the database directly
    const { data: couponData, error: couponError } = await supabaseAdmin
      .from('coupon_codes')
      .select('*')
      .eq('code', upperCaseCode)
      .eq('is_active', true)
      .single();
    
    if (couponError) {
      logDebug(requestId, "Error retrieving coupon from database", couponError);
      
      // For database errors, still check the backup hardcoded coupons
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
    
    if (!couponData) {
      logDebug(requestId, "No coupon found with this code");
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
      logDebug(requestId, "Coupon expired", { expires_at: couponData.expires_at });
      return new Response(
        JSON.stringify({
          isValid: false,
          message: "This coupon has expired"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Check if max uses has been reached
    if (couponData.max_uses !== null && couponData.current_uses >= couponData.max_uses) {
      logDebug(requestId, "Coupon usage limit reached", { 
        current: couponData.current_uses, 
        max: couponData.max_uses 
      });
      return new Response(
        JSON.stringify({
          isValid: false,
          message: "This coupon has reached its usage limit"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Coupon is valid
    logDebug(requestId, "Coupon is valid", { 
      type: couponData.discount_type, 
      amount: couponData.discount_amount 
    });
    
    return new Response(
      JSON.stringify({
        isValid: true,
        message: "Coupon is valid",
        discount: {
          type: couponData.discount_type,
          amount: parseFloat(couponData.discount_amount)
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error(`[${requestId}] Error validating coupon:`, error);
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
