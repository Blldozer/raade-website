
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Custom hook for sending conference registration confirmation emails
 * 
 * Handles email confirmation sending state and error handling
 */
export const useEmailConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  /**
   * Send confirmation email to the registered attendee
   * 
   * @param email - Recipient's email address
   * @param name - Recipient's name
   * @param ticketType - Type of ticket purchased
   * @returns Promise that resolves when email is sent
   */
  const sendEmailConfirmation = async (
    email: string,
    name: string,
    ticketType: string
  ): Promise<void> => {
    if (!email || !name) {
      console.error("Cannot send confirmation without email and name");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke("send-conference-confirmation", {
        body: {
          email,
          name,
          ticketType,
          requestId: `conf-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
        }
      });
      
      if (error) {
        throw error;
      }
      
      setEmailSent(true);
      console.log("Conference confirmation email sent successfully");
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
      // We don't want to throw here as this would break the UI flow
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    sendEmailConfirmation,
    isLoading,
    emailSent
  };
};
