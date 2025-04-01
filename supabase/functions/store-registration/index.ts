
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

// Define CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Helper function to create standardized responses
function createResponse(data: any, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    }
  );
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Get the request ID for tracking
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Processing registration storage request`);
  
  try {
    // Parse the request body
    const requestData = await req.json();
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
      paymentComplete = false
    } = requestData;
    
    // Validate required data
    if (!fullName || !email || !ticketType) {
      console.error(`[${requestId}] Missing required registration data`);
      return createResponse({
        success: false,
        message: "Missing required registration data",
      }, 400);
    }
    
    // Initialize Supabase client with admin privileges
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    // Check if a record with this email already exists
    const { data: existingRegistration, error: checkError } = await supabaseAdmin
      .from('conference_registrations')
      .select('id, email, ticket_type')
      .eq('email', email)
      .maybeSingle();
      
    if (checkError) {
      console.error(`[${requestId}] Error checking for existing registration:`, checkError);
      throw new Error(`Database error: ${checkError.message}`);
    }
    
    // Process based on existing data or create new record
    let result;
    
    if (existingRegistration) {
      // Update the existing record
      console.log(`[${requestId}] Updating existing registration for ${email}`);
      
      const { data, error: updateError } = await supabaseAdmin
        .from('conference_registrations')
        .update({
          full_name: fullName,
          organization,
          role,
          ticket_type: ticketType,
          special_requests: specialRequests || null,
          status: paymentComplete ? 'confirmed' : 'pending',
          updated_at: new Date().toISOString(),
          verification_method: referralSource || null
        })
        .eq('id', existingRegistration.id)
        .select();
        
      if (updateError) {
        console.error(`[${requestId}] Error updating registration:`, updateError);
        throw new Error(`Database update error: ${updateError.message}`);
      }
      
      result = { 
        success: true, 
        action: "updated",
        registration_id: existingRegistration.id,
        data
      };
    } else {
      // Create a new registration record
      console.log(`[${requestId}] Creating new registration for ${email}`);
      
      // Set default email_verified to true for professional registrations
      // For student tickets, this will be set through the verification process
      const emailVerified = ticketType === "professional" ? true : false;
      
      const { data: newRegistration, error: insertError } = await supabaseAdmin
        .from('conference_registrations')
        .insert({
          full_name: fullName,
          email,
          organization,
          role,
          ticket_type: ticketType,
          special_requests: specialRequests || null,
          status: paymentComplete ? 'confirmed' : 'pending',
          verification_method: referralSource || null,
          email_verified: emailVerified
        })
        .select();
        
      if (insertError) {
        console.error(`[${requestId}] Error inserting registration:`, insertError);
        throw new Error(`Database insert error: ${insertError.message}`);
      }
      
      result = { 
        success: true, 
        action: "created",
        registration_id: newRegistration?.[0]?.id,
        data: newRegistration
      };
    }
    
    // If this is a group registration, handle the group members
    if (ticketType === "student-group" && groupSize && groupEmails && Array.isArray(groupEmails) && groupEmails.length > 0) {
      // Create or update group registration record
      const groupData = {
        lead_name: fullName,
        lead_email: email,
        lead_organization: organization,
        group_size: typeof groupSize === 'string' ? parseInt(groupSize) : groupSize,
        ticket_type: ticketType,
        payment_completed: paymentComplete,
        completed: paymentComplete
      };
      
      let groupId;
      
      // Check for existing group with this lead email
      const { data: existingGroup, error: groupCheckError } = await supabaseAdmin
        .from('group_registrations')
        .select('id')
        .eq('lead_email', email)
        .maybeSingle();
        
      if (groupCheckError) {
        console.error(`[${requestId}] Error checking for existing group:`, groupCheckError);
      }
      
      if (existingGroup) {
        // Update existing group
        const { data: updatedGroup, error: groupUpdateError } = await supabaseAdmin
          .from('group_registrations')
          .update(groupData)
          .eq('id', existingGroup.id)
          .select('id');
          
        if (groupUpdateError) {
          console.error(`[${requestId}] Error updating group:`, groupUpdateError);
        } else {
          groupId = existingGroup.id;
        }
      } else {
        // Create new group
        const { data: newGroup, error: groupInsertError } = await supabaseAdmin
          .from('group_registrations')
          .insert(groupData)
          .select('id');
          
        if (groupInsertError) {
          console.error(`[${requestId}] Error inserting group:`, groupInsertError);
        } else {
          groupId = newGroup?.[0]?.id;
        }
      }
      
      // Process group member emails if we have a group ID
      if (groupId) {
        // Clean and process emails
        const processedEmails = groupEmails
          .filter(Boolean)
          .map(item => {
            if (typeof item === 'object' && item !== null && 'value' in item) {
              return String(item.value || '').trim();
            }
            return String(item || '').trim();
          })
          .filter(email => email.length > 0 && email.includes('@'));
        
        // First delete any existing members to avoid duplicates
        await supabaseAdmin
          .from('group_registration_members')
          .delete()
          .eq('group_id', groupId);
        
        // Now insert all the new members
        if (processedEmails.length > 0) {
          const memberInserts = processedEmails.map(memberEmail => ({
            email: memberEmail,
            group_id: groupId,
            email_verified: false, // Will be verified separately
            from_known_institution: false // Will be determined during verification
          }));
          
          const { error: membersInsertError } = await supabaseAdmin
            .from('group_registration_members')
            .insert(memberInserts);
            
          if (membersInsertError) {
            console.error(`[${requestId}] Error inserting group members:`, membersInsertError);
          } else {
            console.log(`[${requestId}] Successfully added ${processedEmails.length} group members`);
          }
        }
      }
    }
    
    // Return success response with result data
    console.log(`[${requestId}] Registration storage successful`);
    return createResponse({
      success: true,
      ...result
    });
    
  } catch (error) {
    console.error(`[${requestId}] Unhandled error in store-registration:`, error);
    
    return createResponse({
      success: false,
      message: error.message || "An unexpected error occurred",
      requestId
    }, 500);
  }
});
