
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
  
  // Get the request ID for tracking or generate a new one
  const requestData = await req.json().catch(() => ({}));
  const requestId = requestData.requestId || crypto.randomUUID();
  
  console.log(`[${requestId}] Processing registration storage request`);
  console.log(`[${requestId}] Supabase URL environment variable exists: ${!!Deno.env.get("SUPABASE_URL")}`);
  console.log(`[${requestId}] Service Role Key environment variable exists: ${!!Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`);
  
  try {
    // Parse the request body
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
      paymentComplete = false
    } = requestData;
    
    console.log(`[${requestId}] Registration data received for ${email}`);
    
    // Validate required data
    if (!fullName || !email || !ticketType) {
      console.error(`[${requestId}] Missing required registration data: fullName=${!!fullName}, email=${!!email}, ticketType=${!!ticketType}`);
      return createResponse({
        success: false,
        message: "Missing required registration data",
        requestId
      }, 400);
    }
    
    // Initialize Supabase client with admin privileges
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error(`[${requestId}] Missing Supabase environment variables`);
      return createResponse({
        success: false,
        message: "Server configuration error: Missing database connection details",
        environmentCheck: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseServiceRoleKey
        },
        requestId
      }, 500);
    }
    
    console.log(`[${requestId}] Initializing Supabase client`);
    
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    // If a coupon code was provided, increment its usage
    if (couponCode) {
      console.log(`[${requestId}] Incrementing usage count for coupon code: ${couponCode}`);
      
      try {
        const { data: couponData, error: couponError } = await supabaseAdmin.rpc(
          'increment_coupon_usage',
          { coupon_code_param: couponCode }
        );
        
        if (couponError) {
          console.error(`[${requestId}] Error incrementing coupon usage:`, couponError);
          // Continue with registration despite coupon error
        } else {
          console.log(`[${requestId}] Coupon usage updated. New count: ${couponData}`);
        }
      } catch (couponUpdateError) {
        console.error(`[${requestId}] Exception during coupon update:`, couponUpdateError);
        // Continue with registration despite coupon error
      }
    }
    
    // Check if a record with this email already exists
    console.log(`[${requestId}] Checking for existing registration: ${email}`);
    let existingRegistration;
    let checkError;
    
    try {
      const result = await supabaseAdmin
        .from('conference_registrations')
        .select('id, email, ticket_type')
        .eq('email', email)
        .maybeSingle();
        
      existingRegistration = result.data;
      checkError = result.error;
    } catch (error) {
      console.error(`[${requestId}] Exception checking for existing registration:`, error);
      checkError = error;
    }
      
    if (checkError) {
      console.error(`[${requestId}] Error checking for existing registration:`, checkError);
      return createResponse({
        success: false,
        message: `Database error: ${checkError.message || "Error checking existing registrations"}`,
        details: checkError,
        requestId
      }, 500);
    }
    
    // Process based on existing data or create new record
    let result;
    
    if (existingRegistration) {
      // Update the existing record
      console.log(`[${requestId}] Updating existing registration for ${email}`);
      
      try {
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
            verification_method: referralSource || null,
            coupon_code: couponCode || null
          })
          .eq('id', existingRegistration.id)
          .select();
          
        if (updateError) {
          console.error(`[${requestId}] Error updating registration:`, updateError);
          return createResponse({
            success: false,
            message: `Database update error: ${updateError.message || "Error updating registration"}`,
            details: updateError,
            requestId
          }, 500);
        }
        
        result = { 
          success: true, 
          action: "updated",
          registration_id: existingRegistration.id,
          data
        };
      } catch (updateException) {
        console.error(`[${requestId}] Exception updating registration:`, updateException);
        return createResponse({
          success: false,
          message: `Exception: ${updateException.message || "Error during update operation"}`,
          requestId
        }, 500);
      }
    } else {
      // Create a new registration record
      console.log(`[${requestId}] Creating new registration for ${email}`);
      
      // Set default email_verified to true for professional registrations
      // For student tickets, this will be set through the verification process
      const emailVerified = ticketType === "professional" ? true : false;
      
      try {
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
            email_verified: emailVerified,
            coupon_code: couponCode || null
          })
          .select();
          
        if (insertError) {
          console.error(`[${requestId}] Error inserting registration:`, insertError);
          return createResponse({
            success: false,
            message: `Database insert error: ${insertError.message || "Error creating registration"}`,
            details: insertError,
            requestId
          }, 500);
        }
        
        result = { 
          success: true, 
          action: "created",
          registration_id: newRegistration?.[0]?.id,
          data: newRegistration
        };
      } catch (insertException) {
        console.error(`[${requestId}] Exception inserting registration:`, insertException);
        return createResponse({
          success: false, 
          message: `Exception: ${insertException.message || "Error during insert operation"}`,
          requestId
        }, 500);
      }
    }
    
    // If this is a group registration, handle the group members
    if (ticketType === "student-group" && groupSize && groupEmails && Array.isArray(groupEmails) && groupEmails.length > 0) {
      // Create or update group registration record
      console.log(`[${requestId}] Processing group registration with ${groupEmails.length} members`);
      
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
      
      try {
        // Check for existing group with this lead email
        const { data: existingGroup, error: groupCheckError } = await supabaseAdmin
          .from('group_registrations')
          .select('id')
          .eq('lead_email', email)
          .maybeSingle();
          
        if (groupCheckError) {
          console.error(`[${requestId}] Error checking for existing group:`, groupCheckError);
          // Continue processing, don't exit with error
        }
        
        if (existingGroup) {
          // Update existing group
          console.log(`[${requestId}] Updating existing group for ${email}`);
          const { data: updatedGroup, error: groupUpdateError } = await supabaseAdmin
            .from('group_registrations')
            .update(groupData)
            .eq('id', existingGroup.id)
            .select('id');
            
          if (groupUpdateError) {
            console.error(`[${requestId}] Error updating group:`, groupUpdateError);
          } else {
            groupId = existingGroup.id;
            console.log(`[${requestId}] Group updated successfully: ${groupId}`);
          }
        } else {
          // Create new group
          console.log(`[${requestId}] Creating new group for ${email}`);
          const { data: newGroup, error: groupInsertError } = await supabaseAdmin
            .from('group_registrations')
            .insert(groupData)
            .select('id');
            
          if (groupInsertError) {
            console.error(`[${requestId}] Error inserting group:`, groupInsertError);
          } else {
            groupId = newGroup?.[0]?.id;
            console.log(`[${requestId}] Group created successfully: ${groupId}`);
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
          
          console.log(`[${requestId}] Processing ${processedEmails.length} group members`);
          
          // First delete any existing members to avoid duplicates
          const { error: deleteError } = await supabaseAdmin
            .from('group_registration_members')
            .delete()
            .eq('group_id', groupId);
            
          if (deleteError) {
            console.error(`[${requestId}] Error deleting existing group members:`, deleteError);
          }
          
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
      } catch (groupError) {
        console.error(`[${requestId}] Exception during group processing:`, groupError);
        // Continue with main registration despite group error
      }
    }
    
    // Return success response with result data
    console.log(`[${requestId}] Registration storage successful`);
    return createResponse({
      success: true,
      ...result,
      requestId
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error(`[${requestId}] Unhandled error in store-registration:`, error);
    console.error(`[${requestId}] Error details:`, { message: errorMessage, stack: errorStack });
    
    return createResponse({
      success: false,
      message: errorMessage || "An unexpected error occurred",
      requestId,
      timestamp: new Date().toISOString()
    }, 500);
  }
});
