
import { useStripe, useElements } from "@stripe/react-stripe-js";

/**
 * Custom hook to access Stripe elements and stripe instance
 * 
 * Encapsulates access to Stripe elements and provides loading state
 * for components that need to interact with Stripe
 */
export const usePaymentElements = () => {
  const stripe = useStripe();
  const elements = useElements();
  const isElementsLoading = !stripe || !elements;

  return {
    stripe,
    elements,
    isElementsLoading
  };
};
