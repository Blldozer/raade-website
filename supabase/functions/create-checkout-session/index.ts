
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { calculatePaymentAmount } from "../_shared/pricing.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Handling checkout request`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get the request body
    const {
      ticketType,
      email,
      fullName,
      organization,
      role,
      groupSize,
      groupEmails,
      specialRequests,
      referralSource,
      couponCode,
      customAmount
    } = await req.json();
    
    console.log(`[${requestId}] Processing checkout for ${email} with ticket ${ticketType}`);
    
    // Validate the ticket type
    if (!ticketType || !["student", "professional", "student-group"].includes(ticketType)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid ticket type",
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Validate email
    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email address",
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // For student-group ticket, ensure groupSize is provided
    if (ticketType === "student-group" && (!groupSize || groupSize < 3)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Group size must be at least 3 for group tickets",
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
      apiVersion: "2022-11-15",
      httpClient: Stripe.createFetchHttpClient()
    });
    
    // Calculate the payment amount based on ticket type and group size
    // If customAmount is provided, use it instead (for coupon discounts)
    let { amount, description } = calculatePaymentAmount(ticketType, groupSize);
    
    // Override with custom amount if provided (handles coupons)
    if (customAmount !== undefined) {
      amount = Math.round(customAmount * 100); // Convert dollars to cents
    }
    
    // Don't create a session for zero-amount checkouts
    // These should be handled by the direct registration path
    if (amount <= 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Zero amount checkouts should use direct registration",
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    console.log(`[${requestId}] Creating checkout session for amount: $${amount/100}`);
    
    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `RAADE Conference 2025: ${description}`,
              description: "RAADE African Development Forum - April 11-12, 2025"
            },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/conference/registration-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/conference/register`,
      customer_email: email,
      metadata: {
        ticketType,
        fullName,
        email,
        organization,
        role,
        groupSize: groupSize?.toString() || undefined,
        groupEmails: groupEmails ? JSON.stringify(groupEmails) : undefined,
        specialRequests,
        referralSource,
        couponCode
      }
    });
    
    // Return the session ID
    return new Response(
      JSON.stringify({
        success: true,
        sessionId: session.id
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error(`[${requestId}] Error creating checkout session:`, error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
