
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with the publishable key - using a singleton pattern
const getStripePromise = (() => {
  let stripePromise = null;
  
  return () => {
    if (stripePromise) {
      return stripePromise;
    }
    
    const stripeKey = "pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m";
    
    try {
      console.log("Initializing Stripe.js with publishable key");
      stripePromise = loadStripe(stripeKey, {
        apiVersion: '2025-02-24.acacia',
        betas: ['stripe_js_enforce_https_beta_1'],
        locale: 'auto'
      });
      
      // Log when the promise resolves
      stripePromise
        .then(() => console.log("✓ Stripe.js loaded successfully"))
        .catch(err => {
          console.error("✗ Error loading Stripe.js:", err);
          // Reset the promise so we can try again
          stripePromise = null;
        });
        
      return stripePromise;
    } catch (error) {
      console.error("Failed to initialize Stripe:", error);
      stripePromise = null;
      return Promise.reject(error);
    }
  };
})();

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
 * - Handles initialization failures with retry logic
 * - Ensures proper loading state management
 * - Enforces HTTPS in production environment
 * - Improved error handling and browser compatibility
 * 
 * @param clientSecret - The client secret from payment intent
 * @param children - Child components that need access to Stripe Elements
 */
const StripeElementsProvider: React.FC<StripeElementsProviderProps> = ({ 
  clientSecret,
  children 
}) => {
  const [stripePromise, setStripePromise] = useState(() => typeof window !== 'undefined' ? getStripePromise() : null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Enforce HTTPS in production environments
  useEffect(() => {
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
  
  // Handle Stripe initialization and retry logic
  useEffect(() => {
    if (!stripePromise && typeof window !== 'undefined') {
      console.log(`Initializing Stripe.js (attempt ${retryCount + 1})`);
      setIsInitializing(true);
      setInitError(null);
      
      const promise = getStripePromise();
      setStripePromise(promise);
      
      // Add timeout to detect slow loading
      const timeoutId = setTimeout(() => {
        console.warn("Stripe.js initialization taking longer than expected");
      }, 3000);
      
      promise
        .then(() => {
          clearTimeout(timeoutId);
          setIsInitializing(false);
          console.log("Stripe initialization completed successfully");
        })
        .catch(error => {
          clearTimeout(timeoutId);
          console.error("Stripe initialization failed:", error);
          setInitError(error);
          setIsInitializing(false);
          
          // Reset Stripe promise to try again
          setStripePromise(null);
          
          // Auto-retry up to 2 times with exponential backoff
          if (retryCount < 2) {
            const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s
            console.log(`Will retry Stripe initialization in ${delay}ms`);
            
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, delay);
          }
        });
    }
  }, [retryCount, stripePromise]);
  
  // Log the Stripe initialization status and client secret
  useEffect(() => {
    console.log("StripeElementsProvider status:", { 
      isInitializing, 
      hasError: !!initError, 
      stripeReady: !!stripePromise,
      hasClientSecret: !!clientSecret,
      clientSecretStart: clientSecret ? `${clientSecret.substring(0, 5)}...` : "missing"
    });
    
    if (!clientSecret) {
      console.error("Missing client secret in StripeElementsProvider");
    }
  }, [clientSecret, isInitializing, initError, stripePromise]);

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
    locale: 'auto'
  };

  // Handle different states of Stripe initialization
  if (isInitializing) {
    return (
      <div className="p-4 border rounded bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
          <p>Initializing payment system...</p>
        </div>
      </div>
    );
  }
  
  if (initError || !stripePromise) {
    return (
      <div className="p-4 border rounded bg-red-50 text-red-800">
        <p className="font-medium">Payment system initialization failed</p>
        <p className="text-sm mt-1">{initError?.message || 'Unable to load Stripe'}</p>
        <button 
          onClick={() => setRetryCount(prev => prev + 1)}
          className="mt-2 px-3 py-1 bg-white border border-red-300 rounded-md text-sm"
        >
          Retry
        </button>
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
