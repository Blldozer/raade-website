
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Process Donation Edge Function
 * 
 * Handles donation payments by:
 * - Creating a Stripe payment intent for the donation amount
 * - Storing donation details as metadata
 * - Setting up proper email receipts
 * - Handling CORS for browser requests
 * - Detailed error handling and logging
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2022-11-15",
    });
    
    // Parse the request body
    const requestData = await req.json();
    
    // Validate the request data
    const { 
      amount, 
      email, 
      fullName, 
      makeAnonymous, 
      message 
    } = requestData;
    
    if (!amount || !email || !fullName) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: amount, email, or fullName",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    console.log(`Processing donation: $${amount/100} from ${fullName} (${email})`);
    
    try {
      // Create a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        receipt_email: email,
        description: "Donation to RAADE Conference 2025",
        metadata: {
          fullName,
          email,
          makeAnonymous: makeAnonymous ? "true" : "false",
          message: message || "",
          donationType: "conference-support",
        },
      });
      
      console.log(`Successfully created payment intent: ${paymentIntent.id}`);
      
      // Return the client secret
      return new Response(
        JSON.stringify({
          clientSecret: paymentIntent.client_secret,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (stripeError) {
      console.error("Stripe error:", stripeError);
      
      return new Response(
        JSON.stringify({
          error: stripeError.message || "Error processing payment with Stripe",
        }),
        {
          status: 422,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error processing donation:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message || "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
