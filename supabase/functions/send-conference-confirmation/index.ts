
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { format } from "npm:date-fns@2.30.0";
import { renderAsync } from "npm:@react-email/render@0.0.7";
import { ConfirmationEmail } from "../_shared/email-templates/confirmation-email.tsx";
import * as React from "npm:react@18.2.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

if (!resendApiKey) {
  console.error("Missing RESEND_API_KEY environment variable");
  throw new Error("RESEND_API_KEY environment variable is required");
}

const resend = new Resend(resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function isRiceEmail(email: string): boolean {
  return email.toLowerCase().endsWith("@rice.edu");
}

/**
 * Formats a simple date string
 */
function formatDate(date: Date): string {
  return format(date, "MMMM d, yyyy");
}

/**
 * Send Conference Confirmation Email Edge Function
 * 
 * Sends personalized email confirmations for conference registrations using React Email:
 * - Using React Email templates for better maintainability
 * - Using improved error handling with detailed logging
 * - Supporting responsive, well-designed email templates 
 * - Implementing request timeouts for better reliability
 * - Tracking delivery attempts in request data
 * - Enhanced logging for troubleshooting
 */
serve(async (req) => {
  // Create a unique request ID for tracking this specific email
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  
  // Log the start of processing
  console.log(`[${requestId}] Starting email confirmation processing`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body with timeout handling
    let requestBody;
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request body parsing timed out"));
        }, 5000);
      });
      
      // Race between body parsing and timeout
      const bodyText = await Promise.race([req.text(), timeoutPromise]);
      requestBody = JSON.parse(bodyText);
    } catch (parseError) {
      console.error(`[${requestId}] Error parsing request:`, parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request data",
          details: parseError.message,
          requestId 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Extract request data
    const { fullName, email, ticketType, groupSize, couponCode, retryAttempt = 0 } = requestBody;

    if (!fullName || !email || !ticketType) {
      console.error(`[${requestId}] Missing required fields`, requestBody);
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields", 
          requestId,
          received: { fullName, email, ticketType }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`[${requestId}] Sending confirmation email to ${email} for ${fullName} with ticket type ${ticketType}${groupSize ? ` (group size: ${groupSize})` : ''}`);

    // Get ticket type display name and price using consistent pricing logic
    let ticketTypeDisplay;
    let ticketPrice;
    let totalPrice;
    
    switch (ticketType) {
      case "student":
        ticketTypeDisplay = "Student";
        ticketPrice = "$35";
        totalPrice = "$35";
        break;
      case "professional":
        ticketTypeDisplay = "Professional";
        ticketPrice = "$60";
        totalPrice = "$60";
        break;
      case "student-group":
        ticketTypeDisplay = "Student Group";
        // Calculate with minimum group size of 5
        const finalGroupSize = Math.max(groupSize || 5, 5);
        ticketPrice = "$30/person";
        totalPrice = `$${30 * finalGroupSize} ($30/person × ${finalGroupSize})`;
        break;
      default:
        ticketTypeDisplay = ticketType;
        ticketPrice = "TBD";
        totalPrice = "TBD";
    }

    // Format event dates
    const eventStartDate = new Date("2025-04-11");
    const eventEndDate = new Date("2025-04-12");
    
    const formattedEventDates = `${formatDate(eventStartDate)} - ${formatDate(eventEndDate)}`;
    const registrationDate = formatDate(new Date());

    // Use a shortened version of the request ID as the reference number
    const referenceId = requestId.substring(0, 8);

    // Determine the best sender email to use
    const senderEmail = isRiceEmail(email) 
      ? "RAADE Conference <ife@rice-raade.com>"
      : "RAADE Conference <conference@resend.dev>";

    console.log(`[${requestId}] Using sender email: ${senderEmail} for recipient: ${email}`);

    // Create a timeout for the email sending operation
    const EMAIL_SEND_TIMEOUT = 15000; // 15 seconds
    
    let emailSendingComplete = false;
    
    try {
      // Render the React Email template
      const emailHtml = await renderAsync(
        React.createElement(ConfirmationEmail, {
          fullName,
          email,
          ticketType,
          ticketPrice,
          totalPrice,
          groupSize: ticketType === "student-group" ? (groupSize || 5) : undefined,
          couponCode,
          eventDates: formattedEventDates,
          registrationDate,
          referenceId,
        })
      );

      // Plain text version of the email
      const plainTextContent = `
Conference Registration Confirmation - RAADE Annual Conference 2025

Dear ${fullName},

Thank you for registering for the RAADE Annual Conference 2025!

We're excited to have you join us on April 11-12, 2025 for two days of inspiring discussions, networking, and innovation in African development.

RECEIPT:
Registration Date: ${registrationDate}
Name: ${fullName}
Email: ${email}
Ticket Type: ${ticketTypeDisplay} (${ticketPrice})
${ticketType === "student-group" && groupSize ? `Group Size: ${groupSize} people\nTotal Amount Paid: ${totalPrice}` : `Total Amount Paid: ${totalPrice}`}
${couponCode ? `Coupon Applied: ${couponCode}` : ''}
Reference: RAADE-CONF-2025-${referenceId}

EVENT DETAILS:
Dates: ${formattedEventDates}
Location: Rice University, Houston, TX
Check-in: Begins at 8:00 AM on April 11th

WHAT'S NEXT?
Please mark your calendar for this exciting event. You'll receive the following information closer to the event date:
- Detailed venue information and campus map
- Complete conference schedule
- Speaker announcements
- Networking opportunities

If you have any questions or need to make changes to your registration, please contact us at conference@raade.org

We look forward to seeing you at the conference!

Best regards,
The RAADE Conference Team

This is an automated message. Please do not reply to this email.
© 2024 RAADE - Rice Association for African Development
      `;

      // Send email using Resend with timeout handling
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          if (!emailSendingComplete) {
            reject(new Error(`Email sending timed out after ${EMAIL_SEND_TIMEOUT}ms`));
          }
        }, EMAIL_SEND_TIMEOUT);
      });
      
      const sendPromise = resend.emails.send({
        from: senderEmail,
        to: [email],
        subject: "RAADE Conference 2025 - Registration Confirmation",
        html: emailHtml,
        text: plainTextContent,
        // Add reply-to for responses
        reply_to: "conference@raade.org",
        // Add custom headers for tracking
        headers: {
          "X-Request-ID": requestId,
          "X-Attempt": String(retryAttempt)
        }
      });
      
      // Race between sending and timeout
      const result = await Promise.race([sendPromise, timeoutPromise]) as any;
      emailSendingComplete = true;
      
      if (result.error) {
        console.error(`[${requestId}] Resend API Error:`, result.error);
        throw new Error(`Failed to send email: ${result.error.message}`);
      }

      console.log(`[${requestId}] Confirmation email sent successfully:`, result.data);
      
      const processingTime = Date.now() - startTime;
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Confirmation email sent successfully",
          senderUsed: senderEmail,
          ticketDetails: {
            type: ticketTypeDisplay,
            price: ticketPrice,
            totalAmount: totalPrice,
            groupSize: ticketType === "student-group" ? groupSize : null
          },
          processingTime,
          requestId
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } catch (emailError) {
      console.error(`[${requestId}] Error sending confirmation email:`, emailError);
      
      return new Response(
        JSON.stringify({ 
          error: emailError.message,
          requestId,
          details: {
            stack: emailError.stack,
            cause: emailError.cause,
            processingTime: Date.now() - startTime
          }
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error(`[${requestId}] Unhandled error sending confirmation email:`, error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        requestId,
        details: {
          stack: error.stack,
          cause: error.cause,
          processingTime: Date.now() - startTime
        }
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
