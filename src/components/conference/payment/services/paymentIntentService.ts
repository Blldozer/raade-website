
import { supabase } from "@/integrations/supabase/client";

/**
 * Creates a payment intent by calling the Supabase Edge Function
 * 
 * Makes the API call to create a payment intent based on ticket details
 * Manages retry attempts and invalid responses
 * 
 * @param ticketType - Type of ticket (student, professional, group)
 * @param email - User's email for the payment intent
 * @param fullName - User's full name for the payment record
 * @param groupSize - Optional group size for group registrations
 * @param attemptId - Unique ID for this request attempt for tracking
 * @returns The API response with payment intent details or error
 */
export const createPaymentIntentRequest = async (
  ticketType: string,
  email: string,
  fullName: string,
  groupSize?: number,
  attemptId?: string
) => {
  console.log(`Creating payment intent with:`, { 
    ticketType, 
    email, 
    fullName, 
    groupSize,
    attemptId
  });

  try {
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: {
        ticketType,
        email,
        fullName,
        groupSize,
        attemptId
      },
    });
    
    if (error) {
      console.error("Payment intent error from Supabase:", error);
      return { data: null, error };
    }
    
    if (!data) {
      console.error("No data returned from payment intent function");
      return { 
        data: null, 
        error: new Error("No response from payment service") 
      };
    }
    
    console.log("Payment intent response:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return { data: null, error };
  }
};
