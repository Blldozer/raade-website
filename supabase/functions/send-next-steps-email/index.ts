
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";
import { Resend } from "https://esm.sh/resend@2.0.0";
import React from "https://esm.sh/react@18.3.1";
import { render } from "https://esm.sh/@react-email/render@0.0.7";
import { NextStepsEmail } from "../_shared/email-templates/next-steps-email.tsx";

// CORS headers for cross-origin requests
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

// Interface for the request payload
interface SendNextStepsRequest {
  campaignId?: string;
  registrantIds?: string[];
  emailFilter?: {
    registrantTypes?: string[];
    status?: string;
    ticketTypes?: string[];
  };
  dryRun?: boolean;
  senderName?: string;
  senderEmail?: string;
}

/**
 * Edge function to send "Next Steps" emails to conference registrants
 * 
 * Supports:
 * - Sending to specific registrants by ID
 * - Sending to filtered registrants (by type, status, ticket type)
 * - Creating email campaign records
 * - Dry run mode for testing
 */
serve(async (req) => {
  const requestId = crypto.randomUUID();
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  console.log(`[${requestId}] Processing next steps email request`);
  
  try {
    // Parse request data
    const requestData: SendNextStepsRequest = await req.json();
    const { 
      campaignId, 
      registrantIds, 
      emailFilter, 
      dryRun = false, 
      senderName = "RAADE Conference",
      senderEmail = "conference@raadeconf.com"
    } = requestData;
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey) {
      console.error(`[${requestId}] Missing environment variables`);
      return createResponse({
        success: false,
        message: "Server configuration error: Missing required environment variables",
        requestId
      }, 500);
    }
    
    // Initialize the Supabase and Resend clients
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      { auth: { persistSession: false } }
    );
    
    const resend = new Resend(resendApiKey);
    
    // Build query to get registrants
    let query = supabaseAdmin.from('unified_registrants').select('*');
    
    // Apply filters
    if (registrantIds && registrantIds.length > 0) {
      // Filter by specific registrant IDs
      query = query.in('id', registrantIds);
    } else if (emailFilter) {
      // Apply filter criteria
      if (emailFilter.registrantTypes && emailFilter.registrantTypes.length > 0) {
        query = query.in('registrant_type', emailFilter.registrantTypes);
      }
      
      if (emailFilter.status) {
        query = query.eq('status', emailFilter.status);
      }
      
      if (emailFilter.ticketTypes && emailFilter.ticketTypes.length > 0) {
        query = query.in('ticket_type', emailFilter.ticketTypes);
      }
    }
    
    // Fetch the registrants
    const { data: registrants, error: registrantsError } = await query;
    
    if (registrantsError) {
      console.error(`[${requestId}] Error fetching registrants:`, registrantsError);
      return createResponse({
        success: false,
        message: `Error fetching registrants: ${registrantsError.message}`,
        requestId
      }, 500);
    }
    
    if (!registrants || registrants.length === 0) {
      console.log(`[${requestId}] No registrants found matching the criteria`);
      return createResponse({
        success: true,
        message: "No registrants found matching the criteria",
        count: 0,
        requestId
      });
    }
    
    console.log(`[${requestId}] Found ${registrants.length} registrants to email`);
    
    // If this is a dry run, just return the registrants that would receive emails
    if (dryRun) {
      return createResponse({
        success: true,
        message: "Dry run completed successfully",
        count: registrants.length,
        registrants: registrants.map(r => ({ id: r.id, email: r.email, name: r.full_name, type: r.registrant_type })),
        requestId
      });
    }
    
    // Get or create an email campaign record
    let campaignRecord;
    
    if (campaignId) {
      // Use existing campaign if provided
      const { data: existingCampaign, error: campaignError } = await supabaseAdmin
        .from('email_campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();
        
      if (campaignError) {
        console.error(`[${requestId}] Error fetching campaign:`, campaignError);
        return createResponse({
          success: false,
          message: `Error fetching campaign: ${campaignError.message}`,
          requestId
        }, 500);
      }
      
      campaignRecord = existingCampaign;
    } else {
      // Create a new campaign
      const { data: newCampaign, error: createError } = await supabaseAdmin
        .from('email_campaigns')
        .insert({
          name: `Next Steps Email - ${new Date().toISOString().split('T')[0]}`,
          description: "Automated Next Steps email for conference registrants",
          template_name: "conference-next-steps",
          status: "sending",
          target_audience: emailFilter?.registrantTypes || ["individual", "group-leader", "group-member"],
          filters: emailFilter || null
        })
        .select()
        .single();
        
      if (createError) {
        console.error(`[${requestId}] Error creating campaign:`, createError);
        return createResponse({
          success: false,
          message: `Error creating campaign: ${createError.message}`,
          requestId
        }, 500);
      }
      
      campaignRecord = newCampaign;
    }
    
    // Send emails to each registrant
    const results = [];
    const errors = [];
    
    for (const registrant of registrants) {
      try {
        // Prepare email content
        const emailProps = {
          fullName: registrant.full_name,
          ticketType: registrant.ticket_type,
          conferenceDate: "April 11-12, 2025",
          venueAddress: "Rice University, Houston, TX",
          conferenceUrl: "https://raadeconf.com"
        };
        
        // Render the email template
        const emailHtml = render(React.createElement(NextStepsEmail, emailProps));
        
        // Send the email
        const emailResponse = await resend.emails.send({
          from: `${senderName} <${senderEmail}>`,
          to: registrant.email,
          subject: "Next Steps for Your RAADE Conference Registration",
          html: emailHtml,
        });
        
        console.log(`[${requestId}] Email sent to ${registrant.email}:`, emailResponse);
        
        // Record the email delivery
        const { error: recipientError } = await supabaseAdmin
          .from('email_campaign_recipients')
          .insert({
            campaign_id: campaignRecord.id,
            registrant_id: registrant.id,
            registrant_email: registrant.email,
            registrant_type: registrant.registrant_type,
            status: 'sent',
            metadata: {
              ticketType: registrant.ticket_type,
              emailProps,
              responseId: emailResponse.id
            }
          });
          
        if (recipientError) {
          console.error(`[${requestId}] Error recording email for ${registrant.email}:`, recipientError);
        }
        
        results.push({
          email: registrant.email,
          name: registrant.full_name,
          id: registrant.id,
          success: true,
          messageId: emailResponse.id
        });
      } catch (error) {
        console.error(`[${requestId}] Error sending email to ${registrant.email}:`, error);
        
        // Record the email error
        try {
          await supabaseAdmin
            .from('email_campaign_recipients')
            .insert({
              campaign_id: campaignRecord.id,
              registrant_id: registrant.id,
              registrant_email: registrant.email,
              registrant_type: registrant.registrant_type,
              status: 'error',
              error_message: error.message || String(error)
            });
        } catch (recordError) {
          console.error(`[${requestId}] Error recording failure for ${registrant.email}:`, recordError);
        }
        
        errors.push({
          email: registrant.email,
          name: registrant.full_name,
          id: registrant.id,
          success: false,
          error: error.message || String(error)
        });
      }
    }
    
    // Update campaign status to "sent"
    await supabaseAdmin
      .from('email_campaigns')
      .update({
        status: "sent",
        sent_at: new Date().toISOString()
      })
      .eq('id', campaignRecord.id);
      
    const totalSent = results.length;
    const totalErrors = errors.length;
    
    return createResponse({
      success: true,
      message: `Email sending completed. ${totalSent} emails sent successfully, ${totalErrors} errors.`,
      campaign: {
        id: campaignRecord.id,
        name: campaignRecord.name
      },
      results: {
        sent: totalSent,
        errors: totalErrors,
        details: {
          successful: results,
          failed: errors
        }
      },
      requestId
    });
    
  } catch (error) {
    console.error(`[${requestId}] Unhandled error:`, error);
    
    return createResponse({
      success: false,
      message: error.message || "An unexpected error occurred",
      requestId
    }, 500);
  }
});
