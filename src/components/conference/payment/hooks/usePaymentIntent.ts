
// This file is now deprecated as we've standardized on Stripe Checkout Sessions
// It remains as a placeholder to maintain import compatibility

export const usePaymentIntent = () => {
  console.warn("usePaymentIntent is deprecated - using Stripe Checkout Sessions instead");
  
  return {
    clientSecret: "",
    isLoading: false,
    amount: 0,
    currency: "USD",
    isGroupRegistration: false,
    errorDetails: "Payment Intents flow is deprecated",
    requestId: null,
    handleRetry: () => console.warn("Payment Intents flow is deprecated")
  };
};
