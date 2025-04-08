
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DonationButtonProps {
  isSubmitting: boolean;
  selectedAmount: number | null;
}

/**
 * DonationButton Component
 * 
 * Renders the donation submit button with:
 * - Loading state during submission
 * - Dynamic label showing the selected amount
 * - Informational text about secure payment
 * 
 * @param isSubmitting - Whether the form is currently submitting
 * @param selectedAmount - The currently selected donation amount
 */
const DonationButton = ({ isSubmitting, selectedAmount }: DonationButtonProps) => {
  return (
    <div className="mt-auto pt-6">
      <Button
        type="submit"
        className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white shadow-sm"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          <>Donate ${selectedAmount || 0}</>
        )}
      </Button>
      <p className="mt-2 text-xs text-gray-500 text-center">
        Your donation is secure. You'll be redirected to Stripe to complete your payment.
      </p>
    </div>
  );
};

export default DonationButton;
