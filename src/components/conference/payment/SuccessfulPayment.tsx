
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { useEmailConfirmation } from "./hooks/useEmailConfirmation";
import { useEffect, useState } from "react";

interface SuccessfulPaymentProps {
  registrationData: RegistrationFormData;
  onContinue: () => void;
  isFreeRegistration?: boolean;
}

/**
 * SuccessfulPayment Component
 * 
 * Displays a success message after payment is complete:
 * - Shows confirmation details
 * - Sends email confirmation automatically
 * - Provides a button to return to the conference page
 * - Handles both paid and free registrations
 */
const SuccessfulPayment = ({ 
  registrationData, 
  onContinue,
  isFreeRegistration = false
}: SuccessfulPaymentProps) => {
  const [emailSent, setEmailSent] = useState(false);
  const { sendEmailConfirmation, isLoading, emailSent: hookEmailSent } = useEmailConfirmation();
  
  // Send email confirmation when component mounts
  useEffect(() => {
    const sendEmail = async () => {
      try {
        await sendEmailConfirmation(
          registrationData.email,
          registrationData.fullName,
          registrationData.ticketType
        );
        setEmailSent(true);
      } catch (error) {
        console.error("Failed to send confirmation email:", error);
        // Continue even if email fails
        setEmailSent(false);
      }
    };
    
    sendEmail();
  }, [registrationData, sendEmailConfirmation]);
  
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full inline-flex">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {isFreeRegistration ? "Registration Complete" : "Payment Successful"}
      </h3>
      
      <Card className="p-4 bg-gray-50 dark:bg-gray-800 text-left">
        <p className="text-gray-700 dark:text-gray-200 mb-2">
          Thank you for registering for the RAADE African Development Conference 2025!
        </p>
        
        <p className="text-gray-700 dark:text-gray-200 mb-2">
          {isFreeRegistration
            ? "Your complimentary registration has been processed successfully."
            : "Your payment has been processed and your registration is confirmed."}
        </p>
        
        <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Registration details have been sent to: <span className="font-medium">{registrationData.email}</span>
          </p>
          {!emailSent && !isLoading && (
            <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
              Note: We couldn't send a confirmation email. Please keep your reference information.
            </p>
          )}
        </div>
      </Card>
      
      <Button 
        onClick={onContinue}
        className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora
          dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
          transition-colors duration-300"
      >
        Return to Conference
      </Button>
    </div>
  );
};

export default SuccessfulPayment;
