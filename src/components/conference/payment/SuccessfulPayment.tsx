
import { useEffect, useState } from "react";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { useEmailConfirmation } from "./hooks/useEmailConfirmation";
import SuccessIcon from "./components/SuccessIcon";
import SuccessTitle from "./components/SuccessTitle";
import ConfirmationCard from "./components/ConfirmationCard";
import ContinueButton from "./components/ContinueButton";

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
  const { sendEmailConfirmation, isLoading } = useEmailConfirmation();
  
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
      <SuccessIcon />
      
      <SuccessTitle isFreeRegistration={isFreeRegistration} />
      
      <ConfirmationCard 
        email={registrationData.email}
        emailSent={emailSent}
        isLoading={isLoading}
        isFreeRegistration={isFreeRegistration}
      />
      
      <ContinueButton onContinue={onContinue} />
    </div>
  );
};

export default SuccessfulPayment;
