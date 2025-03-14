
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateTicketEmailDomain } from "../RegistrationFormTypes";

/**
 * Email Validation Hook
 * 
 * Custom hook that validates email domains against ticket type requirements:
 * - Verifies that student tickets use .edu email domains
 * - Provides real-time feedback to users during registration
 * - Implements debouncing to prevent excessive validation calls
 * 
 * @param email - The email address to validate
 * @param ticketType - The selected ticket type (student, professional, student-group)
 * @param onEmailValidation - Optional callback when validation completes
 */
export const useEmailValidation = (
  email: string | undefined,
  ticketType: string | undefined,
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void
) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Reset validation state when email or ticket type changes
    setValidationMessage(null);
    setIsValid(null);
    
    // When email changes and ticket type is set, validate the email domain
    const validateEmail = () => {
      if (email && ticketType) {
        setIsCheckingEmail(true);
        
        try {
          // Client-side validation only
          const validationResult = validateTicketEmailDomain(email, ticketType);
          
          setIsValid(validationResult.isValid);
          setValidationMessage(validationResult.isValid ? null : validationResult.message);
          
          if (onEmailValidation) {
            onEmailValidation(validationResult);
          }
          
          // Only show toast for severe errors, not domain mismatch
          if (!validationResult.isValid && validationResult.message?.includes("Error")) {
            toast({
              title: "Email validation error",
              description: validationResult.message,
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error in email validation:", error);
          setIsValid(false);
          setValidationMessage("Error validating email");
          
          if (onEmailValidation) {
            onEmailValidation({ isValid: false, message: "Error validating email" });
          }
        } finally {
          setIsCheckingEmail(false);
        }
      }
    };
    
    const debounceTimeout = setTimeout(() => {
      validateEmail();
    }, 500); // Debounce the validation
    
    return () => clearTimeout(debounceTimeout);
  }, [email, ticketType, toast, onEmailValidation]);

  return { isCheckingEmail, validationMessage, isValid };
};
