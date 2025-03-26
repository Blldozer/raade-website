
// This file is now deprecated as we've standardized on Stripe Checkout Sessions
// It remains as a placeholder to maintain import compatibility

export const usePaymentIntentState = () => {
  console.warn("usePaymentIntentState is deprecated - using Stripe Checkout Sessions instead");
  
  return {
    clientSecret: "",
    isLoading: false,
    amount: 0,
    currency: "USD",
    isGroupRegistration: false,
    errorDetails: null,
    requestId: null,
    retryCount: 0,
    
    setClientSecret: () => {},
    safeSetLoading: () => {},
    safeSetErrorDetails: () => {},
    updatePaymentState: () => {},
    handleRetry: () => {},
    resetPaymentState: () => {},
    
    isMountedRef: { current: true },
    isSuccessCalledRef: { current: false },
    activeRequestRef: { current: false }
  };
};
