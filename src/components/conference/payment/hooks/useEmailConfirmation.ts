
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { RegistrationFormData } from "../../RegistrationFormTypes";
import { storeRegistrationData } from "../services/registrationDataService";
import { EmailService, EmailDeliveryStatus } from "../services/emailService";

/**
 * Custom hook for managing email confirmation process
 * 
 * This hook abstracts the email confirmation workflow:
 * - Uses the enhanced EmailService for reliable delivery
 * - Tracks sending state for UI feedback
 * - Manages component lifecycle to prevent state updates after unmount
 * - Provides toast notifications for user feedback
 * - Handles completion callback for navigation
 * - Adds background processing and status polling
 */
export const useEmailConfirmation = (
  registrationData: RegistrationFormData, 
  onComplete: () => void
) => {
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [emailRecordId, setEmailRecordId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Track component mount state to prevent state updates after unmount
  const isMountedRef = useRef<boolean>(true);
  // Track if onComplete has been called
  const completeCalledRef = useRef<boolean>(false);
  // Track if toast notification has been shown
  const toastCalledRef = useRef<boolean>(false);
  
  // Status polling interval (in ms)
  const STATUS_POLLING_INTERVAL = 3000;
  // Maximum polling attempts
  const MAX_POLLING_ATTEMPTS = 5;
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // Set up status polling when we have an email record ID
  useEffect(() => {
    if (!emailRecordId || emailSent) return;
    
    let pollCount = 0;
    let pollInterval: NodeJS.Timeout;
    
    const pollEmailStatus = async () => {
      if (pollCount >= MAX_POLLING_ATTEMPTS || !isMountedRef.current) {
        clearInterval(pollInterval);
        return;
      }
      
      pollCount++;
      
      try {
        const status = await EmailService.getEmailStatus(emailRecordId);
        
        if (!isMountedRef.current) return;
        
        if (status === EmailDeliveryStatus.DELIVERED) {
          clearInterval(pollInterval);
          
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
          
          // Call onComplete after a short delay
          if (!completeCalledRef.current) {
            completeCalledRef.current = true;
            setTimeout(() => {
              onComplete();
            }, 2000);
          }
        }
        else if (status === EmailDeliveryStatus.FAILED) {
          clearInterval(pollInterval);
          
          // Only show error toast once
          if (!toastCalledRef.current) {
            toastCalledRef.current = true;
            toast({
              title: "Confirmation email could not be sent",
              description: "We'll still send you conference details via email later.",
              variant: "destructive"
            });
          }
          
          // Still call onComplete after a delay
          if (!completeCalledRef.current) {
            completeCalledRef.current = true;
            setTimeout(() => {
              onComplete();
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Error polling email status:", error);
      }
    };
    
    // Start polling
    pollInterval = setInterval(pollEmailStatus, STATUS_POLLING_INTERVAL);
    
    // Initial poll
    pollEmailStatus();
    
    // Clean up interval on unmount or when no longer needed
    return () => {
      clearInterval(pollInterval);
    };
  }, [emailRecordId, emailSent, toast, onComplete]);
  
  const sendConfirmationEmailWithBackgroundProcessing = async () => {
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
      
      // Send the confirmation email using our enhanced service
      const { success, emailRecordId: recordId, error } = await EmailService.sendConfirmationEmail(
        registrationData
      );
      
      if (!isMountedRef.current) return;
      
      if (success) {
        if (isMountedRef.current) {
          setEmailSent(true);
          setEmailRecordId(recordId || null);
        }
        
        // Only show success toast once if we don't have a record ID to poll
        if (!recordId && !toastCalledRef.current) {
          toastCalledRef.current = true;
          toast({
            title: "Conference confirmation sent",
            description: "Check your email for registration details.",
            variant: "default"
          });
        }
        
        // Call onComplete after a short delay if we're not polling
        if (!recordId && !completeCalledRef.current) {
          completeCalledRef.current = true;
          setTimeout(() => {
            onComplete();
          }, 2000);
        }
      } else {
        console.error("Failed to send confirmation email:", error);
        
        // Only show error toast once
        if (!toastCalledRef.current) {
          toastCalledRef.current = true;
          toast({
            title: "Confirmation email could not be sent",
            description: "We'll still send you conference details via email later.",
            variant: "destructive"
          });
        }
        
        // Still call onComplete after a delay
        if (!completeCalledRef.current) {
          completeCalledRef.current = true;
          setTimeout(() => {
            onComplete();
          }, 2000);
        }
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      
      const typedError = error as Error;
      console.error("Error in email confirmation process:", typedError);
            
      // Only show error toast once
      if (!toastCalledRef.current) {
        toastCalledRef.current = true;
        toast({
          title: "Confirmation email could not be sent",
          description: "We'll still send you conference details via email later.",
          variant: "destructive"
        });
      }
      
      // Still call onComplete after a delay
      if (!completeCalledRef.current) {
        completeCalledRef.current = true;
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    } finally {
      if (isMountedRef.current) {
        setSendingEmail(false);
      }
    }
  };
  
  return { 
    sendingEmail, 
    emailSent,
    sendConfirmationEmail: sendConfirmationEmailWithBackgroundProcessing 
  };
};
