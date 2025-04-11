import { Check } from "lucide-react";

interface DonationStepIndicatorProps {
  currentStep: 'information' | 'payment';
}

/**
 * DonationStepIndicator Component
 * 
 * Visual indicator for the donation process steps:
 * - Shows current step in the donation process
 * - Marks completed steps with a checkmark
 * - Maintains consistent styling with conference registration
 */
const DonationStepIndicator = ({ currentStep }: DonationStepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
            currentStep === 'payment' ? 'bg-green-500 text-white' : 'bg-[#FBB03B] text-white'
          }`}>
            {currentStep === 'payment' ? <Check className="h-5 w-5" /> : '1'}
          </div>
          <span className="ml-2 font-simula text-raade-navy">Information</span>
        </div>
        <div className={`h-px w-12 mx-4 ${
          currentStep === 'payment' ? 'bg-green-500' : 'bg-gray-300'
        }`} />
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
            currentStep === 'payment' ? 'bg-[#FBB03B] text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            2
          </div>
          <span className="ml-2 font-simula text-raade-navy">Payment</span>
        </div>
      </div>
    </div>
  );
};

export default DonationStepIndicator;
