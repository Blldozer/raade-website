
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Calculate prices based on ticket type
function calculatePrice(ticketType: string, groupSize?: number) {
  // Define base prices in dollars
  const STUDENT_PRICE = 35;
  const PROFESSIONAL_PRICE = 60;
  const GROUP_PRICE_PER_PERSON = 30;
  
  switch (ticketType) {
    case "student":
      return {
        amount: STUDENT_PRICE * 100, // Convert to cents
        description: "RAADE Conference 2025 - Student Registration",
        isGroup: false
      };
    case "professional":
      return {
        amount: PROFESSIONAL_PRICE * 100, // Convert to cents
        description: "RAADE Conference 2025 - Professional Registration",
        isGroup: false
      };
    case "student-group":
      if (!groupSize || groupSize < 5) {
        throw new Error("Group registrations require at least 5 participants");
      }
      return {
        amount: GROUP_PRICE_PER_PERSON * groupSize * 100, // Convert to cents
        description: `RAADE Conference 2025 - Student Group (${groupSize} attendees)`,
        isGroup: true,
        groupSize
      };
    default:
      throw new Error(`Invalid ticket type: ${ticketType}`);
  }
}

serve(async (req) => {
  // Generate a unique ID for request tracking
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Request started`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Stripe secret key from environment variable
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error(`[${requestId}] Missing STRIPE_SECRET_KEY environment variable`);
      return new Response(
        JSON.stringify({ 
          error: "Server configuration error", 
          message: "Stripe API key is not configured" 
        }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse the request body
    let requestData;
    try {
      const body = await req.text();
      requestData = JSON.parse(body);
    } catch (error) {
      console.error(`[${requestId}] Failed to parse request body:`, error);
      return new Response(
        JSON.stringify({ error: "Invalid request format" }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Extract registration data
    const { 
      ticketType, 
      email,
      fullName,
      groupSize,
      organization,
      role,
      specialRequests,
      groupEmails = [],
      successUrl,
      cancelUrl
    } = requestData;
    
    // Validate required fields
    if (!ticketType || !email || !fullName || !successUrl || !cancelUrl) {
      console.error(`[${requestId}] Missing required fields`);
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          message: "Please provide ticketType, email, fullName, successUrl, and cancelUrl"
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`[${requestId}] Creating checkout session for ${email}, ticket: ${ticketType}`);
    
    try {
      // Calculate price information
      const priceInfo = calculatePrice(ticketType, groupSize);
      
      // Initialize Stripe
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2025-02-24.acacia",
        httpClient: Stripe.createFetchHttpClient(),
      });
      
      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: priceInfo.description,
              },
              unit_amount: priceInfo.amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: email,
        metadata: {
          ticketType,
          fullName,
          email,
          requestId,
          organization: organization || "",
          role: role || "",
          specialRequests: specialRequests || "",
          groupSize: priceInfo.isGroup ? String(groupSize) : "",
          groupEmails: priceInfo.isGroup ? JSON.stringify(groupEmails) : ""
        },
      });
      
      console.log(`[${requestId}] Checkout session created: ${session.id}`);
      
      // Return the session URL
      return new Response(
        JSON.stringify({
          sessionId: session.id,
          url: session.url,
          requestId
        }), 
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
      
    } catch (error) {
      console.error(`[${requestId}] Stripe error:`, error);
      return new Response(
        JSON.stringify({ 
          error: "Payment processing error", 
          message: error.message || "Failed to create checkout session"
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
  } catch (error) {
    console.error(`[${requestId}] Unhandled error:`, error);
    return new Response(
      JSON.stringify({ 
        error: "Server error", 
        message: "An unexpected error occurred"
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
