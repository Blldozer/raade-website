
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize stripe once instead of on every render
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m");

interface StripeWrapperProps {
  children: React.ReactNode;
}

/**
 * StripeWrapper Component
 * 
 * Provides the Stripe context to child components
 * - Initializes the Stripe instance with your publishable key
 * - Creates a context for Stripe elements to use
 */
const StripeWrapper: React.FC<StripeWrapperProps> = ({ children }) => {
  const options = {
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#FBB03B',
        colorBackground: '#ffffff',
        colorText: '#32325d',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
