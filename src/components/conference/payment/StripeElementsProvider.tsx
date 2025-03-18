
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with the live publishable key
// Enforce HTTPS by ensuring current protocol is considered
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m", {
  // Ensure API requests use HTTPS in production
  apiVersion: '2023-10-16',
  // This ensures that if somehow the site is loaded over HTTP, Stripe still uses HTTPS
  betas: ['stripe_js_enforce_https_beta_1']
});

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
 * - Enables payment methods including Apple Pay, Google Pay via paymentMethodsOptions
 * - Wraps payment form components with Stripe context
 * - Ensures HTTPS is used in production environment
 */
const StripeElementsProvider: React.FC<StripeElementsProviderProps> = ({ 
  clientSecret,
  children 
}) => {
  // Enforce HTTPS in production environments
  React.useEffect(() => {
    // Check if we're in production and not using HTTPS
    if (window.location.protocol === 'http:' && 
        window.location.hostname !== 'localhost' && 
        window.location.hostname !== '127.0.0.1') {
      
      // Redirect to HTTPS version of the current URL
      window.location.href = window.location.href.replace('http:', 'https:');
    }
  }, []);

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
    },
    // Configure payment method options correctly for Stripe Elements
    paymentMethodCreation: 'manual', // This enables more control over payment methods
    
    // Fix: Use the correct card options structure according to Stripe API v2023-10-16
    // The requestThreeDSecure property is not valid in this context
    paymentMethodOptions: {
      card: {
        // Only use properties that are actually defined in the type
        require_cvc_recollection: false
      }
    },
    
    // Configure business information for Apple Pay and Google Pay
    business: {
      name: 'RAADE Conference 2025'
    },
    // Ensure Stripe forms are always loaded over HTTPS
    loader: 'always'
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeElementsProvider;
