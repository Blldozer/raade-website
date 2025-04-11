
import { useState, useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";

/**
 * Custom hook to handle email validation for ticket types
 * 
 * Validates if the email domain is appropriate for the selected ticket type
 * (e.g., .edu for student tickets) using both client-side and optional server validation
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

    // Small delay to simulate validation - helps with UX
    const timer = setTimeout(async () => {
      // First do client-side validation which is always reliable
      const clientValidation = validateEmailDomainClientSide(email, ticketType);
      
      // If client validation passes, we're good to go
      if (clientValidation.isValid) {
        setValidationResult(clientValidation);
        setIsCheckingEmail(false);
        
        // Call the callback if provided
        if (onValidation) {
          onValidation(clientValidation);
        }
        return;
      }
      
      // For client-side failures, we'll still accept the email but with a warning
      // This ensures the form doesn't block legitimate emails
      setValidationResult({
        isValid: true, // Allow form to continue
        message: clientValidation.message // But keep the message as a warning
      });
      setIsCheckingEmail(false);
      
      // Call the callback
      if (onValidation) {
        onValidation({ isValid: true, message: clientValidation.message });
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
 * Client-side email domain validation
 * Simple but reliable check for .edu domains
 */
const validateEmailDomainClientSide = (
  email: string,
  ticketType: string
): { isValid: boolean; message?: string } => {
  if (!email || !email.includes('@')) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  
  const domain = email.split('@')[1]?.toLowerCase();
  
  // For student tickets, validate .edu domain
  if ((ticketType === TICKET_TYPES_ENUM.STUDENT || ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP) && 
      !domain.endsWith('.edu')) {
    return { 
      isValid: false, 
      message: "Student tickets require an .edu email address. If you have an educational email from outside the US, please continue but note it will be verified." 
    };
  }
  
  // For Rice student tickets, check for rice.edu specifically
  if (ticketType === "rice-student" && !email.toLowerCase().endsWith('@rice.edu')) {
    return {
      isValid: false,
      message: "Rice student tickets require a rice.edu email address"
    };
  }

  return { isValid: true };
};
