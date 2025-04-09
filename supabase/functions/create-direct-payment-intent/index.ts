
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { calculatePaymentAmount } from '../_shared/pricing.ts';

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

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

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
      couponCode,         // Get coupon code from request
      couponDiscount,     // Get coupon discount from request
      attemptId,
    } = requestData;

    if (!ticketType || !email || !fullName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate the payment amount using our shared pricing module
    let { amount, description, isGroupRegistration } = calculatePaymentAmount(ticketType, groupSize);

    // Apply coupon discount if present
    if (couponDiscount) {
      if (couponDiscount.type === 'percentage') {
        const discountAmount = Math.round((amount * couponDiscount.amount) / 100);
        amount = Math.max(0, amount - discountAmount);
      } else {
        // Fixed amount discount (in cents)
        const discountAmount = couponDiscount.amount * 100; // Convert dollars to cents
        amount = Math.max(0, amount - discountAmount);
      }
    }

    // Create the payment intent
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
        couponCode: couponCode || 'None',      // Add coupon code to metadata
        attemptId: attemptId || '',
      },
    });

    // Return the client secret to the frontend
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
    console.error('Error creating payment intent:', error);
    return new Response(
      JSON.stringify({ error: `Payment processing error: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
