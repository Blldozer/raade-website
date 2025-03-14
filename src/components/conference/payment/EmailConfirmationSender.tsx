
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RegistrationFormData } from "../RegistrationFormTypes";

interface EmailConfirmationSenderProps {
  registrationData: RegistrationFormData;
  onComplete: () => void;
}

/**
 * EmailConfirmationSender Component
 * 
 * Handles sending confirmation emails after payment:
 * - Constructs email data from registration information
 * - Invokes Supabase function to send confirmation
 * - Provides feedback on success/failure
 * 
 * @param registrationData - Registration data for email content
 * @param onComplete - Callback function after email process completes
 */
export const useEmailConfirmation = (registrationData: RegistrationFormData, onComplete: () => void) => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const { toast } = useToast();
  
  const sendConfirmationEmail = async () => {
    try {
      setSendingEmail(true);
      
      // Build request with all required data
      const requestData = {
        fullName: registrationData.fullName,
        email: registrationData.email,
        ticketType: registrationData.ticketType,
        // Only include groupSize for student-group tickets
        ...(registrationData.ticketType === "student-group" && { 
          groupSize: registrationData.groupSize 
        })
      };
      
      const { data, error } = await supabase.functions.invoke('send-conference-confirmation', {
        body: requestData
      });
      
      if (error) {
        console.error("Error sending confirmation email:", error);
        toast({
          title: "Confirmation email could not be sent",
          description: "We'll still send you conference details via email later.",
          variant: "destructive"
        });
      } else {
        console.log("Confirmation email sent successfully:", data);
        toast({
          title: "Conference confirmation sent",
          description: "Check your email for registration details.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error invoking confirmation email function:", error);
      toast({
        title: "Confirmation email could not be sent",
        description: "We'll still send you conference details via email later.",
        variant: "destructive"
      });
    } finally {
      setSendingEmail(false);
      
      // Delay the onComplete callback to allow the user to see the confirmation
      setTimeout(() => {
        onComplete();
      }, 5000); // Auto-redirect after 5 seconds
    }
  };
  
  return { sendingEmail, sendConfirmationEmail };
};
