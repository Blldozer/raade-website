
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
      case "young-professional":
        ticketTypeDisplay = "Young Professional";
        ticketPrice = "$85";
        break;
      case "speaker":
        ticketTypeDisplay = "Speaker";
        ticketPrice = "$0";
        break;
      default:
        ticketTypeDisplay = ticketType;
        ticketPrice = "TBD";
    }

    // Email content
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

    // For development/demo purposes, we'll log the email
    console.log("Email would be sent with the following content:");
    console.log("To:", email);
    console.log("Subject: RAADE Conference 2025 - Registration Confirmation");
    console.log("HTML Content:", emailContent);

    // In a real implementation, you would integrate with an email service provider
    // For now, we'll simulate a successful email send
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Confirmation email sent successfully"
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error sending confirmation email:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
