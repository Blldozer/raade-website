
import { useState, useEffect, useRef } from "react";
import { UseFormWatch } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";
import { supabase } from "@/integrations/supabase/client";

/**
 * Custom hook to handle email validation for ticket types
 * 
 * Validates if the email domain is appropriate for the selected ticket type
 * Now with improved timeout handling and error recovery
 * 
 * @param watch - React Hook Form watch function
 * @param onValidation - Callback when validation completes
 * @returns Validation state including isValid, message, and validation status
 */
export const useEmailValidation = (
  watch: UseFormWatch<RegistrationFormData>,
  onValidation?: (result: { isValid: boolean; message?: string }) => void
) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [validationResult, setValidationResult] = useState<{ 
    isValid: boolean; 
    message?: string 
  }>({
    isValid: false,
  });
  
  // Add timeout handling to prevent getting stuck
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const validationAttemptRef = useRef(0);

  const email = watch("email");
  const ticketType = watch("ticketType");

  // Clean up any pending timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Clear previous timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Reset validation if email is empty
    if (!email || email.trim() === '') {
      setIsCheckingEmail(false);
      setValidationResult({ isValid: false });
      return;
    }

    // Only validate for student tickets
    if (
      ticketType !== TICKET_TYPES_ENUM.STUDENT && 
      ticketType !== TICKET_TYPES_ENUM.STUDENT_GROUP
    ) {
      // Skip validation for non-student tickets
      const result = { isValid: true };
      setValidationResult(result);
      setIsCheckingEmail(false);
      
      if (onValidation) {
        onValidation(result);
      }
      return;
    }

    // Set checking state
    setIsCheckingEmail(true);
    const currentAttempt = ++validationAttemptRef.current;

    // Handle validation with a manual timeout
    const performValidation = async () => {
      try {
        // Basic email format validation
        if (!email.includes('@')) {
          setValidationResult({ isValid: false, message: "Please enter a valid email address" });
          setIsCheckingEmail(false);
          return;
        }

        // Simple domain check (faster than API call)
        const domain = email.split('@')[1];
        const isEduEmail = domain?.toLowerCase().endsWith('.edu');
        
        // For student tickets, do a quick check first
        if ((ticketType === TICKET_TYPES_ENUM.STUDENT || ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP)) {
          if (!isEduEmail) {
            const result = { 
              isValid: false, 
              message: "Student tickets require an .edu email address" 
            };
            setValidationResult(result);
            setIsCheckingEmail(false);
            if (onValidation) {
              onValidation(result);
            }
            return;
          }
        }

        // Call API for full validation if simple check passes
        try {
          const { data, error } = await supabase.functions.invoke("verify-email-domain", {
            body: { email, ticketType }
          });
          
          // If this attempt has been superseded by a newer one, abort
          if (currentAttempt !== validationAttemptRef.current) return;

          if (error) {
            console.error("Email validation error:", error);
            // Default to valid in case of API error
            const result = { isValid: true };
            setValidationResult(result);
            if (onValidation) {
              onValidation(result);
            }
          } else {
            const result = { 
              isValid: data.isValid, 
              message: data.message 
            };
            setValidationResult(result);
            if (onValidation) {
              onValidation(result);
            }
          }
        } catch (err) {
          // Handle network errors gracefully
          console.error("Email validation request failed:", err);
          // Default to valid in case of network error
          const result = { isValid: true };
          setValidationResult(result);
          if (onValidation) {
            onValidation(result);
          }
        }
      } finally {
        setIsCheckingEmail(false);
      }
    };

    // Set up a timeout to handle the case where the API call hangs
    timeoutRef.current = setTimeout(() => {
      if (isCheckingEmail) {
        console.log("Email validation timed out after 5 seconds, allowing to proceed");
        setIsCheckingEmail(false);
        // Default to valid in case of timeout
        const result = { isValid: true };
        setValidationResult(result);
        if (onValidation) {
          onValidation(result);
        }
      }
    }, 5000);

    // Delay validation a bit to avoid too many API calls
    const timer = setTimeout(performValidation, 500);
    return () => clearTimeout(timer);
  }, [email, ticketType, onValidation]);

  return {
    isValid: validationResult.isValid,
    validationMessage: validationResult.message,
    isCheckingEmail
  };
};
