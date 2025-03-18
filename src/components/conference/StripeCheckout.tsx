
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PaymentForm from "./PaymentForm";
import LoadingIndicator from "./payment/LoadingIndicator";
import ErrorDisplay from "./payment/ErrorDisplay";
import StripeElementsProvider from "./payment/StripeElementsProvider";

interface StripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * StripeCheckout Component
 * 
 * Handles payment processing through Stripe by:
 * - Creating a payment intent via our Supabase Edge Function
 * - Supporting Apple Pay and Google Pay payment methods
 * - Managing payment state and error handling
 * - Supporting retry functionality for failed payment intents
 * 
 * @param ticketType - Type of ticket being purchased (student, professional, student-group)
 * @param email - Customer email for receipt
 * @param fullName - Customer name for the payment record
 * @param groupSize - Optional number of people in a group (for student-group tickets)
 * @param onSuccess - Callback function when payment is successful
 * @param onError - Callback function when payment fails
 */
const StripeCheckout = ({ 
  ticketType, 
  email,
  fullName,
  groupSize,
  onSuccess,
  onError 
}: StripeCheckoutProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [isGroupRegistration, setIsGroupRegistration] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const MAX_RETRY_ATTEMPTS = 3;
  
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
        if (error.status >= 500 && retryAttempts < MAX_RETRY_ATTEMPTS) {
          console.log(`Transient server error, retrying (${retryAttempts + 1}/${MAX_RETRY_ATTEMPTS})...`);
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
        onSuccess();
        return;
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
  }, [ticketType, email, fullName, groupSize, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    // Reset the retryAttempts counter when manually retrying
    setRetryAttempts(0);
  };

  // Loading state
  if (isLoading) {
    return <LoadingIndicator />;
  }

  // Error state
  if (errorDetails) {
    return (
      <ErrorDisplay 
        title="Payment Error" 
        details={errorDetails} 
        onRetry={handleRetry} 
      />
    );
  }

  // Missing client secret state
  if (!clientSecret) {
    return (
      <ErrorDisplay 
        title="Payment Setup Failed" 
        details="We couldn't initialize the payment process. Please try again later." 
        onRetry={handleRetry} 
      />
    );
  }

  // Ready state - show payment form
  return (
    <div className="mt-4">
      <StripeElementsProvider clientSecret={clientSecret}>
        <PaymentForm 
          email={email}
          onSuccess={onSuccess}
          onError={onError}
          amount={amount}
          currency={currency}
          isGroupRegistration={isGroupRegistration}
          groupSize={isGroupRegistration ? groupSize : undefined}
        />
      </StripeElementsProvider>
    </div>
  );
};

export default StripeCheckout;
