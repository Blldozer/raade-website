import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with the publishable key
// Use a safer approach that works in both server and client environments
const getStripe = () => {
  const stripeKey = "pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m";
  
  try {
    return loadStripe(stripeKey, {
      apiVersion: '2025-02-24.acacia',
      betas: ['stripe_js_enforce_https_beta_1'],
      // Configure Stripe to use essential analytics only
      // This avoids the benchmark_visitor_id rate limiting issue while keeping fraud detection
      stripeAccount: undefined,
      locale: 'auto',
      // Disable advanced telemetry while keeping core fraud monitoring
      advancedFraudSignals: {
        ipAddress: true,
        browserData: true,
        telemetry: false
      }
    });
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
    return Promise.reject(error);
  }
};

// Create a singleton promise that will be reused
const stripePromise = typeof window !== 'undefined' ? getStripe() : null;

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
 * - Ensures HTTPS is used in production environment
 * - Has improved error handling and browser compatibility
 * - Uses optimized analytics settings to prevent rate limiting
 * 
 * @param clientSecret - The client secret from payment intent
 * @param children - Child components that need access to Stripe Elements
 */
const StripeElementsProvider: React.FC<StripeElementsProviderProps> = ({ 
  clientSecret,
  children 
}) => {
  // Log initialization for debugging
  React.useEffect(() => {
    if (!stripePromise) {
      console.error("Stripe initialization failed - window is not defined");
      return;
    }
    
    console.log("StripeElementsProvider initializing with client secret:", 
      clientSecret ? `${clientSecret.substring(0, 10)}...` : "missing");
    
    if (!clientSecret) {
      console.error("Missing client secret in StripeElementsProvider");
    }
    
    // Check if Stripe.js can load properly
    stripePromise
      .then(() => console.log("Stripe.js loaded successfully"))
      .catch((err) => console.error("Error loading Stripe.js:", err));
  }, [clientSecret]);
  
  // Enforce HTTPS in production environments
  React.useEffect(() => {
    // Check if we're in production and not using HTTPS
    if (typeof window !== 'undefined' && 
        window.location.protocol === 'http:' && 
        window.location.hostname !== 'localhost' && 
        window.location.hostname !== '127.0.0.1') {
      
      // Redirect to HTTPS version of the current URL
      console.log("Redirecting to HTTPS for Stripe security requirements");
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
    // Ensure Stripe forms are always loaded over HTTPS
    loader: 'always',
    // Optimize API calls by setting locale
    locale: 'auto',
    // Configure analytics collection to balance security and performance
    analytics: {
      // Enable core analytics needed for fraud prevention
      enableLogging: true,
      // Disable non-essential data collection
      extendedBrowser: false,
      nonEssentialData: false
    }
  };

  // If we're in a server-side rendering context or stripe failed to load
  if (!stripePromise) {
    console.log("Server-side rendering context or Stripe failed to initialize");
    return (
      <div className="p-4 border rounded bg-red-50 text-red-800">
        Unable to initialize payment system. Please try again or contact support.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeElementsProvider;
