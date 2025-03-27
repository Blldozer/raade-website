
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface StripeCheckoutButtonProps {
  isLoading: boolean;
  onCheckout: () => void;
}

/**
 * StripeCheckoutButton Component
 * 
 * Renders the checkout button with appropriate loading state:
 * - Shows a spinner animation during processing
 * - Disables button during checkout to prevent duplicate submissions
 * - Uses RAADE branding colors
 */
const StripeCheckoutButton = ({ isLoading, onCheckout }: StripeCheckoutButtonProps) => {
  return (
    <div className="mt-6">
      <Button
        onClick={onCheckout}
        disabled={isLoading}
        className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora
          dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
          transition-colors duration-300"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Preparing Checkout...
          </>
        ) : (
          <>Proceed to Checkout</>
        )}
      </Button>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        You'll be redirected to Stripe's secure payment page
      </p>
    </div>
  );
};

export default StripeCheckoutButton;
