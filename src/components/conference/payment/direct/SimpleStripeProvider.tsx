
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
  couponCode?: string;
  couponDiscount?: number;
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
 * - Now with improved error handling and fallbacks
 * - Supports coupon code discounts
 */
const SimpleStripeProvider = (props: SimpleStripeProviderProps) => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeStripe = () => {
      try {
        // loadStripe returns a Promise<Stripe|null>, so we set that directly to the state
        const promise = getStripe();
        setStripePromise(promise);
        // Flag successful initialization
        setIsInitialized(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error initializing payment system";
        console.error("Stripe initialization error:", errorMessage);
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

  // Fail gracefully if we can't initialize Stripe
  if (error) {
    return (
      <div className="text-red-500 p-6 border border-red-300 rounded bg-red-50 dark:bg-red-900/20 dark:border-red-800 flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-lg font-bold text-red-700 dark:text-red-300 mb-2">Payment System Error</h3>
        <p className="text-center mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
          Try Again
        </button>
      </div>
    );
  }

  // Show a nice loading state while Stripe initializes
  if (!stripePromise || !isInitialized) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading payment system...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <SimpleStripeCheckout {...props} />
    </Elements>
  );
};

export default SimpleStripeProvider;
