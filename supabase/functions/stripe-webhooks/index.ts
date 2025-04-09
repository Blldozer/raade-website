
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Stripe Webhooks Edge Function
 * 
 * Handles Stripe webhooks for donation processing:
 * - Updates donation status in the database
 * - Processes various Stripe events like payment success/failure
 * - Securely validates webhook signatures
 * - Logs events for audit purposes
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
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get the webhook secret
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
    
    // Get the signature from the headers
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      throw new Error("Missing Stripe signature header");
    }
    
    // Get the raw request body as text
    const body = await req.text();
    
    // Verify the event is from Stripe using the webhook secret and signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    console.log(`Processing Stripe event: ${event.type}`);
    
    // Handle specific event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
        
        // Update the donation status in the database
        const { error: updateError } = await supabase
          .from('donations')
          .update({ payment_status: 'succeeded' })
          .eq('payment_intent_id', paymentIntent.id);
        
        if (updateError) {
          console.error(`Error updating donation: ${updateError.message}`);
        } else {
          console.log(`Successfully updated donation status for payment: ${paymentIntent.id}`);
        }
        break;
      
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object;
        console.log(`PaymentIntent failed: ${failedPaymentIntent.id}`);
        
        // Update the donation status to failed
        const { error: failUpdateError } = await supabase
          .from('donations')
          .update({ payment_status: 'failed' })
          .eq('payment_intent_id', failedPaymentIntent.id);
        
        if (failUpdateError) {
          console.error(`Error updating donation failure: ${failUpdateError.message}`);
        }
        break;
      
      default:
        // Log other event types but don't process them
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Return a response to acknowledge receipt of the event
    return new Response(
      JSON.stringify({ received: true }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error(`Error processing Stripe webhook: ${error.message}`);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
