
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RegistrationFormData } from "../RegistrationFormTypes";

interface EmailConfirmationSenderProps {
  registrationData: RegistrationFormData;
  onComplete: () => void;
}

interface EmailConfirmationResponse {
  data: {
    success?: boolean;
    message?: string;
    error?: string;
  };
  error: Error | null;
}

/**
 * EmailConfirmationSender Component
 * 
 * Handles sending confirmation emails after payment:
 * - Constructs email data from registration information
 * - Invokes Supabase function to send confirmation
 * - Provides feedback on success/failure
 * - Implements timeouts and retries for reliability
 * 
 * @param registrationData - Registration data for email content
 * @param onComplete - Callback function after email process completes
 */
export const useEmailConfirmation = (
  registrationData: RegistrationFormData, 
  onComplete: () => void
) => {
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const { toast } = useToast();
  
  // Track component mount state to prevent state updates after unmount
  const isMountedRef = useRef<boolean>(true);
  // Track if onComplete has been called
  const completeCalledRef = useRef<boolean>(false);
  // Maximum retry attempts
  const MAX_RETRIES = 3;
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  const sendConfirmationEmail = async () => {
    // If email has already been sent, don't send it again
    if (emailSent) {
      console.log("Email already sent, skipping");
      
      // Ensure onComplete is called
      if (!completeCalledRef.current) {
        completeCalledRef.current = true;
        onComplete();
      }
      
      return;
    }
    
    try {
      if (isMountedRef.current) {
        setSendingEmail(true);
      }
      
      // Build request with all required data
      const requestData = {
        fullName: registrationData.fullName,
        email: registrationData.email,
        ticketType: registrationData.ticketType,
        // Only include groupSize for student-group tickets
        ...(registrationData.ticketType === "student-group" && { 
          groupSize: registrationData.groupSize 
        }),
        // Add retry count for tracking
        retryAttempt: retryCount
      };
      
      console.log(`Sending confirmation email (attempt ${retryCount + 1}/${MAX_RETRIES + 1})`, requestData);
      
      // Set a timeout for the email sending
      const EMAIL_SEND_TIMEOUT = 10000; // 10 seconds
      
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Email sending timed out after ${EMAIL_SEND_TIMEOUT}ms`));
        }, EMAIL_SEND_TIMEOUT);
      });
      
      // Create the email sending promise
      const emailPromise = supabase.functions.invoke<EmailConfirmationResponse['data']>('send-conference-confirmation', {
        body: requestData
      });
      
      // Race the timeout against the actual request
      const { data, error } = await Promise.race([
        emailPromise,
        timeoutPromise
      ]);
      
      if (!isMountedRef.current) return;
      
      if (error) {
        console.error("Error sending confirmation email:", error);
        
        // If we have retries left, try again with exponential backoff
        if (retryCount < MAX_RETRIES) {
          const backoffTime = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
          console.log(`Will retry sending email in ${backoffTime}ms`);
          
          setTimeout(() => {
            if (isMountedRef.current) {
              setRetryCount(prev => prev + 1);
              setSendingEmail(false);
              sendConfirmationEmail();
            }
          }, backoffTime);
          
          return;
        }
        
        // Out of retries
        toast({
          title: "Confirmation email could not be sent",
          description: "We'll still send you conference details via email later.",
          variant: "destructive"
        });
      } else {
        console.log("Confirmation email sent successfully:", data);
        
        if (isMountedRef.current) {
          setEmailSent(true);
        }
        
        toast({
          title: "Conference confirmation sent",
          description: "Check your email for registration details.",
          variant: "default"
        });
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      
      const typedError = error as Error;
      console.error("Error invoking confirmation email function:", typedError);
      
      // If we have retries left and it's a timeout or network error
      const isRetryableError = 
        typedError.message?.includes('timeout') || 
        typedError.message?.includes('network') ||
        (error as { code?: string }).code === 'AbortError';
        
      if (isRetryableError && retryCount < MAX_RETRIES) {
        const backoffTime = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        console.log(`Will retry sending email in ${backoffTime}ms due to: ${typedError.message}`);
        
        setTimeout(() => {
          if (isMountedRef.current) {
            setRetryCount(prev => prev + 1);
            setSendingEmail(false);
            sendConfirmationEmail();
          }
        }, backoffTime);
        
        return;
      }
      
      toast({
        title: "Confirmation email could not be sent",
        description: "We'll still send you conference details via email later.",
        variant: "destructive"
      });
    } finally {
      if (isMountedRef.current) {
        setSendingEmail(false);
      }
      
      // Delay the onComplete callback to allow the user to see the confirmation
      // Only call onComplete if it hasn't been called yet
      if (!completeCalledRef.current) {
        completeCalledRef.current = true;
        
        setTimeout(() => {
          onComplete();
        }, 3000); // Reduced from 5 seconds to 3 seconds for a better UX
      }
    }
  };
  
  return { 
    sendingEmail, 
    emailSent,
    sendConfirmationEmail 
  };
};
