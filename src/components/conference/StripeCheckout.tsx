
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PaymentForm from "./PaymentForm";

// Initialize Stripe with a publishable key
// Using a public key, so it's safe to include directly
const stripePromise = loadStripe("pk_test_51OPiHSAPiPZC8VvEKZUSRt9eIzOLewAUIQQK8G6Kz1Wnlx8FbMDnpTdEzKXQo5I9NRyX5uCd0PV1sMlHqU2k0O8M00lk3XJJm1");

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
        <Elements stripe={stripePromise} options={{ clientSecret }}>
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
