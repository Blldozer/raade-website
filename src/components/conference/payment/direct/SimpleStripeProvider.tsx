
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SimpleStripeCheckout from "./SimpleStripeCheckout";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m");

interface SimpleStripeProviderProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: string[];
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  couponCode?: string;
  couponDiscount?: { type: 'percentage' | 'fixed'; amount: number } | null;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * SimpleStripeProvider Component
 * 
 * A provider component that wraps the SimpleStripeCheckout component with Stripe Elements
 * Initializes Stripe with the publishable key and provides a consistent appearance
 * Now passes through coupon information for proper discount handling
 * 
 * @param props - All props needed for payment processing
 */
const SimpleStripeProvider = (props: SimpleStripeProviderProps) => {
  const [initialized, setInitialized] = useState(false);

  // Element appearance configuration
  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#FBB03B',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '4px'
    }
  };

  const options = {
    appearance,
    locale: 'auto' as const
  };

  // Indicate when Stripe has loaded
  useEffect(() => {
    if (stripePromise) {
      setInitialized(true);
    }
  }, []);

  if (!initialized) {
    return <div>Loading payment system...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <SimpleStripeCheckout 
        ticketType={props.ticketType}
        email={props.email}
        fullName={props.fullName}
        groupSize={props.groupSize}
        groupEmails={props.groupEmails}
        organization={props.organization}
        role={props.role}
        specialRequests={props.specialRequests}
        referralSource={props.referralSource}
        couponCode={props.couponCode}
        couponDiscount={props.couponDiscount}
        onSuccess={props.onSuccess}
        onError={props.onError}
      />
    </Elements>
  );
};

export default SimpleStripeProvider;
