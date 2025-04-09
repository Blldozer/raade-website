
import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * DonationConfirmation Component Props
 */
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
 * Displays a thank you message after successful donation:
 * - Shows donation amount and donor information
 * - Provides confirmation details and a reference number
 * - Includes options to donate again or return to conference
 * - Clean, modern design consistent with the RAADE branding
 */
const DonationConfirmation: React.FC<DonationConfirmationProps> = ({ 
  values, 
  onDonateAgain 
}) => {
  // Calculate the final donation amount
  const donationAmount = values.amount === "custom" && values.customAmount 
    ? `$${parseFloat(values.customAmount).toFixed(2)}` 
    : `$${values.amount}`;
  
  // Generate a random confirmation number
  const confirmationNumber = `RAADE-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-6"
    >
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <HeartHandshake className="h-10 w-10 text-green-600" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-3 font-simula">Thank You for Your Donation!</h3>
      
      <p className="text-lg text-gray-700 mb-2">
        Your donation of <span className="font-bold text-[#FBB03B]">{donationAmount}</span> will 
        make a real difference in our mission.
      </p>
      
      <div className="my-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 mb-2">
          A confirmation email has been sent to <span className="font-medium">{values.email}</span>
        </p>
        <p className="text-sm text-gray-600">
          Confirmation number: <span className="font-medium">{confirmationNumber}</span>
        </p>
      </div>
      
      <p className="text-base text-gray-700 mb-6">
        Your support helps us connect more students with African organizations to create 
        scalable solutions for pressing challenges.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={onDonateAgain}
          variant="outline" 
          className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B]/10"
        >
          Donate Again
        </Button>
        
        <Button 
          onClick={() => window.location.href = "/conference#registration"}
          className="bg-[#274675] hover:bg-[#274675]/90 text-white"
        >
          Return to Conference
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default DonationConfirmation;
