
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
    
    // Check if the sale is still active
    const currentDate = new Date();
    const saleEndDate = new Date('2025-04-08T16:00:00-05:00'); // CST is UTC-5
    const isSaleActive = currentDate < saleEndDate;
    
    // Define prices in cents based on whether the sale is active
    const STUDENT_PRICE = isSaleActive ? 2500 : 3500; // $25.00 (sale) / $35.00 (regular)
    const PROFESSIONAL_PRICE = isSaleActive ? 5000 : 6000; // $50.00 (sale) / $60.00 (regular)
    const GROUP_PRICE_PER_PERSON = isSaleActive ? 2000 : 3000; // $20.00 (sale) / $30.00 (regular) per person
    
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
        // Allow for groups of 3 or more
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
