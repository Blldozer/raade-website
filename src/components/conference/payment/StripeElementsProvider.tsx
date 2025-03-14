
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with the live publishable key
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m");

interface StripeElementsProviderProps {
  clientSecret: string;
  children: React.ReactNode;
}

/**
 * StripeElementsProvider Component
 * 
 * Configures and initializes Stripe Elements:
 * - Sets up the Stripe context with client secret
 * - Configures branding and appearance settings
 * - Wraps payment form components with Stripe context
 * 
 * @param clientSecret - The client secret from payment intent
 * @param children - Child components that need access to Stripe Elements
 */
const StripeElementsProvider: React.FC<StripeElementsProviderProps> = ({ 
  clientSecret,
  children 
}) => {
  // Configure Stripe Elements options with RAADE branding
  const options: StripeElementsOptions = {
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
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeElementsProvider;
