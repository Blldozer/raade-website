
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
 * Makes the API call to create a payment intent based on ticket details:
 * - Includes automatic retry with longer timeout
 * - Handles network errors gracefully
 * - Provides detailed logging for troubleshooting
 * - Implements request tracking via unique attempt IDs
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
    
    // Pre-request validation
    if (!ticketType || !email || !fullName) {
      console.error(`Invalid payment intent request [${attemptId}]: missing required fields`);
      return {
        data: null,
        error: new Error("Missing required fields for payment intent")
      };
    }
    
    // Prepare request payload with validation
    const payload: PaymentIntentRequestData = {
      ticketType: ticketType.trim(),
      email: email.trim(),
      fullName: fullName.trim(),
      attemptId
    };
    
    // Add group size only if it's a valid number
    if (typeof groupSize === 'number' && !isNaN(groupSize) && groupSize > 0) {
      payload.groupSize = groupSize;
    }
    
    // First try - with short timeout
    console.log(`Sending initial payment intent request [${attemptId}]`);
    const { data, error } = await Promise.race([
      supabase.functions.invoke<PaymentIntentResponse>('create-payment-intent', {
        body: payload
      }),
      new Promise<{data: null, error: Error}>((resolve) => {
        setTimeout(() => {
          resolve({
            data: null,
            error: new Error("Initial request timeout - retrying with longer timeout")
          });
        }, 10000); // 10 second initial timeout (increased from 8s)
      })
    ]);
    
    // If first try timed out or had other errors, retry with longer timeout
    if (error || !data) {
      const errorMessage = error?.message || "No response from server";
      console.log(`Payment intent request issue [${attemptId}]: ${errorMessage}, retrying with longer timeout`);
      
      // Add short delay before retry to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Second try - with longer timeout
      console.log(`Sending retry payment intent request [${attemptId}]`);
      const retryPayload = {
        ...payload,
        attemptId: `${attemptId}-retry`,
        isRetry: true
      };
      
      const result = await supabase.functions.invoke<PaymentIntentResponse>('create-payment-intent', {
        body: retryPayload
      });
      
      const requestDuration = Date.now() - requestStart;
      console.log(`Payment intent retry completed in ${requestDuration}ms [${attemptId}]`);
      
      if (result.error) {
        console.error(`Payment intent error on retry [${attemptId}]:`, result.error);
        return { 
          data: null, 
          error: new Error(`Payment service error: ${result.error.message || "Unknown error"}`)
        };
      }
      
      if (!result.data) {
        console.error(`Empty response on retry [${attemptId}]`);
        return {
          data: null,
          error: new Error("Payment service returned empty response")
        };
      }
      
      return { data: result.data, error: null };
    }
    
    const requestDuration = Date.now() - requestStart;
    console.log(`Payment intent request completed in ${requestDuration}ms [${attemptId}]`);
    
    if (!data) {
      console.error(`No data returned from payment intent function [${attemptId}]`);
      return { 
        data: null, 
        error: new Error("No response from payment service") 
      };
    }
    
    // Log success response
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
      errorMessage = "The payment service is not properly configured for your browser. Please try again or refresh the page.";
    } else if (err.message?.includes('timeout') || err.message?.includes('timed out')) {
      errorMessage = "The payment service took too long to respond. Please try again later.";
    } else if (err.message?.includes('network')) {
      errorMessage = "A network error occurred. Please check your internet connection and try again.";
    } else if (err.message?.includes('rate limit') || err.message?.includes('too many requests')) {
      errorMessage = "The payment service is experiencing high traffic. Please wait a moment and try again.";
    }
    
    return { data: null, error: new Error(errorMessage) };
  }
};
