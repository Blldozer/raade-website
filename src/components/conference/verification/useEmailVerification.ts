
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EmailService } from "../payment/services/emailService";

interface VerificationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Custom hook for email verification workflow
 * 
 * Manages the email verification process for a conference registration:
 * - Handles sending verification codes to user email
 * - Tracks verification code input and validation
 * - Includes robust error handling and retry logic
 * - Uses the EmailService for reliable email delivery
 * - Provides detailed state for UI feedback
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
  const [sendingAttempts, setSendingAttempts] = useState<number>(emailSent ? 1 : 0);
  const [sendingError, setSendingError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Track if the component is mounted
  const isMountedRef = useRef<boolean>(true);
  
  // Determine if the email is from a known institution
  const isEducationalEmail = email.toLowerCase().endsWith('.edu');

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Send verification email to user
   */
  const handleSendVerificationEmail = async () => {
    if (isSendingEmail || !email) return;
    
    try {
      setIsSendingEmail(true);
      setSendingError(null);
      
      console.log(`Sending verification email to ${email}`);
      
      // Use the improved email service
      const { success, error } = await EmailService.sendVerificationEmail(
        email,
        fullName,
        ticketType,
        isEducationalEmail
      );
      
      if (!isMountedRef.current) return;
      
      if (success) {
        setSendingAttempts(prev => prev + 1);
        toast({
          title: "Verification email sent",
          description: `Check your inbox at ${email} for a verification code`,
          variant: "default"
        });
      } else {
        setSendingError(`Failed to send verification email: ${error?.message || "Unknown error"}`);
        toast({
          title: "Failed to send verification email",
          description: "Please try again or use a different email address",
          variant: "destructive"
        });
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      
      console.error("Error sending verification email:", error);
      setSendingError(`An unexpected error occurred: ${(error as Error).message}`);
      
      toast({
        title: "Error sending verification email",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      if (isMountedRef.current) {
        setIsSendingEmail(false);
      }
    }
  };

  /**
   * Verify email with provided code
   */
  const handleVerifyEmail = async () => {
    if (isSubmitting || !verificationCode) return;
    
    try {
      setIsSubmitting(true);
      
      console.log(`Verifying code ${verificationCode} for ${email}`);
      
      const { data, error } = await supabase.functions.invoke<VerificationResponse>(
        'verify-email-token', 
        { 
          body: { 
            email,
            token: verificationCode,
            ticketType
          } 
        }
      );
      
      if (!isMountedRef.current) return;
      
      if (error) {
        console.error("Error verifying email token:", error);
        onVerificationError(`Verification failed: ${error.message}`);
        
        toast({
          title: "Verification failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      if (data?.success) {
        toast({
          title: "Email verified successfully",
          description: "You can now continue with your registration",
          variant: "default"
        });
        
        onVerificationSuccess();
      } else {
        onVerificationError(data?.error || "Verification failed");
        
        toast({
          title: "Verification failed",
          description: data?.error || "Invalid verification code. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      
      console.error("Error in verification process:", error);
      onVerificationError(`An unexpected error occurred: ${(error as Error).message}`);
      
      toast({
        title: "Verification error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
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
