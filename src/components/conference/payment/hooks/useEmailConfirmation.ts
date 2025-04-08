
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { RegistrationFormData } from "../../RegistrationFormTypes";
import { storeRegistrationData } from "../services/registrationDataService";
import { sendConfirmationEmail } from "../services/emailConfirmationService";

/**
 * Custom hook for managing email confirmation process
 * 
 * This hook abstracts the email confirmation workflow:
 * - Tracks sending state for UI feedback
 * - Manages component lifecycle to prevent state updates after unmount
 * - Implements exponential backoff for retries
 * - Provides toast notifications for user feedback
 * - Handles completion callback for navigation
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
  // Track if toast notification has been shown
  const toastCalledRef = useRef<boolean>(false);
  // Maximum retry attempts
  const MAX_RETRIES = 3;
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  const sendConfirmationEmailWithRetry = async () => {
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
      
      // First, store the registration data silently
      const dataStorageResult = await storeRegistrationData(registrationData);
      
      if (!dataStorageResult) {
        console.warn("Failed to store registration data, but will still try to send email");
      }
      
      if (!isMountedRef.current) return;
      
      // Send the confirmation email
      const { success, error } = await sendConfirmationEmail(
        registrationData, 
        retryCount
      );
      
      if (!isMountedRef.current) return;
      
      if (!success) {
        // If we have retries left, try again with exponential backoff
        if (retryCount < MAX_RETRIES) {
          const backoffTime = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
          console.log(`Will retry sending email in ${backoffTime}ms`);
          
          setTimeout(() => {
            if (isMountedRef.current) {
              setRetryCount(prev => prev + 1);
              setSendingEmail(false);
              sendConfirmationEmailWithRetry();
            }
          }, backoffTime);
          
          return;
        }
        
        // Only show error toast once, on final failure
        if (!toastCalledRef.current) {
          toastCalledRef.current = true;
          toast({
            title: "Confirmation email could not be sent",
            description: "We'll still send you conference details via email later.",
            variant: "destructive"
          });
        }
      } else {
        if (isMountedRef.current) {
          setEmailSent(true);
        }
        
        // Only show success toast once
        if (!toastCalledRef.current) {
          toastCalledRef.current = true;
          toast({
            title: "Conference confirmation sent",
            description: "Check your email for registration details.",
            variant: "default"
          });
        }
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      
      const typedError = error as Error;
      console.error("Error in email confirmation process:", typedError);
      
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
            sendConfirmationEmailWithRetry();
          }
        }, backoffTime);
        
        return;
      }
      
      // Only show error toast once
      if (!toastCalledRef.current) {
        toastCalledRef.current = true;
        toast({
          title: "Confirmation email could not be sent",
          description: "We'll still send you conference details via email later.",
          variant: "destructive"
        });
      }
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
    sendConfirmationEmail: sendConfirmationEmailWithRetry 
  };
};
