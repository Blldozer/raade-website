
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Custom hook to handle email confirmation process
 * 
 * Manages the state and logic for sending confirmation emails
 * after successful payment or registration
 */
export const useEmailConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Send email confirmation to the user
   * 
   * @param email - User's email address
   * @param fullName - User's full name
   * @param ticketType - Type of ticket purchased
   * @returns Promise indicating if email was sent successfully
   */
  const sendEmailConfirmation = async (
    email: string,
    fullName: string,
    ticketType: string
  ): Promise<boolean> => {
    if (!email) {
      setError("Email address is required");
      return false;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.functions.invoke("send-confirmation-email", {
        body: {
          email,
          fullName,
          ticketType
        }
      });
      
      if (error) {
        console.error("Error sending confirmation email:", error);
        setError(error.message);
        return false;
      }
      
      setEmailSent(true);
      return true;
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendEmailConfirmation,
    isLoading,
    emailSent,
    error
  };
};
