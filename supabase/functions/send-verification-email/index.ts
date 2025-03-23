import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "npm:resend@4.0.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const resendApiKey = Deno.env.get("RESEND_API_KEY");

if (!resendApiKey) {
  console.error("Missing RESEND_API_KEY environment variable");
  throw new Error("RESEND_API_KEY environment variable is required");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerificationRequest {
  email: string;
  fullName: string;
  ticketType: string;
  isKnownInstitution: boolean;
}

function generateToken(length = 6) {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

function isRiceEmail(email: string): boolean {
  return email.toLowerCase().endsWith("@rice.edu");
}

function isEduEmail(email: string): boolean {
  return email.toLowerCase().endsWith(".edu");
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName, ticketType, isKnownInstitution } = await req.json() as VerificationRequest;
    
    if (!email || !ticketType) {
      return new Response(
        JSON.stringify({ error: "Email and ticket type are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Processing verification request for ${email} (${ticketType})`);

    // Generate verification token
    const token = generateToken();
    
    // Set expiration time (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Store the verification token in the database
    const { error: tokenError } = await supabase
      .from('email_verifications')
      .upsert({
        email,
        token,
        ticket_type: ticketType,
        verified: false,
        expires_at: expiresAt.toISOString(),
        from_known_institution: isKnownInstitution
      }, {
        onConflict: 'email,ticket_type'
      });

    if (tokenError) {
      console.error("Database error storing token:", tokenError);
      throw tokenError;
    }
    
    // Email HTML content
    const emailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #274675; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; border: 1px solid #ddd; border-top: none; }
            .verification-code { font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; letter-spacing: 2px; background-color: #f7f7f7; padding: 10px; border-radius: 5px; }
            .footer { font-size: 12px; color: #666; margin-top: 20px; text-align: center; }
            .instructions { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              <p>Thank you for registering for the RAADE Annual Conference 2025! Please verify your email address to complete your registration.</p>
              <div class="instructions">
                <p>Your verification code is:</p>
                <div class="verification-code">${token}</div>
                <p>Please enter this code on the verification page to confirm your email address.</p>
              </div>
              <p>This code will expire in 24 hours.</p>
              <p>If you have any issues, please contact us at conference@raade.org for assistance.</p>
              <p>Best regards,<br>The RAADE Conference Team</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 RAADE - Rice Association for African Development</p>
              <p>This is an automated message from the conference registration system.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version of the email
    const plainTextContent = `
Email Verification - RAADE Conference 2025

Dear ${fullName},

Thank you for registering for the RAADE Annual Conference 2025! Please verify your email address to complete your registration.

Your verification code is: ${token}

Please enter this code on the verification page to confirm your email address.

This code will expire in 24 hours.

If you have any issues, please contact us at conference@raade.org for assistance.

Best regards,
The RAADE Conference Team

&copy; 2024 RAADE - Rice Association for African Development
This is an automated message from the conference registration system.
    `;

    // Determine the best sender email to use
    // For Rice emails, use Rice-related sender if possible
    // For others, use the Resend default domain which has better deliverability
    const senderEmail = isRiceEmail(email) 
      ? "RAADE Conference <ife@rice-raade.com>"
      : "RAADE Conference <conference@resend.dev>";

    console.log(`Sending verification email to ${email} with token ${token} using sender: ${senderEmail}`);

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: senderEmail,
        to: [email],
        subject: "RAADE Conference 2025 - Email Verification",
        html: emailContent,
        text: plainTextContent,
        // Add reply-to for responses
        reply_to: "conference@raade.org"
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw new Error(`Failed to send email: ${JSON.stringify(error)}`);
      }

      console.log("Email sent successfully:", data);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Re-throw with more detailed information
      throw new Error(`Email sending failed: ${JSON.stringify(emailError)}`);
    }

    // Success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Verification email sent successfully",
        senderUsed: senderEmail,
        debug: {
          email: email,
          domain: email.split('@')[1],
          isRice: isRiceEmail(email),
          isEdu: isEduEmail(email),
          tokenCreated: true
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error in send-verification-email function:", error);
    
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
