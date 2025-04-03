
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { corsHeaders } from "../_shared/cors.ts";

/**
 * Create Direct Payment Intent Function
 * 
 * Simple Edge Function that creates a Stripe payment intent for direct payment processing.
 * This simplifies the payment flow by:
 * - Creating a payment intent without sessions or redirects
 * - Returning the client secret directly to be used with Stripe.js
 * - Including necessary metadata for tracking and reporting
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Stripe secret key from environment variable
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: "Stripe API key not configured" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    // Create Stripe instance
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Parse the request body
    const requestData = await req.json();
    const { 
      ticketType, 
      email, 
      fullName,
      groupSize,
      organization,
      role,
      specialRequests,
      referralSource,
      groupEmails = []
    } = requestData;
    
    // Validate required fields
    if (!ticketType || !email || !fullName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: ticketType, email, and fullName are required" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400
        }
      );
    }
    
    // Define base prices in cents (duplicated for safety)
    const STUDENT_PRICE = 3500; // $35.00
    const PROFESSIONAL_PRICE = 6000; // $60.00
    const GROUP_PRICE_PER_PERSON = 3000; // $30.00 per person
    
    let amount = 0;
    let description = "";
    let isGroupRegistration = false;
    
    // Calculate amount based on ticket type
    switch (ticketType) {
      case "student":
        amount = STUDENT_PRICE;
        description = "RAADE Conference 2025 - Student Registration";
        break;
      
      case "professional":
        amount = PROFESSIONAL_PRICE;
        description = "RAADE Conference 2025 - Professional Registration";
        break;
      
      case "student-group":
        if (!groupSize || groupSize < 5) {
          return new Response(
            JSON.stringify({ error: "Group registrations require at least 5 participants" }),
            { 
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400
            }
          );
        }
        
        amount = GROUP_PRICE_PER_PERSON * groupSize;
        description = `RAADE Conference 2025 - Student Group Registration (${groupSize} attendees)`;
        isGroupRegistration = true;
        break;
      
      default:
        return new Response(
          JSON.stringify({ error: `Invalid ticket type: ${ticketType}` }),
          { 
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400
          }
        );
    }
    
    // Format group emails for metadata storage
    const formattedGroupEmails = Array.isArray(groupEmails) 
      ? groupEmails.join(", ")
      : "";
    
    // Create a payment intent
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        description,
        receipt_email: email,
        metadata: {
          email,
          fullName,
          ticketType,
          groupSize: groupSize?.toString() || "N/A",
          isGroupRegistration: isGroupRegistration.toString(),
          organization: organization || "",
          role: role || "",
          specialRequests: specialRequests || "",
          referralSource: referralSource || "",
          groupEmails: formattedGroupEmails
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });
      
      return new Response(
        JSON.stringify({
          clientSecret: paymentIntent.client_secret,
          amount,
          currency: "usd",
          isGroupRegistration,
          ticketType
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      );
    } catch (stripeError) {
      console.error("Stripe API error:", stripeError);
      
      return new Response(
        JSON.stringify({ 
          error: `Payment processing error: ${stripeError.message}`,
          code: stripeError.code || "unknown_error"
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      );
    }
  } catch (error) {
    console.error("Unhandled error:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
