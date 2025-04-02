
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleStripeCheckout from "./SimpleStripeCheckout";

// Initialize Stripe with the publishable key - using a singleton pattern to prevent duplicates
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

interface SimpleStripeProviderProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: Array<string | { value: string } | null>;
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * SimpleStripeProvider Component
 * 
 * Provides Stripe context for the checkout component:
 * - Uses singleton pattern to prevent multiple Stripe instances
 * - Implements error handling for Stripe initialization failures
 * - Configures appearance settings for consistent branding
 */
const SimpleStripeProvider = (props: SimpleStripeProviderProps) => {
  // Make consistent code pattern that ensures Stripe is loaded properly
  const stripePromise = getStripePromise();
  
  // Configure Stripe Elements with RAADE branding
  const options = {
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#274675', // RAADE navy
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Merriweather, system-ui, sans-serif',
        borderRadius: '4px',
      },
      rules: {
        '.Label': {
          marginBottom: '8px',
          fontWeight: '500',
        },
        '.Tab': {
          padding: '10px 16px',
        }
      }
    },
    loader: 'auto' as const,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <SimpleStripeCheckout {...props} />
    </Elements>
  );
};

export default SimpleStripeProvider;
