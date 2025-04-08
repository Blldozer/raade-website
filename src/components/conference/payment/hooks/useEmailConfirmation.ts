
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RegistrationFormData } from "../../RegistrationFormTypes";

/**
 * Custom hook to handle sending email confirmations
 * 
 * Manages state for sending confirmation emails with error handling
 * and loading state management for better UX
 */
export const useEmailConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Sends a registration confirmation email
   * 
   * @param registrationData - Complete registration data
   */
  const sendConfirmation = async (registrationData: RegistrationFormData) => {
    setIsLoading(true);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      // Process registration data to ensure it has the proper format
      // that the Edge Function expects
      const cleanedData = {
        fullName: registrationData.fullName,
        email: registrationData.email,
        ticketType: registrationData.ticketType,
        groupSize: registrationData.groupSize,
        // Add other relevant fields
      };

      // Call the Supabase Edge Function to send the email
      const { error } = await supabase.functions.invoke(
        "send-conference-confirmation",
        {
          body: cleanedData,
        }
      );

      if (error) {
        console.error("Error sending confirmation email:", error);
        setErrorMessage(`Failed to send confirmation email: ${error.message}`);
        return;
      }
      
      setIsSuccess(true);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error in email confirmation:", error);
      setErrorMessage(`An error occurred: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resets the hook state
   */
  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setErrorMessage("");
  };

  return {
    sendConfirmation,
    isLoading,
    isSuccess,
    errorMessage,
    reset,
  };
};
