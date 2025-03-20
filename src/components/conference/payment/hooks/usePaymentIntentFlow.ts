
import { useRef } from "react";
import { PaymentIntentResponse } from "../types";
import { createPaymentIntent } from "./usePaymentIntentCreation";
import { usePaymentIntentDebounce } from "./usePaymentIntentDebounce";
import { usePaymentIntentTimeout } from "./usePaymentIntentTimeout";

// Default timeout duration for payment processing
const PAYMENT_INTENT_TIMEOUT = 20000; // 20 seconds

/**
 * Custom hook to manage the payment intent creation flow
 * 
 * Coordinates the entire payment intent creation process including:
 * - Request debouncing
 * - Timeout handling
 * - API call management
 * - State updates
 * 
 * @param isMountedRef - Reference to track if component is mounted
 * @param activeRequestRef - Reference to track active request state
 * @param safeSetLoading - Function to safely update loading state
 * @param safeSetErrorDetails - Function to safely update error details
 * @param updatePaymentState - Function to update payment state with response data
 * @param isSuccessCalledRef - Reference to track if success callback was called
 * @param onSuccess - Success callback function
 * @param onError - Error callback function
 * @returns Functions for initiating payment intent creation
 */
export const usePaymentIntentFlow = (
  isMountedRef: React.RefObject<boolean>,
  activeRequestRef: React.RefObject<boolean>,
  safeSetLoading: (loading: boolean) => void,
  safeSetErrorDetails: (error: string | null) => void,
  updatePaymentState: (data: PaymentIntentResponse) => void,
  isSuccessCalledRef: React.RefObject<boolean>,
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  // Use debounce hook to prevent rapid requests
  const { shouldDebounceRequest, updateRequestTimestamp } = usePaymentIntentDebounce();
  
  // Use timeout hook for handling request timeouts
  const { startTimeout, clearTimeout } = usePaymentIntentTimeout({
    timeoutDuration: PAYMENT_INTENT_TIMEOUT,
    onTimeout: () => {
      if (isMountedRef.current) {
        safeSetLoading(false);
        safeSetErrorDetails("The payment service took too long to respond. Please try again.");
        onError("Payment service timeout. Please try again later.");
      }
      activeRequestRef.current = false;
    }
  });

  /**
   * Initiates the payment intent creation process
   * 
   * @param ticketType - Type of ticket being purchased
   * @param email - User's email address
   * @param fullName - User's full name
   * @param groupSize - Optional group size for group registrations
   * @returns Promise that resolves when process completes
   */
  const initiatePaymentIntent = async (
    ticketType: string,
    email: string,
    fullName: string,
    groupSize?: number
  ): Promise<void> => {
    // If a request is already in progress, don't start another one
    if (activeRequestRef.current) {
      console.log("Payment intent request already in progress, skipping duplicate request");
      return;
    }
    
    // Check if we're trying to make requests too quickly
    if (shouldDebounceRequest()) {
      console.log(`Request debounced: Last request was ${Date.now() - shouldDebounceRequest()}ms ago`);
      return;
    }
    
    // Update request state
    updateRequestTimestamp();
    activeRequestRef.current = true;
    safeSetLoading(true);
    safeSetErrorDetails(null);
    
    // Generate a unique attempt ID for this specific attempt
    const attemptId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Start timeout timer
    startTimeout();
    
    try {
      const { data, error } = await createPaymentIntent(
        ticketType,
        email,
        fullName,
        groupSize,
        attemptId
      );
      
      // Clear the timeout since we got a response
      clearTimeout();
      
      if (!isMountedRef.current) {
        console.log(`Component unmounted during request, attemptId: ${attemptId}`);
        activeRequestRef.current = false;
        return;
      }
      
      if (error) {
        safeSetErrorDetails(`Error from payment service: ${error.message || "Unknown error"}`);
        onError(error.message || "Failed to initialize payment");
        activeRequestRef.current = false;
        return;
      }
      
      if (!data) {
        safeSetErrorDetails("No response from payment service");
        onError("Failed to initialize payment. No response from server.");
        activeRequestRef.current = false;
        return;
      }
      
      // Handle free tickets (speakers)
      if (data.freeTicket) {
        if (!isSuccessCalledRef.current) {
          isSuccessCalledRef.current = true;
          onSuccess();
        }
        activeRequestRef.current = false;
        return;
      }
      
      if (data.error) {
        console.error(`Payment intent service error, attemptId: ${attemptId}`, data.error, data.details);
        safeSetErrorDetails(data.details || data.error);
        onError(data.error);
        activeRequestRef.current = false;
        return;
      }
      
      if (data.clientSecret) {
        console.log(`Payment intent created successfully, attemptId: ${attemptId}`);
        updatePaymentState(data);
      } else {
        console.error(`No client secret in response, attemptId: ${attemptId}`, data);
        safeSetErrorDetails("Payment initialization failed. No client secret received.");
        onError("Failed to initialize payment. Please try again.");
      }
    } finally {
      if (isMountedRef.current) {
        safeSetLoading(false);
      }
      // Use a small delay before setting activeRequest to false to prevent race conditions
      setTimeout(() => {
        activeRequestRef.current = false;
      }, 100);
    }
  };

  return {
    initiatePaymentIntent
  };
};
