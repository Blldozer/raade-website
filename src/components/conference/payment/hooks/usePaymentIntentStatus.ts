
import { useCallback } from "react";

/**
 * Custom hook to handle payment intent status outcomes
 * 
 * Provides callbacks for different payment status outcomes
 * Ensures consistent handling of payment status across the app
 * 
 * @param onSuccess - Callback when payment succeeds
 * @param onProcessing - Callback when payment is processing
 * @param onFailure - Callback when payment fails
 * @param successCalledRef - Reference to track if success callback was called
 */
export const usePaymentIntentStatus = (
  onSuccess: () => void,
  onProcessing: () => void,
  onFailure: (message: string) => void,
  successCalledRef: React.MutableRefObject<boolean>
) => {
  
  /**
   * Handle payment intent status
   * 
   * @param status - Payment intent status from Stripe
   * @returns void
   */
  const handlePaymentStatus = useCallback((status: string | undefined) => {
    switch (status) {
      case "succeeded":
        if (!successCalledRef.current) {
          successCalledRef.current = true;
          onSuccess();
        }
        break;
      case "processing":
        onProcessing();
        break;
      case "requires_payment_method":
        onFailure("Your payment was not successful, please try again.");
        break;
      default:
        onFailure("Something went wrong.");
        break;
    }
  }, [onSuccess, onProcessing, onFailure, successCalledRef]);

  return { handlePaymentStatus };
};
