
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { format } from "npm:date-fns@2.30.0";

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
 * Sends personalized email confirmations for conference registrations by:
 * - Using improved error handling with detailed logging
 * - Supporting multiple email templates based on ticket type
 * - Implementing request timeouts for better reliability
 * - Tracking delivery attempts in request data
 * - Enhanced logging for troubleshooting
 * - Gracefully handling edge cases
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

    // Enhanced receipt section for group registrations
    let receiptSection = `
      <p><strong>Registration Date:</strong> ${registrationDate}</p>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Ticket Type:</strong> ${ticketTypeDisplay}</p>
      <p><strong>Price:</strong> ${ticketPrice}</p>
    `;
    
    if (ticketType === "student-group" && groupSize) {
      receiptSection += `
        <p><strong>Group Size:</strong> ${groupSize} people</p>
        <p><strong>Total Amount Paid:</strong> ${totalPrice}</p>
      `;
    } else {
      receiptSection += `
        <p><strong>Total Amount Paid:</strong> ${totalPrice}</p>
      `;
    }
    
    // Add coupon information if applicable
    if (couponCode) {
      receiptSection += `
        <p><strong>Coupon Applied:</strong> ${couponCode}</p>
      `;
    }

    // HTML email content with improved design
    const emailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background-color: #274675; color: white; padding: 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 20px; background-color: #ffffff; }
            .receipt { background-color: #f7f7f7; padding: 20px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #274675; }
            .footer { font-size: 12px; color: #666; margin-top: 20px; text-align: center; padding: 20px; background-color: #f9f9f9; }
            .highlight { color: #FBB03B; font-weight: bold; }
            .cta-button { background-color: #FBB03B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0; }
            .event-details { background-color: #FAFAFA; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .divider { border-top: 1px solid #eee; margin: 20px 0; }
            .logo { max-width: 150px; margin: 0 auto; display: block; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your RAADE Conference Registration is Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              <p>Thank you for registering for the <strong>RAADE Annual Conference 2025</strong>! Your registration has been successfully processed and confirmed.</p>
              
              <h2>Receipt</h2>
              <div class="receipt">
                ${receiptSection}
                <p><em>Reference: RAADE-CONF-2025-${requestId.substring(0, 8)}</em></p>
              </div>
              
              <div class="event-details">
                <h2>Event Details</h2>
                <p><strong>Dates:</strong> ${formattedEventDates}</p>
                <p><strong>Location:</strong> Rice University, Houston, TX</p>
                <p><strong>Check-in:</strong> Begins at 8:00 AM on April 11th</p>
              </div>
              
              <div class="divider"></div>
              
              <h2>What's Next?</h2>
              <p>Please mark your calendar for this exciting event. You'll receive the following information closer to the event date:</p>
              <ul>
                <li>Detailed venue information and campus map</li>
                <li>Complete conference schedule</li>
                <li>Speaker announcements</li>
                <li>Networking opportunities</li>
              </ul>
              
              <p>If you have any questions or need to make changes to your registration, please contact us at <a href="mailto:conference@raade.org">conference@raade.org</a></p>
              
              <p>We look forward to seeing you at the conference!</p>
              <p>Best regards,<br>The RAADE Conference Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>&copy; 2024 RAADE - Rice Association for African Development</p>
              <p><small>Sent at: ${new Date().toISOString()}</small></p>
            </div>
          </div>
        </body>
      </html>
    `;

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
Reference: RAADE-CONF-2025-${requestId.substring(0, 8)}

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

    // Determine the best sender email to use
    const senderEmail = isRiceEmail(email) 
      ? "RAADE Conference <ife@rice-raade.com>"
      : "RAADE Conference <conference@resend.dev>";

    console.log(`[${requestId}] Using sender email: ${senderEmail} for recipient: ${email}`);

    // Create a timeout for the email sending operation
    const EMAIL_SEND_TIMEOUT = 15000; // 15 seconds
    
    let emailSendingComplete = false;
    
    // Send email using Resend with timeout handling
    try {
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
        html: emailContent,
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
