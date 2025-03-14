
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PaymentFormButtonsProps {
  isLoading: boolean;
  isDisabled: boolean;
  paymentCompleted: boolean;
}

/**
 * PaymentFormButtons Component
 * 
 * Renders form submission button with:
 * - Loading state visualization
 * - Proper disabled states based on form status
 * - Clear visual indication of the payment action
 * 
 * @param isLoading - Whether payment is being processed
 * @param isDisabled - Whether the button should be disabled
 * @param paymentCompleted - Whether payment has been completed
 */
const PaymentFormButtons: React.FC<PaymentFormButtonsProps> = ({ 
  isLoading, 
  isDisabled,
  paymentCompleted
}) => {
  return (
    <Button
      disabled={isLoading || isDisabled || paymentCompleted}
      className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white"
      type="submit"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>Complete Payment</>
      )}
    </Button>
  );
};

export default PaymentFormButtons;
