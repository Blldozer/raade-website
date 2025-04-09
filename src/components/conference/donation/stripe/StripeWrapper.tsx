
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Get the Stripe publishable key from the correct environment variable
const stripePublishableKey = "pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m";

// Initialize Stripe with proper error handling
// Using a singleton pattern ensures we only create one Stripe instance
const getStripe = (() => {
  let stripePromise: Promise<any> | null = null;
  
  return () => {
    if (!stripePromise) {
      console.log("Initializing Stripe with publishable key");
      try {
        stripePromise = loadStripe(stripePublishableKey);
        // Add logging for debugging
        stripePromise
          .then(() => console.log("Stripe loaded successfully"))
          .catch(err => {
            console.error("Failed to load Stripe:", err);
            stripePromise = null;
          });
      } catch (error) {
        console.error("Failed to initialize Stripe:", error);
        return null;
      }
    }
    return stripePromise;
  };
})();

interface StripeWrapperProps {
  children: React.ReactNode;
}

/**
 * StripeWrapper Component
 * 
 * Provides Stripe context for payment components:
 * - Initializes Stripe instance with publishable key
 * - Wraps children in Stripe Elements provider
 * - Ensures consistent styling across payment forms
 * - Implements singleton pattern for Stripe instance
 * - Improved error handling and reporting
 */
const StripeWrapper: React.FC<StripeWrapperProps> = ({ children }) => {
  const [stripePromise, setStripePromise] = React.useState(() => getStripe());
  const [stripeError, setStripeError] = React.useState<string | null>(null);

  // Ensure we have Stripe properly initialized on mount
  React.useEffect(() => {
    if (!stripePromise) {
      console.log("Trying to initialize Stripe");
      setStripePromise(getStripe());
    }
  }, []);

  // Configure Stripe Elements appearance
  const options = {
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#FBB03B',
        colorBackground: '#ffffff',
        colorText: '#32325d',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
    },
  };

  // Show an error message if Stripe failed to initialize
  if (stripeError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <p className="font-medium">Payment System Error</p>
        <p>{stripeError}</p>
        <button 
          onClick={() => {
            setStripeError(null);
            setStripePromise(getStripe());
          }}
          className="mt-2 text-sm underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="font-medium">Loading payment system...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
