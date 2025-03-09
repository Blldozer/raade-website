
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "npm:resend@1.0.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";

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
      throw tokenError;
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
            .verification-code { font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; letter-spacing: 2px; }
            .footer { font-size: 12px; color: #666; margin-top: 20px; text-align: center; }
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
              <p>Your verification code is:</p>
              <div class="verification-code">${token}</div>
              <p>Please enter this code on the verification page to confirm your email address.</p>
              <p>This code will expire in 24 hours.</p>
              <p>If you didn't register for the RAADE Conference, please ignore this email.</p>
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

    console.log(`Sending verification email to ${email} for ${fullName} with token ${token}`);

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: "RAADE Conference <onboarding@resend.dev>",
        to: [email],
        subject: "RAADE Conference 2025 - Email Verification",
        html: emailContent,
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw new Error(`Failed to send email: ${error.message}`);
      }

      console.log("Email sent successfully:", data);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      throw emailError;
    }

    // Success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Verification email sent successfully"
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error sending verification email:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
