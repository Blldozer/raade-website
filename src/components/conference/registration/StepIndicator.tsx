
/**
 * StepIndicator Component
 * 
 * Shows the current step in the registration process
 * Provides a visual indication of progress
 * 
 * @param currentStep - The current step in the registration process
 */
interface StepIndicatorProps {
  currentStep: 'registration' | 'payment';
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
        <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
          currentStep === 'registration' 
            ? 'bg-[#FBB03B] text-white' 
            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          1
        </div>
        <div className={`h-1 w-12 ${
          currentStep === 'payment' 
            ? 'bg-[#FBB03B]' 
            : 'bg-gray-200 dark:bg-gray-700'
        }`}></div>
        <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
          currentStep === 'payment' 
            ? 'bg-[#FBB03B] text-white' 
            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          2
        </div>
      </div>
      <div className="flex text-sm ml-4">
        <span className={`mr-12 ${currentStep === 'registration' ? 'font-bold text-[#FBB03B]' : ''}`}>
          Registration
        </span>
        <span className={currentStep === 'payment' ? 'font-bold text-[#FBB03B]' : ''}>
          Payment
        </span>
      </div>
    </div>
  );
};

export default StepIndicator;
