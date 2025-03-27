
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

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
 * Send Conference Confirmation Email Edge Function
 * 
 * Sends personalized email confirmations for conference registrations by:
 * - Customizing email content based on ticket type
 * - Handling group registration information
 * - Using domain-specific sender addresses to improve deliverability
 * - Providing comprehensive receipt information to attendees
 * 
 * Handles CORS and tracks email delivery status
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { fullName, email, ticketType, groupSize } = await req.json();

    if (!fullName || !email || !ticketType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Sending confirmation email to ${email} for ${fullName} with ticket type ${ticketType}${groupSize ? ` (group size: ${groupSize})` : ''}`);

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

    // Enhanced receipt section for group registrations
    let receiptSection = `
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

    // HTML email content
    const emailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #274675; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; border: 1px solid #ddd; border-top: none; }
            .receipt { background-color: #f7f7f7; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .footer { font-size: 12px; color: #666; margin-top: 20px; text-align: center; }
            .highlight { color: #FBB03B; font-weight: bold; }
            .cta-button { background-color: #FBB03B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Conference Registration Confirmation</h1>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              <p>Thank you for registering for the RAADE Annual Conference 2025!</p>
              <p>We're excited to have you join us on <strong>April 11-12, 2025</strong> for two days of inspiring discussions, networking, and innovation in African development.</p>
              
              <h2>Receipt</h2>
              <div class="receipt">
                ${receiptSection}
              </div>
              
              <h2>Event Details</h2>
              <p><strong>Dates:</strong> April 11-12, 2025</p>
              <p><strong>Location:</strong> Rice University, Houston, TX</p>
              <p><strong>Check-in:</strong> Begins at 8:00 AM on April 11th</p>
              
              <p>Additional information, including venue details and conference schedule, will be sent closer to the event date.</p>
              
              <p>If you have any questions or need to make changes to your registration, please contact us at <a href="mailto:conference@raade.org">conference@raade.org</a></p>
              
              <p>We look forward to seeing you at the conference!</p>
              <p>Best regards,<br>The RAADE Conference Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>&copy; 2024 RAADE - Rice Association for African Development</p>
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

Receipt:
Name: ${fullName}
Email: ${email}
Ticket Type: ${ticketTypeDisplay} (${ticketPrice})
${ticketType === "student-group" && groupSize ? `Group Size: ${groupSize} people\nTotal Amount Paid: ${totalPrice}` : `Total Amount Paid: ${totalPrice}`}

Event Details:
Dates: April 11-12, 2025
Location: Rice University, Houston, TX
Check-in: Begins at 8:00 AM on April 11th

Additional information, including venue details and conference schedule, will be sent closer to the event date.

If you have any questions or need to make changes to your registration, please contact us at conference@raade.org

We look forward to seeing you at the conference!

Best regards,
The RAADE Conference Team

This is an automated message. Please do not reply to this email.
&copy; 2024 RAADE - Rice Association for African Development
    `;

    // Determine the best sender email to use
    const senderEmail = isRiceEmail(email) 
      ? "RAADE Conference <ife@rice-raade.com>"
      : "RAADE Conference <conference@resend.dev>";

    console.log(`Using sender email: ${senderEmail} for recipient: ${email}`);

    // Send email using Resend with the appropriate sender address
    try {
      const { data, error } = await resend.emails.send({
        from: senderEmail,
        to: [email],
        subject: "RAADE Conference 2025 - Registration Confirmation",
        html: emailContent,
        text: plainTextContent,
        // Add reply-to for responses
        reply_to: "conference@raade.org"
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw new Error(`Failed to send email: ${error.message}`);
      }

      console.log("Confirmation email sent successfully:", data);
      
      // Store confirmation in database (if we wanted to track this)
      // This would be added in a future iteration
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      throw emailError;
    }

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
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error sending confirmation email:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        cause: error.cause
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
