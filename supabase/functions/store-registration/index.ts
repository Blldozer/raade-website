
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
      firstName,
      lastName,
      fullName,  // For backward compatibility
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
    if (!firstName || !lastName || !email || !ticketType) {
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

    // First check if registration already exists - IMPROVED ROBUSTNESS
    const { data: existingReg, error: checkError } = await supabaseAdmin
      .from('conference_registrations')
      .select('id, email, first_name, last_name, full_name, status')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      console.error(`[${requestId}] Error checking existing registration:`, checkError);
      // Continue despite error - we'll handle duplicate constraint error later if needed
    }

    if (existingReg) {
      console.log(`[${requestId}] Registration already exists for ${email}`);
      
      // Return a successful response even though we're not creating a new registration
      // This prevents client-side retries from causing errors
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Registration already exists",
          data: { 
            id: existingReg.id,
            duplicateDetected: true,
            existingName: existingReg.full_name || `${existingReg.first_name} ${existingReg.last_name}`,
            status: existingReg.status
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert new registration
    console.log(`[${requestId}] Creating new registration record`);
    try {
      const { data: registrationRecord, error: insertError } = await supabaseAdmin
        .from('conference_registrations')
        .insert({
          first_name: firstName,
          last_name: lastName,
          full_name: fullName || `${firstName} ${lastName}`.trim(), // For backward compatibility
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
        // Check if this is a unique constraint violation (duplicate email)
        if (insertError.code === '23505' || insertError.message?.includes('duplicate key value')) {
          console.log(`[${requestId}] Duplicate email detected during insert: ${email}`);
          
          // Get the existing registration to return its ID
          const { data: existingRecord } = await supabaseAdmin
            .from('conference_registrations')
            .select('id')
            .eq('email', email)
            .maybeSingle();
            
          // Return success with the existing record ID to prevent retries
          return new Response(
            JSON.stringify({ 
              success: true, 
              message: "Registration already exists",
              data: { 
                id: existingRecord?.id || 'unknown',
                duplicateDetected: true 
              } 
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        } else {
          // For other errors, return the error
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
            lead_first_name: firstName,
            lead_last_name: lastName,
            lead_name: fullName || `${firstName} ${lastName}`.trim(), // For backward compatibility
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
          for (const member of groupEmails) {
            // Handle both string emails and object members
            if (!member || typeof member !== 'object') {
              continue; // Skip invalid members
            }
            
            const memberEmail = member.email || (member.value ? member.value : null);
            const memberFirstName = member.firstName || '';
            const memberLastName = member.lastName || '';
            const memberFullName = `${memberFirstName} ${memberLastName}`.trim();
              
            if (!memberEmail || typeof memberEmail !== 'string' || !memberEmail.includes('@')) {
              continue; // Skip invalid emails
            }
            
            const { error: memberError } = await supabaseAdmin
              .from('group_registration_members')
              .insert({
                group_id: groupData.id,
                email: memberEmail,
                first_name: memberFirstName,
                last_name: memberLastName,
                full_name: memberFullName, // For backward compatibility
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
            first_name: firstName,
            last_name: lastName,
            full_name: fullName || `${firstName} ${lastName}`.trim(), // For backward compatibility
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
    } catch (insertError) {
      // Additional error handling for insert operation
      console.error(`[${requestId}] Exception during insert:`, insertError);
      
      // Check if this might be a duplicate key error
      if (insertError.message?.includes('duplicate key') || insertError.message?.includes('unique constraint')) {
        // Handle as duplicate registration
        const { data: existingRec } = await supabaseAdmin
          .from('conference_registrations')
          .select('id')
          .eq('email', email)
          .maybeSingle();
          
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Registration may already exist",
            data: { 
              id: existingRec?.id || 'unknown',
              duplicateDetected: true 
            } 
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to store registration data due to an error", 
          error: insertError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
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
