
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Heart } from "lucide-react";

interface DonationFormSubmitProps {
  isSubmitting: boolean;
  donationAmount: string;
}

/**
 * DonationFormSubmit Component
 * 
 * Renders the donation submit button with:
 * - Dynamic donation amount display
 * - Loading state during submission
 * - Clear visual feedback
 */
const DonationFormSubmit: React.FC<DonationFormSubmitProps> = ({
  isSubmitting,
  donationAmount,
}) => {
  return (
    <>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Heart className="mr-2 h-4 w-4" />
            Donate {donationAmount} Now
          </>
        )}
      </Button>
      
      <p className="text-xs text-gray-500 text-center">
        Your donation helps support RAADE's work in pioneering innovative approaches to 
        African development. Tax receipts will be provided for eligible donations.
      </p>
    </>
  );
};

export default DonationFormSubmit;
