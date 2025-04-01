
// Import required dependencies
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { calculatePaymentAmount } from "./pricing.ts";
import { corsHeaders } from "../_shared/cors.ts";

/**
 * Create Payment Intent Edge Function
 * 
 * Handles creation of Stripe payment intents for conference registrations
 * Validates input data and calculates appropriate payment amount
 * Returns client secret and payment details for frontend processing
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse request body
    const { ticketType, email, fullName, groupSize, attemptId } = await req.json();
    
    // Generate a unique request ID for tracking if not provided
    const requestId = attemptId || crypto.randomUUID();
    
    console.log(`Processing payment intent request [${requestId}] for ${email}, ticket: ${ticketType}`);
    
    // Basic validation
    if (!ticketType || !email || !fullName) {
      console.error(`Missing required fields [${requestId}]`);
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields", 
          success: false,
          requestId 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Calculate payment amount based on ticket type and group size
    let paymentInfo;
    try {
      paymentInfo = calculatePaymentAmount(ticketType, groupSize);
      console.log(`Calculated payment amount [${requestId}]:`, paymentInfo);
    } catch (error) {
      console.error(`Error calculating payment amount [${requestId}]:`, error);
      return new Response(
        JSON.stringify({ 
          error: error.message, 
          success: false,
          requestId 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Create mock payment intent for testing purposes
    // In production, this would call the Stripe API
    const clientSecret = `mock_pi_${crypto.randomUUID()}_secret_${crypto.randomUUID()}`;
    
    console.log(`Created payment intent [${requestId}] with amount: ${paymentInfo.amount}`);
    
    // Return successful response with payment details
    return new Response(
      JSON.stringify({
        clientSecret,
        amount: paymentInfo.amount,
        description: paymentInfo.description,
        currency: "usd",
        requestId,
        email,
        fullName,
        isGroupRegistration: paymentInfo.isGroupRegistration,
        groupSize: paymentInfo.isGroupRegistration ? groupSize : undefined
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    // Handle unexpected errors
    console.error(`Unexpected error processing payment intent:`, error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        message: error.message,
        success: false 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
