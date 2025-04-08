
import { useState } from "react";
import { RegistrationFormData } from "@/components/conference/RegistrationFormTypes";
import { processRegistrationData } from "../services/registrationDataService";

/**
 * Hook for handling email confirmation process
 */
export const useEmailConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const sendConfirmation = async (registrationData: RegistrationFormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const result = await processRegistrationData(registrationData);
      
      // Check if the result has a success property
      if (result && 'success' in result && result.success) {
        setIsSuccess(true);
      } else {
        // If there's a message in the result, use it, otherwise use a default message
        const errorMsg = result && 'message' in result ? result.message : "Failed to send confirmation email";
        setErrorMessage(errorMsg as string);
      }
    } catch (error) {
      console.error("Email confirmation error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    sendConfirmation,
    isLoading,
    isSuccess,
    errorMessage,
    reset: () => {
      setIsSuccess(false);
      setErrorMessage(null);
    }
  };
};
