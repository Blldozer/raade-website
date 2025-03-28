
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

/**
 * Calculate Payment Amount Function
 * 
 * Simple Edge Function that calculates payment amounts based on ticket type
 * without connecting to Stripe. This function allows us to:
 * - Keep pricing logic consistent between client and server
 * - Provide amount information before creating payment intents
 * - Validate ticket types and group sizes
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { ticketType, groupSize } = await req.json();
    
    // Define base prices in cents
    const STUDENT_PRICE = 3500; // $35.00
    const PROFESSIONAL_PRICE = 6000; // $60.00
    const GROUP_PRICE_PER_PERSON = 3000; // $30.00 per person
    
    let amount = 0;
    let isGroupRegistration = false;
    
    // Determine price based on ticket type
    switch (ticketType) {
      case "student":
        amount = STUDENT_PRICE;
        break;
      
      case "professional":
        amount = PROFESSIONAL_PRICE;
        break;
      
      case "student-group":
        if (!groupSize || groupSize < 5) {
          return new Response(
            JSON.stringify({ 
              error: "Group registrations require at least 5 participants" 
            }),
            { 
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400
            }
          );
        }
        
        amount = GROUP_PRICE_PER_PERSON * groupSize;
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
    
    return new Response(
      JSON.stringify({
        amount,
        isGroupRegistration,
        currency: "usd",
        description: `RAADE Conference 2025 - ${ticketType} Registration`
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
    
  } catch (error) {
    console.error("Error calculating payment amount:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to calculate payment amount" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
