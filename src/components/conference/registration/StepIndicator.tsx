
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: 'registration' | 'payment';
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
            currentStep === 'payment' ? 'bg-green-500 text-white' : 'bg-[#FBB03B] text-white'
          }`}>
            {currentStep === 'payment' ? <Check className="h-5 w-5" /> : '1'}
          </div>
          <span className="ml-2 font-lora">Registration</span>
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
          <span className="ml-2 font-lora">Payment</span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
