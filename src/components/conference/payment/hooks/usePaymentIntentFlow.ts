
// This file is now deprecated as we've standardized on Stripe Checkout Sessions
// It remains as a placeholder to maintain import compatibility

export const usePaymentIntentFlow = () => {
  console.warn("usePaymentIntentFlow is deprecated - using Stripe Checkout Sessions instead");
  
  return {
    initiatePaymentIntent: () => {
      console.warn("Payment Intents flow is deprecated");
      return Promise.resolve();
    }
  };
};
