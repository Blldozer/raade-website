
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

// Define CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// List of special school codes that have unlimited uses but can't be used by the same email twice
const UNLIMITED_SCHOOL_CODES = ['PVAMU', 'TEXAS', 'TULANE'];

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
  let requestData;
  try {
    requestData = await req.json();
  } catch (parseError) {
    console.error("Error parsing request JSON:", parseError);
    return createResponse({
      success: false,
      message: "Invalid JSON in request body",
      error: String(parseError)
    }, 400);
  }
  
  const requestId = requestData.requestId || crypto.randomUUID();
  
  console.log(`[${requestId}] Processing registration storage request`);
  
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
    
    console.log(`[${requestId}] Registration data received for ${email}, coupon code: ${couponCode || 'None'}`);
    
    // Initialize Supabase client with admin privileges
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error(`[${requestId}] Missing Supabase environment variables`);
      console.error(`[${requestId}] Environment check: SUPABASE_URL=${!!supabaseUrl}, SUPABASE_SERVICE_ROLE_KEY=${!!supabaseServiceRoleKey}`);
      
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
    
    console.log(`[${requestId}] Initializing Supabase client with URL: ${supabaseUrl.substring(0, 20)}...`);
    
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    // Verify the Supabase connection is working
    try {
      const { error: connectionTestError } = await supabaseAdmin.from('coupon_codes').select('id').limit(1);
      if (connectionTestError) {
        console.error(`[${requestId}] Supabase connection test failed:`, connectionTestError);
        throw new Error(`Database connection failed: ${connectionTestError.message}`);
      } else {
        console.log(`[${requestId}] Supabase connection test successful`);
      }
    } catch (connectionError) {
      console.error(`[${requestId}] Supabase connection test exception:`, connectionError);
      return createResponse({
        success: false,
        message: "Database connection failed",
        error: String(connectionError),
        requestId
      }, 500);
    }
    
    // Store the registration in the database
    try {
      // Check for existing registration
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
        
        console.log(`[${requestId}] Existing registration check result:`, existingRegistration ? "Found" : "Not found");
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
      
      // Process group emails into array format for database storage
      let processedGroupEmails = [];
      if (groupEmails && Array.isArray(groupEmails)) {
        processedGroupEmails = groupEmails
          .filter(Boolean)
          .map(email => {
            if (typeof email === 'object' && email !== null && 'value' in email) {
              return email.value;
            }
            return String(email || '');
          })
          .filter(email => email.length > 0);
      }
      
      // Create the registration data object
      const registrationData = {
        fullName,
        email,
        organization,
        role,
        ticketType,
        specialRequests: specialRequests || '',
        couponCode: couponCode || null,
        payment_method: 'stripe',
        status: paymentComplete ? 'confirmed' : 'pending'
      };
      
      console.log(`[${requestId}] Processing registration with data:`, registrationData);
      
      let result;
      
      if (existingRegistration) {
        // Update the existing record
        console.log(`[${requestId}] Updating existing registration for ${email}`);
        
        result = await supabaseAdmin
          .from('conference_registrations')
          .update(registrationData)
          .eq('id', existingRegistration.id)
          .select();
      } else {
        // Create a new record
        console.log(`[${requestId}] Creating new registration for ${email}`);
        
        result = await supabaseAdmin
          .from('conference_registrations')
          .insert(registrationData)
          .select();
      }
      
      if (result.error) {
        console.error(`[${requestId}] Error saving registration:`, result.error);
        return createResponse({
          success: false,
          message: `Database error: ${result.error.message || "Error saving registration"}`,
          details: result.error,
          requestId
        }, 500);
      }
      
      // Process group members if this is a group registration
      if (ticketType === 'student-group' && groupSize && groupSize > 1 && processedGroupEmails.length > 0) {
        console.log(`[${requestId}] Processing group registration with ${processedGroupEmails.length} members`);
        
        try {
          // Get the registration ID
          const registrationId = result.data && result.data[0]?.id;
          
          if (!registrationId) {
            console.error(`[${requestId}] No registration ID found for group processing`);
            return createResponse({
              success: false,
              message: "Error processing group registration: No registration ID found",
              requestId
            }, 500);
          }
          
          // Create the group registration record
          const { data: groupData, error: groupError } = await supabaseAdmin
            .from('group_registrations')
            .insert({
              lead_email: email,
              lead_name: fullName,
              lead_organization: organization,
              ticket_type: ticketType,
              group_size: groupSize,
              payment_completed: paymentComplete,
              completed: true
            })
            .select();
            
          if (groupError) {
            console.error(`[${requestId}] Error creating group registration:`, groupError);
            // Continue without failing the main registration
          } else {
            console.log(`[${requestId}] Group registration created successfully`);
            
            // Add group members if we have a group ID
            const groupId = groupData && groupData[0]?.id;
            
            if (groupId) {
              // Process group members
              for (const memberEmail of processedGroupEmails) {
                if (!memberEmail) continue;
                
                try {
                  const { error: memberError } = await supabaseAdmin
                    .from('group_registration_members')
                    .insert({
                      group_id: groupId,
                      email: memberEmail,
                      full_name: '', // We don't have full names for members
                      email_verified: false
                    });
                    
                  if (memberError) {
                    console.error(`[${requestId}] Error adding group member ${memberEmail}:`, memberError);
                    // Continue processing other members
                  }
                } catch (memberError) {
                  console.error(`[${requestId}] Exception adding group member ${memberEmail}:`, memberError);
                  // Continue processing other members
                }
              }
            }
          }
        } catch (groupError) {
          console.error(`[${requestId}] Exception processing group registration:`, groupError);
          // Continue without failing the main registration
        }
      }
      
      // If a coupon code was used, validate and update its usage
      if (couponCode) {
        console.log(`[${requestId}] Processing coupon code ${couponCode}`);
        
        // Special handling for unlimited school codes - just record usage but don't increment
        if (!UNLIMITED_SCHOOL_CODES.includes(couponCode)) {
          try {
            // Increment coupon usage for non-school codes
            const { data: usageData, error: usageError } = await supabaseAdmin.rpc(
              'increment_coupon_usage',
              { coupon_code_param: couponCode }
            );
            
            if (usageError) {
              console.error(`[${requestId}] Error incrementing coupon usage:`, usageError);
              // Continue since registration was successful
            } else {
              console.log(`[${requestId}] Successfully incremented usage for coupon: ${couponCode}`);
            }
          } catch (couponError) {
            console.error(`[${requestId}] Exception updating coupon usage:`, couponError);
            // Continue since registration was successful
          }
        } else {
          console.log(`[${requestId}] School code detected, not incrementing usage counter`);
        }
      }
      
      console.log(`[${requestId}] Registration completed successfully`);
      
      // Return success response
      return createResponse({
        success: true,
        message: "Registration saved successfully",
        data: {
          registrationId: result.data && result.data[0]?.id,
          email
        },
        requestId
      });
      
    } catch (error) {
      console.error(`[${requestId}] Unexpected error processing registration:`, error);
      return createResponse({
        success: false,
        message: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
        requestId
      }, 500);
    }
  } catch (error) {
    console.error(`[${requestId}] Critical error:`, error);
    return createResponse({
      success: false,
      message: `Critical error: ${error instanceof Error ? error.message : String(error)}`,
      requestId
    }, 500);
  }
});
