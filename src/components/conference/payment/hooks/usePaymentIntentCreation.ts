
import { PaymentIntentResponse } from "../types";
import { createPaymentIntentRequest } from "../services/paymentIntentService";

/**
 * Creates a payment intent via the Supabase Edge Function
 * 
 * Handles the API call to create a payment intent and return the result
 * 
 * @param ticketType - Type of ticket being purchased
 * @param email - User's email address
 * @param fullName - User's full name
 * @param groupSize - Optional group size for group registrations
 * @param attemptId - Unique ID for tracking this specific request attempt
 * @returns Promise with payment intent response data
 */
export const createPaymentIntent = async (
  ticketType: string,
  email: string,
  fullName: string,
  groupSize?: number,
  attemptId?: string
): Promise<{ data: PaymentIntentResponse | null; error: Error | null }> => {
  try {
    console.log(`Creating payment intent, attemptId: ${attemptId}`);
    
    const { data, error } = await createPaymentIntentRequest(
      ticketType,
      email,
      fullName,
      groupSize,
      attemptId
    );
    
    if (error) {
      console.error(`Payment intent error, attemptId: ${attemptId}`, error);
      return { 
        data: null, 
        error: new Error(error.message || "Unknown error") 
      };
    }
    
    if (!data) {
      console.error(`No response data, attemptId: ${attemptId}`);
      return { 
        data: null, 
        error: new Error("No response from payment service") 
      };
    }
    
    console.log(`Payment intent response received, attemptId: ${attemptId}`, data);
    return { data, error: null };
    
  } catch (error) {
    console.error(`Error creating payment intent, attemptId: ${attemptId}`, error);
    
    // Provide more specific error messages based on the error
    let errorMessage = "An unexpected error occurred";
    
    const err = error as Error;
    
    if (err.message?.includes('timeout')) {
      errorMessage = "The payment service took too long to respond. Please try again.";
    } else if (err.message?.includes('network')) {
      errorMessage = "A network error occurred. Please check your internet connection and try again.";
    } else if ((error as { code?: string }).code === 'AbortError') {
      errorMessage = "The request was cancelled. Please try again.";
    }
    
    return { 
      data: null, 
      error: new Error(errorMessage) 
    };
  }
};
