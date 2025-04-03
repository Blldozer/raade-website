import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import SimpleStripeCheckout from "./SimpleStripeCheckout";

// Get the Stripe key from environment variables instead of hardcoding
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  "pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m";

// Initialize Stripe with error handling
const getStripe = () => {
  try {
    return loadStripe(STRIPE_PUBLISHABLE_KEY);
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
    return null;
  }
};

interface SimpleStripeProviderProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: Array<string | { value: string } | null>;
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * SimpleStripeProvider Component
 * 
 * Provides Stripe context for the checkout component:
 * - Initializes Stripe with publishable key
 * - Sets up the Stripe Elements provider
 * - Configures appearance settings for Stripe Elements
 */
const SimpleStripeProvider = (props: SimpleStripeProviderProps) => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = () => {
      try {
        // loadStripe returns a Promise<Stripe|null>, so we set that directly to the state
        const promise = getStripe();
        setStripePromise(promise);
      } catch (err) {
        setError("Failed to initialize payment system");
        props.onError("Payment system initialization failed");
      }
    };

    initializeStripe();
  }, [props.onError]);

  const options = {
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#274675', // RAADE navy
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Merriweather, system-ui, sans-serif',
        borderRadius: '4px',
      }
    },
  };

  if (error) {
    return <div className="text-red-500 p-4 border border-red-300 rounded">{error}</div>;
  }

  if (!stripePromise) {
    return <div className="p-4">Loading payment system...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <SimpleStripeCheckout {...props} />
    </Elements>
  );
};

export default SimpleStripeProvider;
