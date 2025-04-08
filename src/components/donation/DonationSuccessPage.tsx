
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { DonationFormData } from "@/types/donation";
import { Link } from "react-router-dom";

interface DonationSuccessPageProps {
  donationData: DonationFormData;
  onDonateAgain: () => void;
}

/**
 * DonationSuccessPage Component
 * 
 * Shows a thank you message and donation summary after successful payment
 * Provides options to donate again or return to home
 */
const DonationSuccessPage = ({ 
  donationData, 
  onDonateAgain 
}: DonationSuccessPageProps) => {
  const getDonationTypeName = () => {
    switch (donationData.donationType) {
      case "general": return "General Support";
      case "scholarship": return "Scholarship Fund";
      case "innovation-studios": return "Innovation Studios";
      case "conference": return "Annual Conference";
      default: return "Donation";
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-[#274675] dark:text-[#FBB03B]">
          Thank You for Your Donation!
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Your generous contribution of ${donationData.amount.toFixed(2)} to our {getDonationTypeName()} 
          will help us make a positive impact in African development.
        </p>
      </div>

      {!donationData.isAnonymous && donationData.donorEmail && (
        <div className="bg-gray-50 p-4 rounded-md dark:bg-gray-800 text-left">
          <p>
            A receipt has been sent to <strong>{donationData.donorEmail}</strong>. 
            If you have any questions about your donation, please contact us at support@raade.org.
          </p>
        </div>
      )}

      <div className="pt-4">
        <p className="font-medium text-gray-800 dark:text-gray-200">
          Would you like to make another donation?
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Button 
            onClick={onDonateAgain}
            className="bg-[#274675] hover:bg-[#274675]/90 dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/90"
          >
            Donate Again
          </Button>
          <Button 
            variant="outline"
            asChild
            className="border-[#274675] text-[#274675] hover:bg-[#274675]/10 dark:border-[#FBB03B] dark:text-[#FBB03B] dark:hover:bg-[#FBB03B]/10"
          >
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccessPage;
