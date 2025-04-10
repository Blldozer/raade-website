import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { calculatePaymentAmount } from '../_shared/pricing.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID().substring(0, 8);
  console.log(`[${requestId}] Processing payment intent creation`);

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

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

    let { amount, description, isGroupRegistration } = calculatePaymentAmount(ticketType, groupSize);

    let verifiedDiscount = null;
    let couponId = null;

    const isGroupTicket = ticketType === 'student-group';

    if (couponCode && !isGroupTicket) {
      console.log(`[${requestId}] Validating coupon code: ${couponCode}`);
      
      const { data: couponData, error: couponError } = await supabaseAdmin
        .from('coupon_codes')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (!couponError && couponData) {
        console.log(`[${requestId}] Coupon found in database:`, couponData);
        
        if (couponData.expires_at && new Date(couponData.expires_at) < new Date()) {
          console.log(`[${requestId}] Coupon has expired`);
          return new Response(
            JSON.stringify({ error: 'Coupon has expired' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (couponData.max_uses !== null && couponData.current_uses >= couponData.max_uses) {
          console.log(`[${requestId}] Coupon usage limit reached`);
          return new Response(
            JSON.stringify({ error: 'Coupon usage limit reached' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const SCHOOL_CODES = ['PVAMU', 'TEXAS', 'TULANE'];
        if (SCHOOL_CODES.includes(couponCode.toUpperCase())) {
          const { data: usageData, error: usageError } = await supabaseAdmin
            .from('conference_registrations')
            .select('id')
            .eq('coupon_code', couponCode.toUpperCase())
            .eq('email', email)
            .limit(1);
            
          if (!usageError && usageData && usageData.length > 0) {
            console.log(`[${requestId}] Email already used this school code`);
            return new Response(
              JSON.stringify({ error: 'You have already used this coupon code' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }

        verifiedDiscount = {
          type: couponData.discount_type,
          amount: Number(couponData.discount_amount)
        };
        couponId = couponData.id;
        console.log(`[${requestId}] Verified discount:`, verifiedDiscount);
      } else if (couponError) {
        console.error(`[${requestId}] Error validating coupon:`, couponError);
      }
    } else if (couponDiscount && !isGroupTicket) {
      const upperCaseCode = couponDiscount.type === 'percentage' && couponDiscount.amount === 100 
        ? 'SCHOOL' : 'UNKNOWN';
      console.log(`[${requestId}] Using discount without code:`, couponDiscount);
      
      const { data: anyCoupon, error: anyError } = await supabaseAdmin
        .from('coupon_codes')
        .select('*')
        .eq('discount_type', couponDiscount.type)
        .eq('discount_amount', couponDiscount.amount.toString())
        .eq('is_active', true)
        .limit(1);
        
      if (!anyError && anyCoupon && anyCoupon.length > 0) {
        verifiedDiscount = couponDiscount;
        couponId = anyCoupon[0].id;
        console.log(`[${requestId}] Found matching coupon in database:`, anyCoupon[0].code);
      } else {
        console.log(`[${requestId}] No matching coupon found for discount:`, couponDiscount);
        verifiedDiscount = null;
      }
    }

    if (verifiedDiscount && !isGroupTicket) {
      console.log(`[${requestId}] Applying discount to payment amount`);
      if (verifiedDiscount.type === 'percentage') {
        const discountAmount = Math.round((amount * verifiedDiscount.amount) / 100);
        amount = Math.max(0, amount - discountAmount);
        console.log(`[${requestId}] Applied ${verifiedDiscount.amount}% discount, new amount: ${amount}`);
      } else {
        const discountAmount = verifiedDiscount.amount * 100;
        amount = Math.max(0, amount - discountAmount);
        console.log(`[${requestId}] Applied $${verifiedDiscount.amount} discount, new amount: ${amount}`);
      }
    }

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

    if (couponCode && !isGroupTicket) {
      console.log(`[${requestId}] Incrementing coupon usage for ${couponCode}`);
      const { error: usageError } = await supabaseAdmin.rpc(
        'increment_coupon_usage',
        { coupon_code_param: couponCode.toUpperCase() }
      );
      
      if (usageError) {
        console.error(`[${requestId}] Error incrementing coupon usage:`, usageError);
      } else {
        console.log(`[${requestId}] Successfully incremented coupon usage`);
      }
    }

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
