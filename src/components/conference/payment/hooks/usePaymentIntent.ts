
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Custom hook for creating and managing payment intents
 * 
 * Handles:
 * - Payment intent creation via Supabase Edge Function
 * - Timeout handling and retry logic
 * - Error management and request deduplication
 * - Loading and error states
 */
export const usePaymentIntent = ({
  ticketType,
  email,
  fullName,
  groupSize,
  onSuccess,
  onError
}: {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [isGroupRegistration, setIsGroupRegistration] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [requestId, setRequestId] = useState<string | null>(null);
  
  // Use refs to track if the component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);
  // Track if we're already in the process of a success callback
  const isSuccessCalledRef = useRef(false);
  // Track ongoing requests to prevent duplicate requests
  const activeRequestRef = useRef(false);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // Set a timeout for the payment intent creation
  const PAYMENT_INTENT_TIMEOUT = 20000; // 20 seconds
  
  // Wrap createPaymentIntent in useCallback to memoize it and avoid recreating on every render
  const createPaymentIntent = useCallback(async () => {
    // If a request is already in progress, don't start another one
    if (activeRequestRef.current) {
      console.log("Payment intent request already in progress, skipping duplicate request");
      return;
    }
    
    activeRequestRef.current = true;
    
    if (isMountedRef.current) {
      setIsLoading(true);
      setErrorDetails(null);
    }
    
    // Generate a unique attempt ID for this specific attempt
    const attemptId = Date.now().toString();
    console.log(`Creating payment intent (attempt ${retryCount + 1}) with:`, { 
      ticketType, 
      email, 
      fullName, 
      groupSize,
      attemptId
    });
    
    try {
      // Create a timeout promise that rejects after PAYMENT_INTENT_TIMEOUT
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Payment intent request timed out after ${PAYMENT_INTENT_TIMEOUT}ms`));
        }, PAYMENT_INTENT_TIMEOUT);
      });
      
      // Create the payment intent request
      const requestPromise = supabase.functions.invoke('create-payment-intent', {
        body: {
          ticketType,
          email,
          fullName,
          groupSize,
          attemptId
        },
      });
      
      // Race the timeout against the actual request
      const { data, error } = await Promise.race([
        requestPromise,
        // Cast the timeout promise to the expected shape
        timeoutPromise.then(() => {
          throw new Error(`Payment intent request timed out after ${PAYMENT_INTENT_TIMEOUT}ms`);
        })
      ]) as { data: any, error: any };
      
      // Only process response if component is still mounted
      if (!isMountedRef.current) {
        activeRequestRef.current = false;
        return;
      }
      
      if (error) {
        console.error("Payment intent error from Supabase:", error);
        setErrorDetails(`Error from payment service: ${error.message || "Unknown error"}`);
        onError(error.message || "Failed to initialize payment");
        activeRequestRef.current = false;
        return;
      }
      
      if (!data) {
        console.error("No data returned from payment intent function");
        setErrorDetails("No response from payment service");
        onError("Failed to initialize payment. No response from server.");
        activeRequestRef.current = false;
        return;
      }
      
      console.log("Payment intent response:", data);
      
      // Store the request ID for reference in case of issues
      if (data.requestId && isMountedRef.current) {
        setRequestId(data.requestId);
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
        console.error("Payment intent error:", data.error, "Details:", data.details);
        setErrorDetails(data.details || data.error);
        onError(data.error);
        activeRequestRef.current = false;
        return;
      }
      
      if (data.clientSecret && isMountedRef.current) {
        setClientSecret(data.clientSecret);
        setAmount(data.amount);
        setCurrency(data.currency);
        setIsGroupRegistration(data.isGroupRegistration || false);
        activeRequestRef.current = false;
      } else {
        console.error("No client secret in response:", data);
        setErrorDetails("Payment initialization failed. No client secret received.");
        onError("Failed to initialize payment. Please try again.");
        activeRequestRef.current = false;
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      
      if (isMountedRef.current) {
        // Provide more specific error messages based on the error
        let errorMessage = "An unexpected error occurred";
        
        if (error.message?.includes('timeout')) {
          errorMessage = "The payment service took too long to respond. Please try again.";
        } else if (error.message?.includes('network')) {
          errorMessage = "A network error occurred. Please check your internet connection and try again.";
        } else if (error.code === 'AbortError') {
          errorMessage = "The request was cancelled. Please try again.";
        }
        
        setErrorDetails(errorMessage);
        onError("Failed to initialize payment. " + errorMessage);
      }
      
      activeRequestRef.current = false;
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      activeRequestRef.current = false;
    }
  }, [ticketType, email, fullName, groupSize, onSuccess, onError, retryCount]);

  // Create payment intent when the component loads or retryCount changes
  useEffect(() => {
    // Only execute if a payment intent doesn't already exist
    if (!clientSecret) {
      createPaymentIntent();
    }
  }, [createPaymentIntent, retryCount, clientSecret]);

  // Handle manual retry from the user
  const handleRetry = () => {
    // Reset client secret to force a new payment intent creation
    setClientSecret("");
    setRetryCount(prev => prev + 1);
  };

  return {
    clientSecret,
    isLoading,
    amount,
    currency,
    isGroupRegistration,
    errorDetails,
    requestId,
    handleRetry
  };
};
