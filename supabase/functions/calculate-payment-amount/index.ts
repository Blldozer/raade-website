
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const requestData = await req.json();
    const { ticketType, groupSize = 0 } = requestData;
    
    // Define SALE prices in cents
    const STUDENT_PRICE = 2500; // $25.00 (was $35.00)
    const PROFESSIONAL_PRICE = 5000; // $50.00 (was $60.00)
    const GROUP_PRICE_PER_PERSON = 2000; // $20.00 per person (was $30.00)
    
    let amount = 0;
    
    // Calculate amount based on ticket type
    switch (ticketType) {
      case "student":
        amount = STUDENT_PRICE;
        break;
      
      case "professional":
        amount = PROFESSIONAL_PRICE;
        break;
      
      case "student-group":
        // Allow for groups of 3 or more now (was 5+)
        const validGroupSize = Math.max(3, parseInt(String(groupSize)) || 3);
        amount = GROUP_PRICE_PER_PERSON * validGroupSize;
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
        currency: "usd",
        ticketType,
        ...(ticketType === "student-group" ? { groupSize: Math.max(3, parseInt(String(groupSize)) || 3) } : {})
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error calculating payment amount:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
