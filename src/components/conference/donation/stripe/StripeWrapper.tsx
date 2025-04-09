
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m");

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

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
