
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Stripe Reconciliation Edge Function
 * 
 * This function synchronizes Stripe payment data with the database:
 * - Fetches all Stripe Checkout sessions for conference registrations
 * - Compares with existing database records
 * - Identifies missing or mismatched registrations
 * - Allows manual reconciliation of problematic registrations
 * - Provides detailed logs for auditing
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2022-11-15",
    });
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Parse the request body to get the action
    const requestBody = await req.json().catch(() => ({}));
    const action = requestBody.action || "";
    
    // Process based on the requested action
    if (action === "fetch-all") {
      // Fetch all Stripe checkout sessions for conference registrations
      const sessions = await fetchAllCheckoutSessions(stripe);
      
      // Insert into temporary storage for reconciliation
      if (sessions.length > 0) {
        const { data, error } = await supabase
          .from('stripe_reconciliation_data')
          .upsert(sessions.map(session => ({
            checkout_session_id: session.id,
            customer_email: session.customer_details?.email,
            customer_name: session.customer_details?.name,
            amount_total: session.amount_total ? session.amount_total / 100 : 0,
            payment_status: session.payment_status,
            created_at: new Date(session.created * 1000).toISOString(),
            metadata: session.metadata || {},
            raw_data: session
          })));
          
        if (error) {
          console.error("Error storing Stripe data:", error);
          return new Response(
            JSON.stringify({ error: "Failed to store Stripe data" }),
            { 
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            }
          );
        }
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          count: sessions.length,
          message: `Fetched ${sessions.length} Stripe sessions`
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    } 
    else if (action === "find-missing") {
      // Find registrations in Stripe that don't exist in our database
      const missingRegistrations = await findMissingRegistrations(supabase);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          missingRegistrations
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    else if (action === "reconcile") {
      // Reconcile a specific registration
      const { email, full_name, ticket_type, checkout_session_id, role, organization, from_known_institution, special_requests } = requestBody;
      
      if (!email || !full_name || !ticket_type || !checkout_session_id) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { 
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      
      // Create the missing registration record
      const { data, error } = await supabase
        .from('conference_registrations')
        .insert({
          email,
          full_name,
          ticket_type,
          status: 'completed',
          payment_method: 'stripe',
          role: role || 'attendee',
          organization: organization || 'Unknown',
          email_verified: true,
          from_known_institution: from_known_institution || false,
          special_requests: special_requests || null
        });
        
      if (error) {
        console.error("Error creating registration:", error);
        return new Response(
          JSON.stringify({ error: "Failed to create registration" }),
          { 
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      
      // Mark as reconciled in the reconciliation table
      await supabase
        .from('stripe_reconciliation_data')
        .update({ reconciled: true, reconciled_at: new Date().toISOString() })
        .eq('checkout_session_id', checkout_session_id);
        
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Registration reconciled successfully"
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    else {
      return new Response(
        JSON.stringify({ error: "Invalid action requested" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
  } catch (error) {
    console.error(`Error processing request:`, error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});

/**
 * Fetches all Stripe checkout sessions related to conference registrations
 */
async function fetchAllCheckoutSessions(stripe: Stripe) {
  const sessions = [];
  let hasMore = true;
  let startingAfter = null;
  
  // Fetch all sessions with pagination (100 at a time is Stripe's max)
  while (hasMore) {
    const params: any = { 
      limit: 100,
      expand: ['data.customer_details']
    };
    
    if (startingAfter) {
      params.starting_after = startingAfter;
    }
    
    const response = await stripe.checkout.sessions.list(params);
    
    // Filter only conference registration related sessions
    // Look for related metadata or specific products/prices
    const filteredSessions = response.data.filter(session => 
      session.metadata?.isConferenceRegistration === 'true' || 
      session.metadata?.ticketType || 
      (session.line_items?.data?.some(item => 
        item.description?.toLowerCase().includes('conference') ||
        item.price?.product?.name?.toLowerCase().includes('conference')
      ))
    );
    
    sessions.push(...filteredSessions);
    
    hasMore = response.has_more;
    if (hasMore && response.data.length > 0) {
      startingAfter = response.data[response.data.length - 1].id;
    }
  }
  
  return sessions;
}

/**
 * Find registrations in Stripe that are missing from our database
 */
async function findMissingRegistrations(supabase) {
  // First, get all emails from our reconciliation table
  const { data: stripeData, error: stripeError } = await supabase
    .from('stripe_reconciliation_data')
    .select('customer_email, checkout_session_id, customer_name, amount_total, created_at, reconciled')
    .eq('payment_status', 'paid')
    .order('created_at', { ascending: false });
    
  if (stripeError) {
    console.error("Error fetching Stripe data:", stripeError);
    throw new Error("Failed to fetch Stripe data");
  }
  
  // Get all emails from our unified_registrants view
  const { data: dbEmails, error: dbError } = await supabase
    .from('unified_registrants')
    .select('email');
    
  if (dbError) {
    console.error("Error fetching database emails:", dbError);
    throw new Error("Failed to fetch database emails");
  }
  
  // Create a set of all emails in the database for fast lookup
  const emailSet = new Set(dbEmails.map(record => record.email?.toLowerCase()));
  
  // Find Stripe registrations not in the database
  const missingRegistrations = stripeData.filter(record => 
    record.customer_email && 
    !emailSet.has(record.customer_email.toLowerCase()) &&
    !record.reconciled
  );
  
  return missingRegistrations;
}
