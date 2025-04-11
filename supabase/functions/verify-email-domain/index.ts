
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailValidationRequest {
  email: string;
  ticketType: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, ticketType } = await req.json() as EmailValidationRequest;
    
    if (!email) {
      // Even for missing email, return 200 with an error field instead of 400
      return new Response(
        JSON.stringify({ 
          isValid: false, 
          error: "Email is required",
          message: "Email is required" 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Extract domain from email
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!domain) {
      // Return 200 with error info
      return new Response(
        JSON.stringify({ 
          isValid: false, 
          error: "Invalid email format",
          message: "Invalid email format" 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const isRiceEmail = domain === "rice.edu";
    const isEduEmail = domain.endsWith('.edu');
    
    // Check if domain is in the approved_edu_domains table
    const { data: knownDomain, error: domainError } = await supabase
      .from('approved_edu_domains')
      .select('*')
      .eq('domain', domain)
      .single();

    if (domainError && domainError.code !== 'PGRST116') { // Not found is okay
      console.error("Error checking domain:", domainError);
    }

    const isKnownInstitution = !!knownDomain;

    // Perform validation logic - but still return 200 status
    let isValid = true;
    let message = "";

    // Rice Student tickets must use rice.edu email
    if (ticketType === "rice-student" && !isRiceEmail) {
      isValid = false;
      message = "Rice Student tickets require a rice.edu email address";
    }
    
    // Non-Rice Student tickets require any .edu email
    else if ((ticketType === "non-rice-student" || ticketType === "student-group") && !isEduEmail && !isKnownInstitution) {
      isValid = false;
      message = "Student tickets require an .edu email address or an approved educational institution email";
    }

    return new Response(
      JSON.stringify({ 
        isValid,
        message,
        domain,
        isRiceEmail,
        isEduEmail,
        isKnownInstitution
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in verify-email-domain function:", error);
    
    // Return 200 even on server errors, with error info in the response
    return new Response(
      JSON.stringify({ 
        isValid: false, 
        error: "Server error processing request",
        message: "An error occurred while validating your email. Please try again."
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
