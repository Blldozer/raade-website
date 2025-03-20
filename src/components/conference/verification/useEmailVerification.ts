
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * Custom hook to handle email verification logic
 * 
 * Handles sending verification emails and verifying codes
 * Separates business logic from UI for better testability
 * 
 * @param email - User's email address
 * @param fullName - User's full name
 * @param ticketType - Selected ticket type
 * @param emailSent - Whether verification email was already sent
 * @param onVerificationSuccess - Callback for successful verification
 * @param onVerificationError - Callback for verification errors
 */
export const useEmailVerification = (
  email: string,
  fullName: string,
  ticketType: string,
  emailSent: boolean,
  onVerificationSuccess: () => void,
  onVerificationError: (error: string) => void
) => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [sendingAttempts, setSendingAttempts] = useState<number>(0);
  const [sendingError, setSendingError] = useState<string | null>(null);
  const { toast } = useToast();

  // Handle initial email sending
  useEffect(() => {
    const sendVerificationEmail = async () => {
      if (!emailSent) {
        await handleSendVerificationEmail();
      }
    };

    sendVerificationEmail();
  }, [email, fullName, ticketType, emailSent]);

  // Send verification email
  const handleSendVerificationEmail = async () => {
    setIsSendingEmail(true);
    setSendingError(null);
    
    try {
      console.log("Sending verification email to:", email);
      const { data, error } = await supabase.functions.invoke("send-verification-email", {
        body: {
          email,
          fullName,
          ticketType,
          isKnownInstitution: false
        },
      });

      if (error) {
        console.error("Error from send-verification-email function:", error);
        throw error;
      }

      if (data.error) {
        console.error("Error in response from send-verification-email:", data.error);
        throw new Error(data.error);
      }

      setSendingAttempts(prev => prev + 1);
      toast({
        title: "Verification code sent",
        description: "A verification code has been sent to your email. Please check your inbox and spam folder.",
      });
    } catch (error) {
      console.error("Error in sending verification email:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setSendingError(errorMessage);
      toast({
        title: "Failed to send verification code",
        description: errorMessage,
        variant: "destructive",
      });
      onVerificationError(errorMessage);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Verify email with code
  const handleVerifyEmail = async () => {
    if (!verificationCode) {
      toast({
        title: "Verification code required",
        description: "Please enter the verification code sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Verifying email with code:", verificationCode);
      const { data, error } = await supabase.functions.invoke("verify-email-token", {
        body: {
          email,
          token: verificationCode,
          ticketType
        },
      });

      if (error) {
        console.error("Error from verify-email-token function:", error);
        throw error;
      }

      if (data.success) {
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        });
        onVerificationSuccess();
      } else {
        throw new Error(data.error || "Failed to verify email");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Verification failed",
        description: errorMessage,
        variant: "destructive",
      });
      onVerificationError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    verificationCode,
    setVerificationCode,
    isSubmitting,
    isSendingEmail,
    sendingAttempts,
    sendingError,
    handleVerifyEmail,
    handleSendVerificationEmail
  };
};
