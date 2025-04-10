
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { calculatePaymentAmount } from '../_shared/pricing.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.1';

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID().substring(0, 8);
  console.log(`[${requestId}] Processing payment intent creation`);

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

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

    const requestData = await req.json();
    const {
      ticketType,
      email,
      fullName,
      groupSize,
      groupEmails,
      organization,
      role,
      specialRequests,
      referralSource,
      couponCode,
      couponDiscount,
      attemptId,
    } = requestData;

    console.log(`[${requestId}] Payment request for ${email}, coupon: ${couponCode || 'None'}`);

    if (!ticketType || !email || !fullName) {
      console.log(`[${requestId}] Missing required fields`);
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate the payment amount using our shared pricing module
    let { amount, description, isGroupRegistration } = calculatePaymentAmount(ticketType, groupSize);

    // Verify coupon code if provided
    let verifiedDiscount = null;
    let couponId = null;

    // Check if this is a group ticket - discounts don't apply to groups
    const isGroupTicket = ticketType === 'student-group';

    if (couponCode && !isGroupTicket) {
      console.log(`[${requestId}] Validating coupon code: ${couponCode}`);
      
      // Validate the coupon against the database
      const { data: couponData, error: couponError } = await supabaseAdmin
        .from('coupon_codes')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (!couponError && couponData) {
        console.log(`[${requestId}] Coupon found in database:`, couponData);
        
        // Check if coupon is expired
        if (couponData.expires_at && new Date(couponData.expires_at) < new Date()) {
          console.log(`[${requestId}] Coupon has expired`);
          return new Response(
            JSON.stringify({ error: 'Coupon has expired' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Check max usage limit if set
        if (couponData.max_uses !== null && couponData.current_uses >= couponData.max_uses) {
          console.log(`[${requestId}] Coupon usage limit reached`);
          return new Response(
            JSON.stringify({ error: 'Coupon usage limit reached' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Coupon is valid, apply discount
        verifiedDiscount = {
          type: couponData.discount_type,
          amount: Number(couponData.discount_amount)
        };
        couponId = couponData.id;
        console.log(`[${requestId}] Verified discount:`, verifiedDiscount);
      } else if (couponError) {
        console.error(`[${requestId}] Error validating coupon:`, couponError);
      }
      
      // Special handling for hardcoded demo coupons
      if (!verifiedDiscount) {
        // Fallback to client-provided discount if database validation fails
        // This supports the demo coupons and school codes
        if (couponDiscount && !isGroupTicket) {
          console.log(`[${requestId}] Using client-provided discount:`, couponDiscount);
          verifiedDiscount = couponDiscount;
        }
      }
    } else if (couponDiscount && !isGroupTicket) {
      // If no coupon code is provided but discount is, use the client-provided discount
      // (only for non-group tickets)
      console.log(`[${requestId}] Using discount without code:`, couponDiscount);
      verifiedDiscount = couponDiscount;
    }

    // Apply verified discount if available and not a group ticket
    if (verifiedDiscount && !isGroupTicket) {
      console.log(`[${requestId}] Applying discount to payment amount`);
      if (verifiedDiscount.type === 'percentage') {
        const discountAmount = Math.round((amount * verifiedDiscount.amount) / 100);
        amount = Math.max(0, amount - discountAmount);
        console.log(`[${requestId}] Applied ${verifiedDiscount.amount}% discount, new amount: ${amount}`);
      } else {
        // Fixed amount discount (in cents)
        const discountAmount = verifiedDiscount.amount * 100; // Convert dollars to cents
        amount = Math.max(0, amount - discountAmount);
        console.log(`[${requestId}] Applied $${verifiedDiscount.amount} discount, new amount: ${amount}`);
      }
    }

    // Create the payment intent
    console.log(`[${requestId}] Creating payment intent for ${amount} cents`);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description,
      receipt_email: email,
      metadata: {
        ticketType,
        fullName,
        email,
        organization,
        role,
        groupSize: groupSize?.toString() || 'N/A',
        groupEmails: isGroupRegistration ? JSON.stringify(groupEmails) : 'N/A',
        specialRequests: specialRequests || 'None',
        referralSource: referralSource || 'None',
        couponCode: couponCode || 'None',
        couponId: couponId || 'None',
        attemptId: attemptId || '',
      },
    });

    console.log(`[${requestId}] Payment intent created: ${paymentIntent.id}`);

    // If using a valid coupon from database and not a group ticket, increment its usage
    if (couponId && !isGroupTicket) {
      console.log(`[${requestId}] Incrementing coupon usage for ${couponCode}`);
      const { error: usageError } = await supabaseAdmin.rpc(
        'increment_coupon_usage',
        { coupon_code_param: couponCode.toUpperCase() }
      );
      
      if (usageError) {
        console.error(`[${requestId}] Error incrementing coupon usage:`, usageError);
        // Continue since payment intent was created successfully
      } else {
        console.log(`[${requestId}] Successfully incremented coupon usage`);
      }
    }

    // Return the client secret to the frontend
    console.log(`[${requestId}] Returning client secret to frontend`);
    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        id: paymentIntent.id,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`[${requestId}] Error creating payment intent:`, error);
    return new Response(
      JSON.stringify({ error: `Payment processing error: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
