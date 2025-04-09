
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Get the Stripe publishable key from the correct environment variable
const stripePublishableKey = "pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m";

// Initialize Stripe with error handling
const getStripe = () => {
  try {
    return loadStripe(stripePublishableKey);
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
    return null;
  }
};

const stripePromise = getStripe();

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
 * - Now with improved error handling
 */
const StripeWrapper: React.FC<StripeWrapperProps> = ({ children }) => {
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
  if (!stripePromise) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <p className="font-medium">Payment System Error</p>
        <p>Unable to initialize the payment system. Please try again later.</p>
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
