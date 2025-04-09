
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

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
  
  // Generate a request ID for tracking
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Processing coupon validation request`);
  
  try {
    // Parse the request body
    const { code } = await req.json();
    
    if (!code) {
      return createResponse({
        success: false,
        message: "No coupon code provided",
        requestId
      }, 400);
    }
    
    // Initialize Supabase client with admin privileges
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error(`[${requestId}] Missing Supabase environment variables`);
      return createResponse({
        success: false,
        message: "Server configuration error",
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
    
    // Check if the coupon code exists and is valid
    console.log(`[${requestId}] Checking coupon code: ${code}`);
    const { data: coupon, error: couponError } = await supabaseAdmin
      .from('coupon_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();
      
    if (couponError || !coupon) {
      console.log(`[${requestId}] Invalid or inactive coupon code`);
      return createResponse({
        success: false,
        message: "Invalid or inactive coupon code",
        requestId
      }, 400);
    }
    
    // Check if the coupon has expired
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      console.log(`[${requestId}] Coupon has expired`);
      return createResponse({
        success: false,
        message: "This coupon code has expired",
        requestId
      }, 400);
    }
    
    // Check if the coupon has reached its usage limit
    if (coupon.max_uses !== null && coupon.current_uses >= coupon.max_uses) {
      console.log(`[${requestId}] Coupon usage limit reached`);
      return createResponse({
        success: false,
        message: "This coupon code has reached its usage limit",
        requestId
      }, 400);
    }
    
    // Return coupon details to client
    const isFullDiscount = coupon.discount_type === 'percentage' && coupon.discount_amount === 100;
    
    console.log(`[${requestId}] Valid coupon found: ${JSON.stringify({
      code: coupon.code,
      discountType: coupon.discount_type,
      discountAmount: coupon.discount_amount,
      isFullDiscount
    })}`);
    
    return createResponse({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discount_type,
        discountAmount: coupon.discount_amount,
        isFullDiscount
      },
      requestId
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[${requestId}] Error in validate-coupon: ${errorMessage}`);
    
    return createResponse({
      success: false,
      message: "Error validating coupon code",
      error: errorMessage,
      requestId
    }, 500);
  }
});
