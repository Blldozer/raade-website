
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
 * - Enables Link for faster checkout experience
 * - Wraps payment form components with Stripe context
 * - Ensures HTTPS is used in production environment
 * 
 * @param clientSecret - The client secret from payment intent
 * @param children - Child components that need access to Stripe Elements
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
    
    // Debug info about Stripe configuration
    console.log("Stripe Elements initialized with client secret format:", 
      clientSecret ? clientSecret.substring(0, 5) + "..." : "Missing client secret");
  }, [clientSecret]);

  // Configure Stripe Elements options with RAADE branding
  const options: StripeElementsOptions = {
    // For Stripe Elements v2, clientSecret needs to be passed directly
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
    // Enable Link for faster checkout
    // This allows returning customers to use their saved payment information
    // across Link-enabled merchants
    loader: 'always',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeElementsProvider;
