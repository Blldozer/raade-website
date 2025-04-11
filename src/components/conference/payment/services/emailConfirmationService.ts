
import { supabase } from "@/integrations/supabase/client";
import { RegistrationFormData, getFullName } from "../../RegistrationFormTypes";

/**
 * Interface for email confirmation response
 */
export interface EmailConfirmationResponse {
  data: {
    success?: boolean;
    message?: string;
    error?: string;
  };
  error: Error | null;
}

/**
 * Email Confirmation Service
 * 
 * Handles sending confirmation emails to conference registrants:
 * - Prepares request data based on registration information
 * - Implements timeout handling for request reliability
 * - Returns detailed response for UI feedback
 */
export const sendConfirmationEmail = async (
  registrationData: RegistrationFormData,
  retryAttempt = 0
): Promise<{ success: boolean; error?: Error }> => {
  try {
    // Build request with all required data
    const fullName = getFullName(registrationData.firstName, registrationData.lastName);
    
    const requestData = {
      fullName,
      email: registrationData.email,
      ticketType: registrationData.ticketType,
      // Only include groupSize for student-group tickets
      ...(registrationData.ticketType === "student-group" && { 
        groupSize: registrationData.groupSize 
      }),
      // Add retry count for tracking
      retryAttempt
    };
    
    console.log(`Sending confirmation email (attempt ${retryAttempt + 1})`, requestData);
    
    // Set a timeout for the email sending
    const EMAIL_SEND_TIMEOUT = 10000; // 10 seconds
    
    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Email sending timed out after ${EMAIL_SEND_TIMEOUT}ms`));
      }, EMAIL_SEND_TIMEOUT);
    });
    
    // Create the email sending promise
    const emailPromise = supabase.functions.invoke<EmailConfirmationResponse['data']>(
      'send-conference-confirmation', 
      { body: requestData }
    );
    
    // Race the timeout against the actual request
    const { data, error } = await Promise.race([
      emailPromise,
      timeoutPromise
    ]);
    
    if (error) {
      console.error("Error sending confirmation email:", error);
      return { success: false, error };
    } else {
      console.log("Confirmation email sent successfully:", data);
      return { success: true };
    }
  } catch (error) {
    console.error("Error invoking confirmation email function:", error);
    return { success: false, error: error as Error };
  }
};
