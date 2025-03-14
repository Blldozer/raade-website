
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.7.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Create Payment Intent Edge Function
 * 
 * Processes payment requests for conference registrations by:
 * - Creating a Stripe payment intent based on ticket type
 * - Calculating correct pricing based on ticket selection and group size
 * - Returning payment information to the client
 * 
 * Handles CORS and proper error reporting
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const { ticketType, email, fullName, groupSize } = await req.json();

    let amount = 0;
    let description = "";
    const isGroupRegistration = ticketType === "student-group";

    switch (ticketType) {
      case "student":
        amount = 3500; // $35.00
        description = "Student Ticket - RAADE Conference 2025";
        break;
      case "professional":
        amount = 6000; // $60.00
        description = "Professional Ticket - RAADE Conference 2025";
        break;
      case "student-group":
        amount = 3000 * (groupSize || 5); // $30.00 per person
        description = `Student Group (${groupSize || 5} members) - RAADE Conference 2025`;
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid ticket type" }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
    }

    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description,
      receipt_email: email,
      metadata: {
        ticketType,
        customerName: fullName,
        email,
        groupSize: isGroupRegistration ? String(groupSize || 5) : undefined
      },
      automatic_payment_methods: {
        enabled: true,
      },
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },
    });

    // Return the payment intent client secret
    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        amount: amount / 100, // Convert cents to dollars for display
        currency: "USD",
        isGroupRegistration,
        groupSize: isGroupRegistration ? groupSize || 5 : undefined
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error creating payment intent:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
