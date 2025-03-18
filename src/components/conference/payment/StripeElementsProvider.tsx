
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with the live publishable key
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m", {
  apiVersion: '2023-10-16',
  betas: ['stripe_js_enforce_https_beta_1']
});

interface StripeElementsProviderProps {
  clientSecret: string;
  children: React.ReactNode;
}

const StripeElementsProvider: React.FC<StripeElementsProviderProps> = ({ 
  clientSecret,
  children 
}) => {
  // Enforce HTTPS in production environments
  React.useEffect(() => {
    if (window.location.protocol === 'http:' && 
        window.location.hostname !== 'localhost' && 
        window.location.hostname !== '127.0.0.1') {
      window.location.href = window.location.href.replace('http:', 'https:');
    }
    
    console.log("Stripe Elements initialized with client secret format:", 
      clientSecret ? `${clientSecret.substring(0, 5)}...` : "Missing client secret");
  }, [clientSecret]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#274675',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Merriweather, system-ui, sans-serif',
        borderRadius: '4px',
      }
    },
    loader: 'always',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeElementsProvider;
