
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
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(result.message || "Failed to send confirmation email");
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
