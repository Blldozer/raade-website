
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
 * - Supporting Link, Apple Pay, and Google Pay payment methods
 * - Validating group size for group registrations
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
    console.log("Payment intent function called");
    // Get the Stripe secret key from environment variable
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "Server configuration error: Missing Stripe secret key" 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Creating Stripe instance with secret key format:", 
      stripeSecretKey.substring(0, 8) + "..." + stripeSecretKey.substring(stripeSecretKey.length - 4));
    
    // Create new Stripe instance
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Parse the request body
    const requestData = await req.json();
    const { ticketType, email, fullName, groupSize } = requestData;
    
    // Log request for debugging
    console.log("Received payment intent request:", JSON.stringify({
      ticketType,
      email,
      fullName,
      groupSize: groupSize || "none"
    }));
    
    // Validate input data
    if (!ticketType || !email || !fullName) {
      console.error("Missing required fields:", { ticketType, email, fullName });
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          details: "Ticket type, email, and full name are required"
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Validate group size for student-group tickets
    const isGroupRegistration = ticketType === "student-group";
    if (isGroupRegistration) {
      if (!groupSize || groupSize < 5) {
        console.error("Invalid group size:", groupSize);
        return new Response(
          JSON.stringify({ 
            error: "Invalid group size",
            details: "Group registrations require a minimum of 5 people"
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    }
    
    let amount = 0;
    let description = "";

    // Calculate amount based on ticket type - using the updated pricing
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
        // Ensure minimum group size of 5
        const finalGroupSize = Math.max(groupSize || 5, 5);
        amount = 3000 * finalGroupSize; // $30.00 per person
        description = `Student Group (${finalGroupSize} members) - RAADE Conference 2025`;
        break;
      default:
        console.error("Invalid ticket type:", ticketType);
        return new Response(
          JSON.stringify({ 
            error: `Invalid ticket type: ${ticketType}`,
            validTypes: ["student", "professional", "student-group"],
            receivedData: requestData
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
    }

    console.log(`Creating payment intent for ${amount} cents (${description}) - ${email}`);

    try {
      // Create a Payment Intent with support for Link and digital wallets
      console.log("Calling stripe.paymentIntents.create");
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
          allow_redirects: 'always'
        },
        payment_method_options: {
          card: {
            request_three_d_secure: 'automatic',
          },
        },
        // Enable Link payments
        payment_method_types: ['card', 'link'],
      });

      console.log("Payment intent created successfully:", paymentIntent.id);

      // Return the payment intent client secret with detailed information
      return new Response(
        JSON.stringify({ 
          clientSecret: paymentIntent.client_secret,
          amount: amount / 100, // Convert cents to dollars for display
          currency: "USD",
          isGroupRegistration,
          groupSize: isGroupRegistration ? Math.max(groupSize || 5, 5) : undefined,
          ticketType,
          perPersonCost: isGroupRegistration ? 30 : (ticketType === "student" ? 35 : 60)
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } catch (stripeError) {
      console.error("Stripe API error:", stripeError);
      // Log more details about the error
      console.error("Stripe error details:", {
        type: stripeError.type,
        code: stripeError.code,
        param: stripeError.param,
        message: stripeError.message
      });
      
      return new Response(
        JSON.stringify({ 
          error: stripeError.message,
          errorType: stripeError.type,
          errorCode: stripeError.code,
          details: "There was an error processing your payment request with Stripe. Please try again later."
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

  } catch (error) {
    console.error("Error creating payment intent:", error);
    console.error("Error stack:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        details: "There was an error processing your payment request. Please try again or contact support."
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
