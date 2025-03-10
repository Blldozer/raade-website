
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateTicketEmailDomain } from "../RegistrationFormTypes";

export const useEmailValidation = (
  email: string | undefined,
  ticketType: string | undefined,
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void
) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // When email changes and ticket type is set, validate the email domain
    const validateEmail = () => {
      if (email && ticketType) {
        setIsCheckingEmail(true);
        
        try {
          // Client-side validation only
          const validationResult = validateTicketEmailDomain(email, ticketType);
          
          if (onEmailValidation) {
            onEmailValidation(validationResult);
          }
          
          if (!validationResult.isValid) {
            toast({
              title: "Email domain not valid",
              description: validationResult.message,
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error in email validation:", error);
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

  return { isCheckingEmail };
};
