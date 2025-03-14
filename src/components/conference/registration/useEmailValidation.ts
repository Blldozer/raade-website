
import { useState, useEffect } from "react";
import { validateTicketEmailDomain } from "../RegistrationFormTypes";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook for validating email addresses for conference registration
 * 
 * Checks if the email meets the requirements for the selected ticket type:
 * - Student tickets must have .edu domain
 * - Group tickets must have .edu domain
 * - Professional tickets have no domain restrictions
 * 
 * @param email - The email address to validate
 * @param ticketType - The selected ticket type
 * @param onValidation - Optional callback when validation completes
 * @returns Validation state and messages
 */
export const useEmailValidation = (
  email: string,
  ticketType: string,
  onValidation?: (result: { isValid: boolean; message?: string }) => void
) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Reset validation when email or ticket type changes
  useEffect(() => {
    setValidationMessage(null);
    setIsValid(null);
    
    if (!email || !email.includes('@') || !ticketType) {
      return;
    }
    
    const validateEmail = async () => {
      setIsCheckingEmail(true);
      
      try {
        // First do basic validation (correct format and .edu for student tickets)
        const baseValidation = validateTicketEmailDomain(email, ticketType);
        
        if (!baseValidation.isValid) {
          setValidationMessage(baseValidation.message || "Invalid email for this ticket type");
          setIsValid(false);
          if (onValidation) onValidation(baseValidation);
          return;
        }
        
        // For student or group tickets, confirm the domain is valid
        if (ticketType === "student" || ticketType === "student-group") {
          // Check if the domain ends with .edu
          const domain = email.split('@')[1]?.toLowerCase();
          
          if (!domain || !domain.endsWith('.edu')) {
            const message = "Student tickets require an .edu email address";
            setValidationMessage(message);
            setIsValid(false);
            if (onValidation) onValidation({ isValid: false, message });
            return;
          }
        }
        
        // If all validations pass, email is valid
        setIsValid(true);
        setValidationMessage(null);
        if (onValidation) onValidation({ isValid: true });
        
      } catch (error) {
        console.error("Error validating email:", error);
        setValidationMessage("Error validating email domain");
        setIsValid(false);
        if (onValidation) onValidation({ isValid: false, message: "Error validating email domain" });
      } finally {
        setIsCheckingEmail(false);
      }
    };
    
    // Debounce validation to avoid too many requests
    const timer = setTimeout(() => {
      validateEmail();
    }, 500);
    
    return () => clearTimeout(timer);
    
  }, [email, ticketType, onValidation]);

  return {
    isCheckingEmail,
    validationMessage,
    isValid
  };
};
