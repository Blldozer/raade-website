import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PaymentForm from "./PaymentForm";

// Initialize Stripe with the live publishable key
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m");

interface StripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const StripeCheckout = ({ 
  ticketType, 
  email,
  fullName,
  onSuccess,
  onError 
}: StripeCheckoutProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  
  useEffect(() => {
    // Create a payment intent when the component loads
    const createPaymentIntent = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('create-payment-intent', {
          body: {
            ticketType,
            email,
            fullName
          },
        });
        
        if (error) {
          throw error;
        }
        
        // Handle free tickets (speakers)
        if (data.freeTicket) {
          onSuccess();
          return;
        }
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setAmount(data.amount);
          setCurrency(data.currency);
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
        onError("Failed to initialize payment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    createPaymentIntent();
  }, [ticketType, email, fullName, onSuccess, onError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-raade-navy" />
        <p className="ml-2">Preparing payment...</p>
      </div>
    );
  }

  // If there's no client secret (and we're not loading), something went wrong
  if (!clientSecret && !isLoading) {
    return (
      <div className="text-center py-4 text-red-500">
        Failed to initialize payment. Please try again.
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
          />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
