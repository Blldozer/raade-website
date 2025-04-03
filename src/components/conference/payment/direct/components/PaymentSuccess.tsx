
import React from "react";
import { Button } from "@/components/ui/button";

interface PaymentSuccessProps {
  onContinue: () => void;
}

/**
 * PaymentSuccess Component
 * 
 * Displays a success message after payment:
 * - Confirmation message
 * - Success icon
 * - Continue button
 * 
 * @param onContinue - Callback function when user clicks continue
 */
const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onContinue }) => {
  return (
    <div className="w-full rounded-lg bg-green-50 dark:bg-green-900/20 p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-700/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Payment Successful!</h3>
      <p className="text-green-700 dark:text-green-400 mb-4">Your registration is complete.</p>
      <Button 
        onClick={onContinue}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        Continue
      </Button>
    </div>
  );
};

export default PaymentSuccess;
