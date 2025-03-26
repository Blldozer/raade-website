
import { useState, useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { RegistrationFormData, validateTicketEmailDomain } from "../RegistrationFormTypes";

/**
 * Custom hook to handle email validation for ticket types
 * 
 * Validates if the email domain is appropriate for the selected ticket type
 * (e.g., .edu for student tickets)
 * 
 * @param watch - React Hook Form watch function
 * @param onValidation - Callback when validation completes
 */
export const useEmailValidation = (
  watch: UseFormWatch<RegistrationFormData>,
  onValidation?: (result: { isValid: boolean; message?: string }) => void
) => {
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message?: string }>({
    isValid: false,
  });

  const email = watch("email");
  const ticketType = watch("ticketType");

  useEffect(() => {
    if (!email) {
      setValidationResult({ isValid: false });
      return;
    }

    // Validate the email domain for the selected ticket type
    const result = validateTicketEmailDomain(email, ticketType);
    setValidationResult(result);

    // Call the callback if provided
    if (onValidation) {
      onValidation(result);
    }
  }, [email, ticketType, onValidation]);

  return validationResult;
};
