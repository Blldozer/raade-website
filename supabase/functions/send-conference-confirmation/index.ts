import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY") || "re_Nn1yMwZ5_BH6KaYzBaD3cKroP3rxRpUjx";
const resend = new Resend(resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function isRiceEmail(email: string): boolean {
  return email.toLowerCase().endsWith("@rice.edu");
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { fullName, email, ticketType } = await req.json();

    if (!fullName || !email || !ticketType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Sending confirmation email to ${email} for ${fullName}`);

    // Get ticket type display name
    let ticketTypeDisplay;
    let ticketPrice;
    
    switch (ticketType) {
      case "rice-student":
        ticketTypeDisplay = "Rice Student";
        ticketPrice = "$50";
        break;
      case "non-rice-student":
        ticketTypeDisplay = "Non-Rice Student";
        ticketPrice = "$65";
        break;
      case "professional":
        ticketTypeDisplay = "Professional";
        ticketPrice = "$85";
        break;
      case "speaker":
        ticketTypeDisplay = "Speaker";
        ticketPrice = "$0";
        break;
      case "student-group":
        ticketTypeDisplay = "Student Group";
        ticketPrice = "$50/person";
        break;
      default:
        ticketTypeDisplay = ticketType;
        ticketPrice = "TBD";
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
            .footer { font-size: 12px; color: #666; margin-top: 20px; text-align: center; }
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
              <h2>Registration Details</h2>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Ticket Type:</strong> ${ticketTypeDisplay} (${ticketPrice})</p>
              <p>Additional information, including venue details and conference schedule, will be sent closer to the event date.</p>
              <p>If you have any questions or need to make changes to your registration, please contact us at conference@raade.org</p>
              <p>We look forward to seeing you at the conference!</p>
              <p>Best regards,<br>The RAADE Conference Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>© 2024 RAADE - Rice Association for African Development</p>
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

Registration Details:
Name: ${fullName}
Email: ${email}
Ticket Type: ${ticketTypeDisplay} (${ticketPrice})

Additional information, including venue details and conference schedule, will be sent closer to the event date.

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
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      throw emailError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Confirmation email sent successfully",
        senderUsed: senderEmail,
        debug: {
          email: email,
          domain: email.split('@')[1],
          isRice: isRiceEmail(email)
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
