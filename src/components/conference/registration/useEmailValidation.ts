
import { useState, useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";

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

    // Set checking state
    setIsCheckingEmail(true);

    // Small delay to simulate validation
    const timer = setTimeout(() => {
      // Validate the email domain for the selected ticket type
      const result = validateTicketEmailDomain(email, ticketType);
      setValidationResult(result);
      setIsCheckingEmail(false);

      // Call the callback if provided
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

/**
 * Validates if an email domain is appropriate for the selected ticket type
 * @param email The email address to validate
 * @param ticketType The selected ticket type
 * @returns Validation result object
 */
const validateTicketEmailDomain = (
  email: string,
  ticketType: string
): { isValid: boolean; message?: string } => {
  if (!email || !email.includes('@')) {
    return { isValid: false, message: "Please enter a valid email address" };
  }

  // For student tickets, validate .edu domain
  if ((ticketType === TICKET_TYPES_ENUM.STUDENT || ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP) && 
      !email.toLowerCase().endsWith('.edu')) {
    return { 
      isValid: false, 
      message: "Student tickets require an .edu email address" 
    };
  }

  return { isValid: true };
};
