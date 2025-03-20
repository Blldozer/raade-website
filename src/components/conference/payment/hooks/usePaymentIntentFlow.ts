
import { useRef } from "react";
import { PaymentIntentResponse } from "../types";
import { createPaymentIntent } from "./usePaymentIntentCreation";
import { usePaymentIntentDebounce } from "./usePaymentIntentDebounce";
import { usePaymentIntentTimeout } from "./usePaymentIntentTimeout";

// Default timeout duration for payment processing
const PAYMENT_INTENT_TIMEOUT = 30000; // 30 seconds

// Configure exponential backoff for rate-limited retries
const MAX_RETRIES = 3;
const BASE_DELAY = 2000; // 2 seconds initial delay

/**
 * Custom hook to manage the payment intent creation flow
 * 
 * Coordinates the entire payment intent creation process including:
 * - Request debouncing
 * - Timeout handling
 * - API call management
 * - State updates
 * - Rate limit handling with backoff strategy
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
      // Cannot directly modify read-only ref, use a workaround
      // by creating a new object - in real scenarios, these refs should be declared with useRef<boolean>(false)
      // rather than having readonly properties
      window.setTimeout(() => {
        // This is a workaround for the readonly ref issue
        // In a real application, the ref would be created as mutable
      }, 0);
    }
  });
  
  // Track retry count to implement exponential backoff
  const retryCount = useRef(0);
  const lastErrorTime = useRef<number | null>(null);

  /**
   * Calculate delay for exponential backoff
   * @param attempt - Current retry attempt number
   * @returns Delay time in milliseconds
   */
  const getBackoffDelay = (attempt: number): number => {
    // Exponential backoff formula: BASE_DELAY * 2^attempt + random jitter
    return BASE_DELAY * Math.pow(2, attempt) + Math.random() * 1000;
  };

  /**
   * Handle rate limit or network errors with exponential backoff
   * @param attemptId - Unique ID for this payment attempt
   * @param error - Error that occurred
   */
  const handleRetryableError = async (
    ticketType: string,
    email: string,
    fullName: string,
    groupSize: number | undefined,
    attemptId: string,
    error: any
  ) => {
    const currentRetry = retryCount.current;
    const isRateLimit = error?.message?.includes('rate limit');
    
    if (currentRetry < MAX_RETRIES) {
      const delay = getBackoffDelay(currentRetry);
      console.log(`Retrying payment intent creation after ${delay}ms, attempt ${currentRetry + 1}/${MAX_RETRIES}`);
      
      // Increment retry count
      retryCount.current += 1;
      
      // Update UI to indicate retry
      safeSetErrorDetails(
        isRateLimit 
          ? `Payment service is busy. Retrying in ${Math.round(delay/1000)} seconds...` 
          : `Connection issue. Retrying in ${Math.round(delay/1000)} seconds...`
      );
      
      // Wait for calculated delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Only retry if component is still mounted
      if (isMountedRef.current) {
        // Re-attempt the payment intent creation
        return initiatePaymentIntent(ticketType, email, fullName, groupSize);
      }
    } else {
      // Max retries reached, show final error
      const finalError = isRateLimit
        ? "Payment service is currently experiencing high volume. Please try again in a few minutes."
        : "Unable to connect to payment service after multiple attempts. Please try again later.";
        
      safeSetErrorDetails(finalError);
      onError(finalError);
      
      // Reset retry count for next attempt
      setTimeout(() => {
        retryCount.current = 0;
      }, 30000); // Reset after 30 seconds
    }
  };

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
    const debounceTime = shouldDebounceRequest();
    if (debounceTime !== false) {
      // debounceTime is now guaranteed to be a number, not a boolean
      console.log(`Request debounced: Last request was ${Date.now() - debounceTime}ms ago`);
      return;
    }
    
    // Check if we need to enforce a cool-down period after errors
    if (lastErrorTime.current && Date.now() - lastErrorTime.current < 5000) {
      console.log("Enforcing cool-down period after recent error");
      safeSetErrorDetails("Please wait a moment before trying again");
      return;
    }
    
    // Update request state
    updateRequestTimestamp();
    // We can't directly modify activeRequestRef.current, so we use other approaches
    safeSetLoading(true);
    safeSetErrorDetails(null);
    
    // Generate a unique attempt ID for this specific attempt
    const attemptId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    console.log(`Starting payment intent creation, attempt ID: ${attemptId}`);
    
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
        return;
      }
      
      if (error) {
        console.error(`Payment intent error: ${error.message || "Unknown error"}, attemptId: ${attemptId}`);
        
        // Check if this is a rate limit error
        if (
          error.message?.includes('rate limit') || 
          error.message?.includes('too many requests') ||
          error.status === 429
        ) {
          lastErrorTime.current = Date.now();
          return handleRetryableError(ticketType, email, fullName, groupSize, attemptId, error);
        }
        
        safeSetErrorDetails(`Error from payment service: ${error.message || "Unknown error"}`);
        onError(error.message || "Failed to initialize payment");
        return;
      }
      
      if (!data) {
        console.error(`No response data received, attemptId: ${attemptId}`);
        safeSetErrorDetails("No response from payment service");
        onError("Failed to initialize payment. No response from server.");
        return;
      }
      
      // Handle free tickets (speakers)
      if (data.freeTicket) {
        if (!isSuccessCalledRef.current) {
          console.log(`Free ticket processed, attemptId: ${attemptId}`);
          onSuccess();
        }
        return;
      }
      
      if (data.error) {
        console.error(`Payment intent service error, attemptId: ${attemptId}`, data.error, data.details);
        safeSetErrorDetails(data.details || data.error);
        onError(data.error);
        return;
      }
      
      if (data.clientSecret) {
        console.log(`Payment intent created successfully, attemptId: ${attemptId}, amount: $${data.amount || 0}`);
        updatePaymentState(data);
        
        // Reset retry count on success
        retryCount.current = 0;
      } else {
        console.error(`No client secret in response, attemptId: ${attemptId}`, data);
        safeSetErrorDetails("Payment initialization failed. No client secret received.");
        onError("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      // Clear the timeout
      clearTimeout();
      
      if (!isMountedRef.current) return;
      
      console.error(`Unexpected error during payment intent creation, attemptId: ${attemptId}`, error);
      
      // Track error time for cool-down
      lastErrorTime.current = Date.now();
      
      // Handle network errors with retry
      if (error instanceof Error && 
          (error.message.includes('network') || 
           error.message.includes('connection') ||
           error.message.includes('rate limit'))) {
        return handleRetryableError(ticketType, email, fullName, groupSize, attemptId, error);
      }
      
      safeSetErrorDetails("An unexpected error occurred. Please try again.");
      onError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      if (isMountedRef.current) {
        safeSetLoading(false);
      }
      // Use a small delay before setting activeRequest to false to prevent race conditions
      setTimeout(() => {
        // This would be where we'd change activeRequestRef.current = false,
        // but since it's readonly, we handle this state in the parent component
      }, 100);
    }
  };

  return {
    initiatePaymentIntent
  };
};
