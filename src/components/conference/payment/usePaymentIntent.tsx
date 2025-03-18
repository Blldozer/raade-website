
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UsePaymentIntentProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  onError: (error: string) => void;
  retryLimit?: number;
}

/**
 * Custom hook that handles payment intent creation
 * 
 * Manages:
 * - Creating payment intent via Supabase Edge Function
 * - Handling retries for transient errors
 * - Error states and loading states
 */
export const usePaymentIntent = ({
  ticketType,
  email,
  fullName,
  groupSize,
  onError,
  retryLimit = 3
}: UsePaymentIntentProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [isGroupRegistration, setIsGroupRegistration] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryAttempts, setRetryAttempts] = useState(0);
  
  const createPaymentIntent = async () => {
    setIsLoading(true);
    setErrorDetails(null);
    
    try {
      console.log("Creating payment intent with:", { ticketType, email, fullName, groupSize });
      
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          ticketType,
          email,
          fullName,
          groupSize
        },
      });
      
      if (error) {
        console.error("Payment intent error from Supabase:", error);
        // Check if it's a server error that might be transient (retryable)
        if (error.status >= 500 && retryAttempts < retryLimit) {
          console.log(`Transient server error, retrying (${retryAttempts + 1}/${retryLimit})...`);
          setRetryAttempts(prev => prev + 1);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 1500); // Retry after 1.5 seconds
          return;
        }
        
        setErrorDetails(`Error from server: ${error.message || "Unknown error"}`);
        onError(error.message || "Failed to initialize payment");
        return;
      }
      
      if (!data) {
        console.error("No data returned from payment intent function");
        setErrorDetails("No response from payment server");
        onError("Failed to initialize payment. No response from server.");
        return;
      }
      
      console.log("Payment intent created:", data);
      
      // Reset retry counter on success
      setRetryAttempts(0);
      
      // Handle free tickets (speakers)
      if (data.freeTicket) {
        return { freeTicket: true };
      }
      
      if (data.error) {
        console.error("Payment intent error:", data.error);
        setErrorDetails(data.details || data.error);
        onError(data.error);
        return;
      }
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setAmount(data.amount);
        setCurrency(data.currency);
        setIsGroupRegistration(data.isGroupRegistration || false);
      } else {
        console.error("No client secret in response:", data);
        setErrorDetails("Payment initialization failed. No client secret received.");
        onError("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      setErrorDetails(error.message || "An unexpected error occurred");
      onError("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Create a payment intent when the component loads or when retrying
    createPaymentIntent();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    // Reset the retryAttempts counter when manually retrying
    setRetryAttempts(0);
  };

  return {
    clientSecret,
    isLoading,
    amount,
    currency,
    isGroupRegistration,
    errorDetails,
    handleRetry
  };
};
