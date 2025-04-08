
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@11.18.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.0";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Set up CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const requestData = await req.json();
    const { 
      amount, 
      donorName, 
      donorEmail, 
      isAnonymous, 
      donationType,
      message 
    } = requestData;

    // Validate required data
    if (!amount || !donationType) {
      return new Response(
        JSON.stringify({ error: "Amount and donation type are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(parseFloat(amount) * 100);

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"],
      receipt_email: donorEmail,
      metadata: {
        donationType,
        isAnonymous: isAnonymous ? "true" : "false",
      },
    });

    // Store donation record in the database
    const { data: donationData, error: donationError } = await supabase
      .from("donations")
      .insert({
        amount,
        donor_name: isAnonymous ? null : donorName,
        donor_email: donorEmail,
        is_anonymous: isAnonymous,
        donation_type: donationType,
        message: message || null,
        payment_intent_id: paymentIntent.id,
        payment_status: "pending",
      })
      .select();

    if (donationError) {
      console.error("Error storing donation:", donationError);
      // We'll continue with the payment flow even if DB storage fails
    }

    // Return the client secret to the client
    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        amount: amountInCents,
        paymentIntentId: paymentIntent.id,
        donationId: donationData?.[0]?.id
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create payment intent" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
