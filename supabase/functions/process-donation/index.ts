
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Process Donation Edge Function
 * 
 * Creates a Stripe payment intent for donations:
 * - Validates donation amount
 * - Creates payment intent with Stripe
 * - Returns client secret for frontend processing
 * - Handles CORS for browser requests
 * - Now with enhanced error logging
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Process donation function called");
    
    // Get Stripe secret key from environment
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      throw new Error("Server configuration error: Stripe key not set");
    }
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2022-11-15",
    });
    
    // Parse the request body
    const requestData = await req.json();
    console.log("Request data:", JSON.stringify(requestData));
    
    // Validate required fields
    const { amount, email, fullName, makeAnonymous, message } = requestData;
    
    if (!amount || !email || !fullName) {
      console.error("Missing required fields:", { amount, email, fullName });
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
    
    // Validate amount
    if (isNaN(amount) || amount < 100) { // Minimum $1 donation (100 cents)
      console.error("Invalid amount:", amount);
      return new Response(
        JSON.stringify({
          error: "Invalid amount. Minimum donation is $1.",
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
      console.log("Creating payment intent with Stripe");
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
          details: JSON.stringify(stripeError),
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
        stack: error.stack || "No stack trace available",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
