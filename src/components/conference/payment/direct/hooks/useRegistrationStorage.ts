
import { supabase } from "@/integrations/supabase/client";

interface RegistrationData {
  fullName: string;
  email: string;
  organization?: string;
  role?: string;
  ticketType: string;
  specialRequests?: string;
  referralSource?: string;
  groupSize?: number;
  groupEmails?: string[];
  paymentComplete: boolean;
}

/**
 * Custom hook to handle registration data storage
 * 
 * Manages storing registration data in Supabase
 * after successful payment with enhanced error handling
 * and detailed logging for troubleshooting
 */
export const useRegistrationStorage = () => {
  /**
   * Stores registration data in Supabase
   * 
   * @param data - Registration data to store
   * @returns Boolean indicating success or failure
   */
  const storeRegistrationData = async (data: RegistrationData): Promise<boolean> => {
    try {
      console.log("Starting registration storage process with data:", {
        email: data.email,
        fullName: data.fullName,
        ticketType: data.ticketType,
        paymentComplete: data.paymentComplete,
        hasGroupData: data.groupSize && data.groupSize > 0
      });
      
      // Generate a tracking ID for this request
      const requestId = `reg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      console.log(`Registration storage request ID: ${requestId}`);
      
      // Call the Edge Function with better error handling
      const { data: responseData, error } = await supabase.functions.invoke("store-registration", {
        body: {
          ...data,
          requestId // Add tracking ID to request
        }
      });
      
      if (error) {
        console.error(`Registration storage error (${requestId}):`, error);
        console.error("Error details:", {
          message: error.message,
          name: error.name,
          code: error?.code || "unknown",
          context: error?.context || "none"
        });
        return false;
      }
      
      if (!responseData) {
        console.error(`Registration storage error (${requestId}): No response data`);
        return false;
      }
      
      console.log(`Registration successfully stored (${requestId}):`, responseData);
      return true;
    } catch (err) {
      // Capture more detailed error information
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      const errorName = err instanceof Error ? err.name : "UnknownError";
      
      console.error("Failed to store registration data:", {
        message: errorMessage,
        name: errorName,
        error: err
      });
      return false;
    }
  };
  
  return { storeRegistrationData };
};
