
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
 * after successful payment
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
      console.log("Storing registration data in Supabase");
      
      const { data: responseData, error } = await supabase.functions.invoke("store-registration", {
        body: data
      });
      
      if (error) {
        console.error("Error storing registration data:", error);
        return false;
      }
      
      console.log("Registration data stored successfully:", responseData);
      return true;
    } catch (err) {
      console.error("Failed to store registration data:", err);
      return false;
    }
  };
  
  return { storeRegistrationData };
};
