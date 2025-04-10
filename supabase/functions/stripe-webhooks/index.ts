
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Stripe Webhooks Edge Function
 * 
 * Handles Stripe webhooks for donation and registration processing:
 * - Updates donation and registration status in the database
 * - Processes various Stripe events like payment success/failure
 * - Securely validates webhook signatures
 * - Adds improved reconciliation for checkout sessions
 * - Logs events for audit purposes
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
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get the webhook secret
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
    
    // Get the signature from the headers
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      throw new Error("Missing Stripe signature header");
    }
    
    // Get the raw request body as text
    const body = await req.text();
    
    // Verify the event is from Stripe using the webhook secret and signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    console.log(`Processing Stripe event: ${event.type}`);

    // Handle donation related events
    if (event.data.object.metadata?.type === 'donation') {
      await handleDonationEvent(event, supabase);
    } 
    // Handle conference registration related events
    else if (
      event.data.object.metadata?.isConferenceRegistration === 'true' ||
      event.data.object.metadata?.ticketType
    ) {
      await handleRegistrationEvent(event, supabase, stripe);
    }
    // Handle all other payment events
    else {
      await handleGenericPaymentEvent(event, supabase);
    }
    
    // Return a response to acknowledge receipt of the event
    return new Response(
      JSON.stringify({ received: true }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error(`Error processing Stripe webhook: ${error.message}`);
    
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
 * Handle donation-specific events
 */
async function handleDonationEvent(event, supabase) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`Donation PaymentIntent succeeded: ${paymentIntent.id}`);
      
      // Update the donation status in the database
      const { error: updateError } = await supabase
        .from('donations')
        .update({ payment_status: 'succeeded' })
        .eq('payment_intent_id', paymentIntent.id);
      
      if (updateError) {
        console.error(`Error updating donation: ${updateError.message}`);
      } else {
        console.log(`Successfully updated donation status for payment: ${paymentIntent.id}`);
      }
      break;
    
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      console.log(`Donation PaymentIntent failed: ${failedPaymentIntent.id}`);
      
      // Update the donation status to failed
      const { error: failUpdateError } = await supabase
        .from('donations')
        .update({ payment_status: 'failed' })
        .eq('payment_intent_id', failedPaymentIntent.id);
      
      if (failUpdateError) {
        console.error(`Error updating donation failure: ${failUpdateError.message}`);
      }
      break;
  }
}

/**
 * Handle conference registration events
 */
async function handleRegistrationEvent(event, supabase, stripe) {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(`Checkout session completed: ${session.id}`);
      
      // Make sure we have a completed payment
      if (session.payment_status !== 'paid') {
        console.log(`Session ${session.id} not paid yet, status: ${session.payment_status}`);
        return;
      }
      
      // Extract metadata from the session
      const email = session.customer_details?.email;
      const ticket_type = session.metadata?.ticketType;
      
      if (!email) {
        console.error(`No email found in session ${session.id}`);
        
        // Store in reconciliation table for manual handling
        await storeSessionForReconciliation(session, supabase);
        return;
      }
      
      // Look for the registration with this email
      const { data: registrations, error: regQueryError } = await supabase
        .from('conference_registrations')
        .select('id, email, status')
        .eq('email', email);
      
      if (regQueryError) {
        console.error(`Error finding registration: ${regQueryError.message}`);
        await storeSessionForReconciliation(session, supabase);
        return;
      }
      
      // If registration found, update it
      if (registrations && registrations.length > 0) {
        const { error: updateError } = await supabase
          .from('conference_registrations')
          .update({ 
            status: 'completed',
            payment_method: 'stripe'
          })
          .eq('id', registrations[0].id);
        
        if (updateError) {
          console.error(`Error updating registration: ${updateError.message}`);
        } else {
          console.log(`Successfully updated registration for ${email}`);
        }
      } else {
        // No registration found - store for manual reconciliation
        console.log(`No registration found for ${email}, storing for reconciliation`);
        await storeSessionForReconciliation(session, supabase);
      }
      
      // If this is a group registration, handle it separately
      if (ticket_type === 'student-group' && session.metadata?.groupSize) {
        await handleGroupRegistration(session, supabase);
      }
      
      break;
      
    case 'checkout.session.expired':
      // Handle expired sessions
      const expiredSession = event.data.object;
      console.log(`Checkout session expired: ${expiredSession.id}`);
      
      // Store in reconciliation table
      await storeSessionForReconciliation(expiredSession, supabase, 'expired');
      break;
  }
}

/**
 * Store session data for reconciliation
 */
async function storeSessionForReconciliation(session, supabase, status = 'needs_review') {
  try {
    const { error } = await supabase
      .from('stripe_reconciliation_data')
      .upsert({
        checkout_session_id: session.id,
        customer_email: session.customer_details?.email,
        customer_name: session.customer_details?.name,
        amount_total: session.amount_total ? session.amount_total / 100 : 0,
        payment_status: session.payment_status,
        created_at: new Date(session.created * 1000).toISOString(),
        metadata: session.metadata || {},
        raw_data: session,
        reconciliation_status: status
      });
      
    if (error) {
      console.error(`Error storing session for reconciliation: ${error.message}`);
    } else {
      console.log(`Session ${session.id} stored for reconciliation`);
    }
  } catch (err) {
    console.error(`Failed to store session for reconciliation: ${err.message}`);
  }
}

/**
 * Handle group registration checkout completion
 */
async function handleGroupRegistration(session, supabase) {
  const email = session.customer_details?.email;
  const groupSize = parseInt(session.metadata?.groupSize || '0', 10);
  
  if (!email || groupSize <= 0) {
    console.error(`Invalid group registration data for session ${session.id}`);
    return;
  }
  
  // Find if there's an existing group registration
  const { data: existingGroups, error: groupQueryError } = await supabase
    .from('group_registrations')
    .select('id')
    .eq('lead_email', email);
    
  if (groupQueryError) {
    console.error(`Error finding group registration: ${groupQueryError.message}`);
    return;
  }
  
  // If found, update it to mark payment as completed
  if (existingGroups && existingGroups.length > 0) {
    const { error: updateError } = await supabase
      .from('group_registrations')
      .update({ payment_completed: true })
      .eq('id', existingGroups[0].id);
      
    if (updateError) {
      console.error(`Error updating group registration: ${updateError.message}`);
    } else {
      console.log(`Successfully updated group registration for ${email}`);
    }
  }
}

/**
 * Handle generic payment events
 */
async function handleGenericPaymentEvent(event, supabase) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
      
      // Try to update donation first
      const { error: donationError } = await supabase
        .from('donations')
        .update({ payment_status: 'succeeded' })
        .eq('payment_intent_id', paymentIntent.id);
      
      if (donationError) {
        console.log(`No donation found for payment: ${paymentIntent.id}`);
        
        // If not a donation, store for reconciliation
        await storePaymentIntentForReconciliation(paymentIntent, supabase);
      }
      break;
    
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      console.log(`PaymentIntent failed: ${failedPaymentIntent.id}`);
      
      // Update donation status if it exists
      const { error: failUpdateError } = await supabase
        .from('donations')
        .update({ payment_status: 'failed' })
        .eq('payment_intent_id', failedPaymentIntent.id);
      
      if (failUpdateError) {
        console.log(`No donation found for failed payment: ${failedPaymentIntent.id}`);
      }
      break;
  }
}

/**
 * Store payment intent data for reconciliation
 */
async function storePaymentIntentForReconciliation(paymentIntent, supabase) {
  try {
    const { error } = await supabase
      .from('stripe_reconciliation_data')
      .upsert({
        payment_intent_id: paymentIntent.id,
        customer_email: paymentIntent.receipt_email,
        amount_total: paymentIntent.amount / 100,
        payment_status: paymentIntent.status,
        created_at: new Date(paymentIntent.created * 1000).toISOString(),
        metadata: paymentIntent.metadata || {},
        raw_data: paymentIntent,
        reconciliation_status: 'needs_review'
      });
      
    if (error) {
      console.error(`Error storing payment intent for reconciliation: ${error.message}`);
    }
  } catch (err) {
    console.error(`Failed to store payment intent for reconciliation: ${err.message}`);
  }
}
