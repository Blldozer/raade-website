
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PaymentForm from "./PaymentForm";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Initialize Stripe with the live publishable key
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m");

interface StripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

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
    // Create a payment intent when the component loads
    createPaymentIntent();
  }, [ticketType, email, fullName, groupSize, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-raade-navy" />
        <p className="ml-2">Preparing payment...</p>
      </div>
    );
  }

  // If there's an error, show error message with retry option
  if (errorDetails) {
    return (
      <div className="mt-4">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Error</AlertTitle>
          <AlertDescription>
            {errorDetails}
          </AlertDescription>
        </Alert>
        <Button 
          onClick={handleRetry} 
          className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white"
        >
          Try Again
        </Button>
      </div>
    );
  }

  // If there's no client secret (and we're not loading or showing an error), something went wrong
  if (!clientSecret) {
    return (
      <div className="mt-4">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Setup Failed</AlertTitle>
          <AlertDescription>
            We couldn't initialize the payment process. Please try again later.
          </AlertDescription>
        </Alert>
        <Button 
          onClick={handleRetry} 
          className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ 
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#274675', // RAADE navy
              colorBackground: '#ffffff',
              colorText: '#30313d',
              colorDanger: '#df1b41',
              fontFamily: 'Merriweather, system-ui, sans-serif',
              borderRadius: '4px',
            }
          }
        }}>
          <PaymentForm 
            email={email}
            onSuccess={onSuccess}
            onError={onError}
            amount={amount}
            currency={currency}
            isGroupRegistration={isGroupRegistration}
            groupSize={isGroupRegistration ? groupSize : undefined}
          />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
