
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PaymentForm from "./PaymentForm";
import LoadingIndicator from "./payment/LoadingIndicator";
import ErrorDisplay from "./payment/ErrorDisplay";
import StripeElementsProvider from "./payment/StripeElementsProvider";
import { toast } from "@/hooks/use-toast";

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
 * - Managing payment state and error handling
 * - Supporting retry functionality for failed payment intents
 * - Implementing automatic retries for transient errors
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
  const [autoRetry, setAutoRetry] = useState(false);
  const maxAutoRetries = 2;
  
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
        
        // Check if error might be transient and we should auto-retry
        if (retryCount < maxAutoRetries && !autoRetry) {
          setAutoRetry(true);
          toast({
            title: "Payment network error",
            description: "Automatically retrying payment setup...",
            variant: "default"
          });
          
          // Wait 2 seconds before retrying
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
            setAutoRetry(false);
          }, 2000);
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
      
      // Handle free tickets (speakers)
      if (data.freeTicket) {
        onSuccess();
        return;
      }
      
      if (data.error) {
        console.error("Payment intent error:", data.error);
        if (data.errorType === 'invalid_request_error' && retryCount < maxAutoRetries) {
          toast({
            title: "Payment setup error",
            description: "Automatically retrying...",
            variant: "default"
          });
          
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, 2000);
          return;
        }
        
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
    toast({
      title: "Retrying payment setup",
      description: "Reconnecting to payment service...",
      variant: "default"
    });
    setRetryCount(prev => prev + 1);
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
