
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";
import { Resend } from "npm:resend@2.0.0";
import React from "npm:react@18.3.1";
import { render } from "npm:@react-email/render@0.0.7";
import { ConferenceNextStepsEmail } from "../_shared/email-templates/conference-next-steps-email.tsx";

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

/**
 * Send Next Steps Campaign Edge Function
 * 
 * Sends personalized next steps emails to conference registrants with:
 * - RAADE branding
 * - Conference details and schedule
 * - Interactive workshop information
 * - Maps and location details
 * - Personalized greeting
 * 
 * Features:
 * - Batch processing to handle large recipient lists
 * - Comprehensive error handling
 * - Email tracking in the database
 * - Detailed logs for troubleshooting
 */
serve(async (req) => {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  console.log(`[${requestId}] Processing next steps campaign request`);
  
  try {
    // Parse request payload
    const {
      batchSize = 50,
      dryRun = false,
      filters = {},
      campaignName = `Next Steps - ${new Date().toISOString().split('T')[0]}`,
      testEmails = [], // For testing specific emails
      senderName = "Ife Idakolo, RAADE",
      senderEmail = "conference@raadeconf.com",
      replyTo = "raade@rice.edu",
      mapLink = "https://goo.gl/maps/RAADE", // Default map link
      conferenceLink = "https://rice-raade.com" // Default conference link
    } = await req.json();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey) {
      console.error(`[${requestId}] Missing required environment variables`);
      return createResponse({
        success: false,
        error: "Server configuration error: Missing required environment variables",
        requestId
      }, 500);
    }
    
    // Initialize Supabase client with service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Initialize Resend client
    const resend = new Resend(resendApiKey);
    
    // Create a campaign record
    const { data: campaign, error: campaignError } = await supabase
      .from('email_campaigns')
      .insert({
        name: campaignName,
        description: "Conference next steps email with detailed information",
        template_name: "conference-next-steps",
        status: "preparing",
        filters: filters,
        target_audience: ["individual", "group-leader", "group-member"]
      })
      .select('id')
      .single();
      
    if (campaignError) {
      console.error(`[${requestId}] Error creating campaign:`, campaignError);
      return createResponse({ 
        success: false, 
        error: `Failed to create campaign: ${campaignError.message}`,
        requestId
      }, 500);
    }
    
    const campaignId = campaign.id;
    console.log(`[${requestId}] Created campaign with ID: ${campaignId}`);
    
    // Query the unified_registrants view
    let query = supabase.from('unified_registrants').select('*');
    
    // Apply filters if provided
    if (testEmails && testEmails.length > 0) {
      // If specific test emails provided, use those
      query = query.in('email', testEmails);
    } else {
      // Apply any other filters
      if (filters.registrantTypes && filters.registrantTypes.length > 0) {
        query = query.in('registrant_type', filters.registrantTypes);
      }
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.ticketTypes && filters.ticketTypes.length > 0) {
        query = query.in('ticket_type', filters.ticketTypes);
      }
      
      if (filters.excludeEmails && filters.excludeEmails.length > 0) {
        query = query.not('email', 'in', filters.excludeEmails);
      }
    }
    
    // Fetch registrants
    const { data: registrants, error: registrantsError } = await query;
    
    if (registrantsError) {
      console.error(`[${requestId}] Error fetching registrants:`, registrantsError);
      await supabase
        .from('email_campaigns')
        .update({ 
          status: "error", 
          description: `Error fetching registrants: ${registrantsError.message}`
        })
        .eq('id', campaignId);
        
      return createResponse({ 
        success: false, 
        error: `Error fetching registrants: ${registrantsError.message}`,
        requestId
      }, 500);
    }
    
    if (!registrants || registrants.length === 0) {
      console.log(`[${requestId}] No matching registrants found`);
      await supabase
        .from('email_campaigns')
        .update({ 
          status: "completed", 
          description: "No matching registrants found",
          sent_at: new Date().toISOString()
        })
        .eq('id', campaignId);
        
      return createResponse({
        success: true,
        message: "No matching registrants found",
        campaignId,
        count: 0,
        requestId
      });
    }
    
    console.log(`[${requestId}] Found ${registrants.length} registrants to email`);
    
    // Update campaign with recipient count
    await supabase
      .from('email_campaigns')
      .update({ 
        status: dryRun ? "dry_run" : "sending",
        description: `${registrants.length} registrants targeted`
      })
      .eq('id', campaignId);
    
    // If dry run, just return the list of recipients
    if (dryRun) {
      return createResponse({
        success: true,
        message: "Dry run completed",
        campaignId,
        recipients: registrants.map(r => ({
          id: r.id,
          email: r.email,
          name: r.full_name,
          firstName: r.full_name?.split(' ')[0] || '',
          type: r.registrant_type
        })),
        count: registrants.length,
        requestId
      });
    }
    
    // Process registrants in batches to avoid timeouts
    const totalRegistrants = registrants.length;
    const batches = Math.ceil(totalRegistrants / batchSize);
    
    console.log(`[${requestId}] Processing ${totalRegistrants} registrants in ${batches} batches of ${batchSize}`);
    
    const results = {
      successful: [] as any[],
      failed: [] as any[],
      skipped: [] as any[]
    };
    
    // Process emails in batches
    for (let batchIndex = 0; batchIndex < batches; batchIndex++) {
      const start = batchIndex * batchSize;
      const end = Math.min(start + batchSize, totalRegistrants);
      const batchRegistrants = registrants.slice(start, end);
      
      console.log(`[${requestId}] Processing batch ${batchIndex + 1}/${batches} with ${batchRegistrants.length} registrants`);
      
      // Update campaign status with progress
      await supabase
        .from('email_campaigns')
        .update({ 
          description: `Sending batch ${batchIndex + 1}/${batches}`
        })
        .eq('id', campaignId);
      
      // Process each registrant in the batch
      for (const registrant of batchRegistrants) {
        try {
          const firstName = registrant.full_name?.split(' ')[0] || '';
          
          // Generate the personalized email content
          const emailProps = {
            firstName,
            fullName: registrant.full_name || '',
            conferenceLink,
            mapLink
          };
          
          // Render the email using React Email
          const emailHtml = render(React.createElement(ConferenceNextStepsEmail, emailProps));
          
          // Create subject line with personalization
          const subject = `${firstName}, We're Excited to Welcome You to RAADE at Rice!`;
          
          // Send the email using Resend
          const { data: emailData, error: emailError } = await resend.emails.send({
            from: `${senderName} <${senderEmail}>`,
            reply_to: replyTo,
            to: registrant.email,
            subject: subject,
            html: emailHtml,
            tags: [
              { name: 'campaign_id', value: campaignId },
              { name: 'registrant_id', value: registrant.id },
              { name: 'registrant_type', value: registrant.registrant_type || 'unknown' }
            ]
          });
          
          if (emailError) {
            console.error(`[${requestId}] Error sending email to ${registrant.email}:`, emailError);
            
            // Record the failure
            await supabase
              .from('email_campaign_recipients')
              .insert({
                campaign_id: campaignId,
                registrant_id: registrant.id,
                registrant_email: registrant.email,
                registrant_type: registrant.registrant_type || 'unknown',
                status: 'error',
                error_message: emailError.message || JSON.stringify(emailError),
                metadata: {
                  firstName,
                  ticketType: registrant.ticket_type,
                  error: emailError
                }
              });
              
            results.failed.push({
              id: registrant.id,
              email: registrant.email,
              name: registrant.full_name,
              error: emailError.message || JSON.stringify(emailError)
            });
          } else {
            console.log(`[${requestId}] Email sent successfully to ${registrant.email}`);
            
            // Record the successful send
            await supabase
              .from('email_campaign_recipients')
              .insert({
                campaign_id: campaignId,
                registrant_id: registrant.id,
                registrant_email: registrant.email,
                registrant_type: registrant.registrant_type || 'unknown',
                status: 'sent',
                metadata: {
                  firstName,
                  ticketType: registrant.ticket_type,
                  emailId: emailData?.id
                }
              });
              
            results.successful.push({
              id: registrant.id,
              email: registrant.email,
              name: registrant.full_name,
              messageId: emailData?.id
            });
          }
          
          // Add a small delay between emails to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.error(`[${requestId}] Unexpected error sending to ${registrant.email}:`, error);
          
          // Record the error
          try {
            await supabase
              .from('email_campaign_recipients')
              .insert({
                campaign_id: campaignId,
                registrant_id: registrant.id,
                registrant_email: registrant.email,
                registrant_type: registrant.registrant_type || 'unknown',
                status: 'error',
                error_message: error instanceof Error ? error.message : String(error)
              });
          } catch (dbError) {
            console.error(`[${requestId}] Error recording failure:`, dbError);
          }
          
          results.failed.push({
            id: registrant.id,
            email: registrant.email,
            name: registrant.full_name,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
      
      console.log(`[${requestId}] Completed batch ${batchIndex + 1}/${batches}`);
    }
    
    // Update campaign status to completed
    await supabase
      .from('email_campaigns')
      .update({ 
        status: "completed", 
        sent_at: new Date().toISOString(),
        description: `Sent to ${results.successful.length} recipients. ${results.failed.length} failures.`
      })
      .eq('id', campaignId);
    
    const processingTime = Date.now() - startTime;
    
    // Return campaign summary
    return createResponse({
      success: true,
      message: "Campaign completed",
      campaignId,
      results: {
        total: totalRegistrants,
        sent: results.successful.length,
        failed: results.failed.length,
        skipped: results.skipped.length,
        processingTime: `${processingTime}ms`
      },
      // Include detailed results for smaller campaigns or if explicitly requested
      details: totalRegistrants <= 100 ? {
        successful: results.successful,
        failed: results.failed,
        skipped: results.skipped
      } : undefined,
      requestId
    });
    
  } catch (error) {
    console.error(`[${requestId}] Unhandled error:`, error);
    
    return createResponse({
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
      details: error instanceof Error ? { stack: error.stack } : undefined,
      requestId
    }, 500);
  }
});
