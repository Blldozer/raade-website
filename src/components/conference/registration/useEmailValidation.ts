import { useState, useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM, validateTicketEmailDomain } from "../RegistrationFormTypes";

/**
 * Custom hook to handle email validation for ticket types
 * 
 * Validates if the email domain is appropriate for the selected ticket type
 * (e.g., .edu for student tickets)
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

  const email = watch("email");
  const ticketType = watch("ticketType");

  useEffect(() => {
    if (!email) {
      setValidationResult({ isValid: false });
      return;
    }

    setIsCheckingEmail(true);

    const timer = setTimeout(() => {
      const result = validateTicketEmailDomain(email, ticketType);
      setValidationResult(result);
      setIsCheckingEmail(false);

      if (onValidation) {
        onValidation(result);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [email, ticketType, onValidation]);

  return {
    isValid: validationResult.isValid,
    validationMessage: validationResult.message,
    isCheckingEmail
  };
};
