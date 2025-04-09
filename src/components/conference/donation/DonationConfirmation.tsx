
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart } from "lucide-react";

interface DonationConfirmationProps {
  values: {
    amount: string;
    customAmount?: string;
    fullName: string;
    email: string;
    message?: string;
    makeAnonymous?: boolean;
  };
  onDonateAgain: () => void;
}

/**
 * DonationConfirmation Component
 * 
 * Success screen displayed after completing a donation:
 * - Shows confirmation message and donation details
 * - Provides option to make another donation
 * - Uses consistent styling with conference registration confirmation
 */
const DonationConfirmation = ({ values, onDonateAgain }: DonationConfirmationProps) => {
  const donationAmount = values.amount === "custom" && values.customAmount 
    ? `$${parseFloat(values.customAmount).toFixed(2)}` 
    : `$${values.amount}`;

  return (
    <div className="text-center p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-2 font-simula">Thank You for Your Donation!</h3>
      
      <p className="text-lg text-gray-600 mb-6">
        Your generous donation of <span className="font-semibold text-[#274675]">{donationAmount}</span> will help support RAADE's initiatives in African development.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
        <h4 className="font-semibold text-gray-800 mb-2">Donation Details</h4>
        <div className="space-y-2 text-gray-600">
          <p><span className="font-medium">Amount:</span> {donationAmount}</p>
          <p><span className="font-medium">Name:</span> {values.makeAnonymous ? 'Anonymous' : values.fullName}</p>
          <p><span className="font-medium">Email:</span> {values.email}</p>
          {values.message && (
            <div>
              <p className="font-medium">Message:</p>
              <p className="italic mt-1 text-gray-500">"{values.message}"</p>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-6">
        A confirmation receipt has been sent to your email address. If you have any questions, please contact us.
      </p>
      
      <Button
        onClick={onDonateAgain}
        className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
      >
        <Heart className="mr-2 h-5 w-5" />
        Make Another Donation
      </Button>
    </div>
  );
};

export default DonationConfirmation;
