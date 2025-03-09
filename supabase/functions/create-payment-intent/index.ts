
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.7.0";

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
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get ticket data from request
    const { ticketType, email, fullName } = await req.json();

    // Define price based on ticket type
    let amount = 0;
    let description = "";

    switch (ticketType) {
      case "rice-student":
        amount = 5000; // $50.00
        description = "Rice Student Ticket - RAADE Conference 2025";
        break;
      case "non-rice-student":
        amount = 6500; // $65.00
        description = "Non-Rice Student Ticket - RAADE Conference 2025";
        break;
      case "young-professional":
        amount = 8500; // $85.00
        description = "Young Professional Ticket - RAADE Conference 2025";
        break;
      case "speaker":
        amount = 0; // Free for speakers
        description = "Speaker Pass - RAADE Conference 2025";
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

    // If it's a free ticket (speakers), just return success without creating a payment intent
    if (amount === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          freeTicket: true,
          message: "No payment required for speaker tickets" 
        }),
        { 
          status: 200, 
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
        email
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
        currency: "USD"
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
