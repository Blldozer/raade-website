
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

// Define CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Helper function to create standardized responses
function createResponse(data: any, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    }
  );
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Get the request ID for tracking or generate a new one
  const requestData = await req.json().catch(() => ({}));
  const requestId = requestData.requestId || crypto.randomUUID();
  
  try {
    // Parse the request body
    const { code } = requestData;
    
    // Make sure we have a code to validate
    if (!code || typeof code !== 'string') {
      return createResponse({
        success: false,
        message: "Invalid coupon code format",
        valid: false,
        requestId
      }, 400);
    }
    
    // Normalize the code (uppercase, trim spaces)
    const normalizedCode = code.trim().toUpperCase();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error(`[${requestId}] Missing Supabase environment variables`);
      return createResponse({
        success: false,
        message: "Server configuration error",
        valid: false,
        requestId
      }, 500);
    }
    
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    // Look up the coupon code
    console.log(`[${requestId}] Validating coupon code: ${normalizedCode}`);
    
    const { data: coupon, error } = await supabaseAdmin
      .from('coupon_codes')
      .select('*')
      .eq('code', normalizedCode)
      .eq('is_active', true)
      .maybeSingle();
    
    if (error) {
      console.error(`[${requestId}] Database error during coupon validation:`, error);
      return createResponse({
        success: false,
        message: "Error looking up coupon code",
        valid: false,
        requestId
      }, 500);
    }
    
    // If no coupon found, it's invalid
    if (!coupon) {
      console.log(`[${requestId}] Coupon not found or inactive: ${normalizedCode}`);
      return createResponse({
        success: false,
        message: "Invalid or inactive coupon code",
        valid: false,
        requestId
      }, 200);
    }
    
    // Check if the coupon has expired
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      console.log(`[${requestId}] Coupon expired: ${normalizedCode}`);
      return createResponse({
        success: false,
        message: "This coupon code has expired",
        valid: false,
        requestId
      }, 200);
    }
    
    // Check if the coupon has reached its maximum usage
    if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
      console.log(`[${requestId}] Coupon usage limit reached: ${normalizedCode}`);
      return createResponse({
        success: false,
        message: "This coupon code has reached its maximum usage limit",
        valid: false,
        requestId
      }, 200);
    }
    
    // The coupon is valid
    console.log(`[${requestId}] Valid coupon found: ${normalizedCode}, type: ${coupon.discount_type}`);
    
    // Return the coupon details (excluding sensitive info)
    return createResponse({
      success: true,
      valid: true,
      coupon: {
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_amount: coupon.discount_amount,
        description: coupon.description
      },
      message: "Valid coupon code",
      requestId
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    console.error(`[${requestId}] Unhandled error in validate-coupon-code:`, error);
    
    return createResponse({
      success: false,
      message: errorMessage || "An unexpected error occurred",
      valid: false,
      requestId,
      timestamp: new Date().toISOString()
    }, 500);
  }
});
