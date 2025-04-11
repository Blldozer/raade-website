
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.4.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight
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
      firstName,
      lastName,
      fullName,
      groupSize,
      couponDiscount,
      attemptId,
    } = requestData;

    // Generate a consistent idempotency key to prevent duplicate charges
    const idempotencyKey = `payment_${ticketType}_${email}_${attemptId}`;
    console.log(`Creating payment intent with idempotency key: ${idempotencyKey}`);

    // Set the price based on ticket type and group size
    let unitPrice = 0;
    if (ticketType === 'student') {
      unitPrice = 35; // Default price for student tickets
    } else if (ticketType === 'professional') {
      unitPrice = 60; // Default price for professional tickets
    } else if (ticketType === 'student-group') {
      unitPrice = 30; // Default price for student group tickets (per person)
    }

    // Calculate the total amount
    let amount = ticketType === 'student-group' && groupSize 
      ? unitPrice * groupSize * 100 // Group price (convert to cents)
      : unitPrice * 100; // Individual price (convert to cents)

    // Apply discounts for non-group tickets
    if (couponDiscount && ticketType !== 'student-group') {
      if (couponDiscount.type === 'percentage') {
        const discountAmount = (amount * couponDiscount.amount) / 100;
        amount = Math.max(0, amount - discountAmount);
      } else if (couponDiscount.type === 'fixed') {
        // Convert dollar amount to cents for stripe
        amount = Math.max(0, amount - (couponDiscount.amount * 100));
      }
    }

    // Round to nearest cent (Stripe requires integer)
    amount = Math.round(amount);

    // If amount is 0 after discount, return an error
    if (amount <= 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Discount reduces price to zero. Please use the free registration option instead.' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create a PaymentIntent with the calculated amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        ticketType,
        email,
        fullName: fullName || `${firstName} ${lastName}`.trim(),
        firstName,
        lastName,
        groupSize: groupSize?.toString() || '',
        attemptId
      },
      receipt_email: email,
      automatic_payment_methods: {
        enabled: true,
      },
    }, {
      idempotencyKey
    });

    // Return the client secret to the client
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    return new Response(
      JSON.stringify({ error: `Payment service error: ${error.message}` }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
