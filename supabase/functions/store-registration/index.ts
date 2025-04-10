
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Generate a unique request ID for tracking
  const requestId = crypto.randomUUID().substring(0, 8);
  console.log(`[${requestId}] Starting registration storage`);

  try {
    // Get the Supabase client - using service role key for admin rights
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      {
        auth: {
          persistSession: false
        }
      }
    );

    // Get registration data from request body
    const registrationData = await req.json();
    const {
      fullName,
      email,
      organization,
      role,
      ticketType,
      groupSize,
      groupEmails,
      specialRequests,
      referralSource,
      couponCode,
      paymentComplete = true
    } = registrationData;

    console.log(`[${requestId}] Processing registration for ${email}, ticket type: ${ticketType}`);

    // Validate required fields
    if (!fullName || !email || !ticketType) {
      console.log(`[${requestId}] Missing required fields`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Missing required information" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Check if registration already exists
    const { data: existingReg, error: checkError } = await supabaseAdmin
      .from('conference_registrations')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      console.error(`[${requestId}] Error checking existing registration:`, checkError);
    }

    if (existingReg) {
      console.log(`[${requestId}] Registration already exists for ${email}`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Registration already exists",
          data: { id: existingReg.id }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert new registration
    console.log(`[${requestId}] Creating new registration record`);
    const { data: registrationRecord, error: insertError } = await supabaseAdmin
      .from('conference_registrations')
      .insert({
        full_name: fullName,
        email: email,
        organization: organization || "",
        role: role || "",
        ticket_type: ticketType,
        special_requests: specialRequests || "",
        coupon_code: couponCode || null,
        status: paymentComplete ? 'confirmed' : 'pending',
        payment_method: 'stripe'
      })
      .select('id')
      .single();

    if (insertError) {
      console.error(`[${requestId}] Error inserting registration:`, insertError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to store registration data", 
          error: insertError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const registrationId = registrationRecord?.id;
    console.log(`[${requestId}] Registration created with ID: ${registrationId}`);

    // For group registrations, handle group members
    if (ticketType === 'student-group' && groupEmails && Array.isArray(groupEmails) && groupEmails.length > 0) {
      console.log(`[${requestId}] Processing group registration with ${groupEmails.length} members`);
      
      // Create a group registration record
      const { data: groupData, error: groupError } = await supabaseAdmin
        .from('group_registrations')
        .insert({
          lead_name: fullName,
          lead_email: email,
          lead_organization: organization || "",
          ticket_type: ticketType,
          group_size: groupSize || groupEmails.length + 1,
          payment_completed: paymentComplete,
          completed: true
        })
        .select('id')
        .single();

      if (groupError) {
        console.error(`[${requestId}] Error creating group record:`, groupError);
      } else if (groupData) {
        console.log(`[${requestId}] Group record created with ID: ${groupData.id}`);
        
        // Add group members
        for (const emailEntry of groupEmails) {
          // Handle both string emails and {value: string} objects
          const memberEmail = typeof emailEntry === 'object' ? 
            (emailEntry && 'value' in emailEntry ? emailEntry.value : null) : 
            emailEntry;
            
          if (!memberEmail || typeof memberEmail !== 'string' || !memberEmail.includes('@')) {
            continue; // Skip invalid emails
          }
          
          const { error: memberError } = await supabaseAdmin
            .from('group_registration_members')
            .insert({
              group_id: groupData.id,
              email: memberEmail,
              email_verified: false
            });
            
          if (memberError) {
            console.error(`[${requestId}] Error adding group member ${memberEmail}:`, memberError);
          }
        }
      }
    }

    // Track the registration email for sending welcome email
    try {
      const { error: trackingError } = await supabaseAdmin
        .from('email_tracking')
        .insert({
          email: email,
          full_name: fullName,
          ticket_type: ticketType,
          email_type: 'welcome',
          status: 'pending',
          coupon_code: couponCode || null,
          group_size: groupSize || null
        });
        
      if (trackingError) {
        console.error(`[${requestId}] Error creating email tracking entry:`, trackingError);
      } else {
        console.log(`[${requestId}] Email tracking entry created for welcome email`);
      }
    } catch (emailError) {
      console.error(`[${requestId}] Exception in email tracking:`, emailError);
    }

    console.log(`[${requestId}] Registration storage completed successfully`);
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Registration data stored successfully",
        data: { id: registrationId }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(`[${requestId}] Unexpected error:`, error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "An unexpected error occurred",
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
