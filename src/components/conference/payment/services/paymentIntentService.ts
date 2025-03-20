
import { supabase } from "@/integrations/supabase/client";
import { PaymentIntentResponse } from "../types";

interface PaymentIntentRequestData {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  attemptId?: string;
}

interface PaymentIntentResult {
  data: PaymentIntentResponse | null;
  error: Error | null;
}

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
): Promise<PaymentIntentResult> => {
  console.log(`Creating payment intent [${attemptId}]:`, { 
    ticketType, 
    email, 
    fullName, 
    groupSize
  });

  try {
    const requestStart = Date.now();
    
    // First try - with short timeout
    const { data, error } = await Promise.race([
      supabase.functions.invoke<PaymentIntentResponse>('create-payment-intent', {
        body: {
          ticketType,
          email,
          fullName,
          groupSize,
          attemptId
        } as PaymentIntentRequestData,
      }),
      new Promise<{data: null, error: Error}>((resolve) => {
        setTimeout(() => {
          resolve({
            data: null,
            error: new Error("Initial request timeout - retrying with longer timeout")
          });
        }, 8000); // 8 second initial timeout
      })
    ]);
    
    // If first try timed out, try again with longer timeout
    if (error && error.message?.includes("timeout")) {
      console.log(`Payment intent initial request timed out [${attemptId}], retrying with longer timeout`);
      
      // Second try - with longer timeout
      const result = await supabase.functions.invoke<PaymentIntentResponse>('create-payment-intent', {
        body: {
          ticketType,
          email,
          fullName,
          groupSize,
          attemptId: `${attemptId}-retry`
        } as PaymentIntentRequestData,
      });
      
      const requestDuration = Date.now() - requestStart;
      console.log(`Payment intent retry request completed in ${requestDuration}ms [${attemptId}]`);
      
      if (result.error) {
        console.error(`Payment intent error from Supabase on retry [${attemptId}]:`, result.error);
        return { data: null, error: result.error };
      }
      
      return { data: result.data, error: null };
    }
    
    const requestDuration = Date.now() - requestStart;
    console.log(`Payment intent request completed in ${requestDuration}ms [${attemptId}]`);
    
    if (error) {
      console.error(`Payment intent error from Supabase [${attemptId}]:`, error);
      return { data: null, error };
    }
    
    if (!data) {
      console.error(`No data returned from payment intent function [${attemptId}]`);
      return { 
        data: null, 
        error: new Error("No response from payment service") 
      };
    }
    
    console.log(`Payment intent response [${attemptId}]:`, {
      success: !data.error,
      amount: data.amount,
      requestId: data.requestId
    });
    
    return { data, error: null };
  } catch (error) {
    console.error(`Error creating payment intent [${attemptId}]:`, error);
    
    // Provide more user-friendly error messages based on error types
    let errorMessage = "An unexpected error occurred";
    const err = error as Error;
    
    if (err.message?.includes('CORS')) {
      errorMessage = "The payment service is not properly configured for your browser. Please try again.";
    } else if (err.message?.includes('timeout') || err.message?.includes('timed out')) {
      errorMessage = "The payment service took too long to respond. Please try again later.";
    } else if (err.message?.includes('network')) {
      errorMessage = "A network error occurred. Please check your internet connection and try again.";
    }
    
    return { data: null, error: new Error(errorMessage) };
  }
};
