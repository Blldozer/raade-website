
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { useEmailConfirmation } from "./hooks/useEmailConfirmation";

interface SuccessfulPaymentProps {
  registrationData: RegistrationFormData;
  onContinue: () => void;
}

/**
 * SuccessfulPayment Component
 * 
 * Displays success message after payment completion and
 * triggers email confirmation to be sent to the user
 * 
 * @param registrationData - The completed registration data
 * @param onContinue - Callback for when user completes the flow
 */
const SuccessfulPayment = ({
  registrationData,
  onContinue,
}: SuccessfulPaymentProps) => {
  const { 
    sendConfirmation, 
    isLoading, 
    isSuccess, 
    errorMessage, 
    reset 
  } = useEmailConfirmation();

  // Send confirmation email when component mounts
  useEffect(() => {
    const sendEmail = async () => {
      await sendConfirmation(registrationData);
    };
    
    sendEmail();
    
    // Cleanup function
    return () => {
      reset();
    };
  }, [registrationData, sendConfirmation, reset]);

  return (
    <div className="flex flex-col items-center text-center space-y-8">
      <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Thank you for registering for our conference. Your payment has been processed successfully.
        </p>
      </div>
      
      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Sending confirmation email...</span>
        </div>
      )}
      
      {isSuccess && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300">Email Sent</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">
            A confirmation email has been sent to {registrationData.email}.
            Please check your inbox!
          </AlertDescription>
        </Alert>
      )}
      
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errorMessage}
            <div className="mt-2">
              Don't worry, your registration is still complete. You can continue.
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <Button
        onClick={onContinue}
        className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white mt-4"
      >
        Continue
      </Button>
    </div>
  );
};

export default SuccessfulPayment;
