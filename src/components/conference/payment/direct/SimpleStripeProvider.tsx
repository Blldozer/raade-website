
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleStripeCheckout from "./SimpleStripeCheckout";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m");

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
 * - Initializes Stripe with publishable key
 * - Sets up the Stripe Elements provider
 * - Configures appearance settings for Stripe Elements
 */
const SimpleStripeProvider = (props: SimpleStripeProviderProps) => {
  const options = {
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
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <SimpleStripeCheckout {...props} />
    </Elements>
  );
};

export default SimpleStripeProvider;
