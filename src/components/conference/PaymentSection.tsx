
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StripeCheckout from "./StripeCheckout";
import { RegistrationFormData } from "./RegistrationFormTypes";
import RegistrationSummary from "./RegistrationSummary";
import PaymentConfirmation from "./payment/PaymentConfirmation";
import { useEmailConfirmation } from "./payment/EmailConfirmationSender";

interface PaymentSectionProps {
  registrationData: RegistrationFormData;
  isSubmitting: boolean;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  onBackClick: () => void;
}

/**
 * PaymentSection Component
 * 
 * Handles the payment process for conference registration:
 * - Displays registration summary
 * - Initializes Stripe payment flow
 * - Sends confirmation email after successful payment
 * - Provides feedback to the user throughout the process
 * 
 * @param registrationData - Form data from the registration form
 * @param isSubmitting - Loading state for the form
 * @param onPaymentSuccess - Callback when payment succeeds
 * @param onPaymentError - Callback when payment fails
 * @param onBackClick - Callback to go back to the registration form
 */
const PaymentSection = ({
  registrationData,
  isSubmitting,
  onPaymentSuccess,
  onPaymentError,
  onBackClick
}: PaymentSectionProps) => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Handle email confirmation with custom hook
  const { sendingEmail, sendConfirmationEmail } = useEmailConfirmation(
    registrationData,
    onPaymentSuccess
  );
  
  const handlePaymentSuccess = async () => {
    setPaymentComplete(true);
    // Send confirmation email
    sendConfirmationEmail();
  };
  
  if (paymentComplete) {
    return (
      <PaymentConfirmation 
        registrationData={registrationData}
        sendingEmail={sendingEmail}
        onSuccess={onPaymentSuccess}
      />
    );
  }

  return (
    <div className="space-y-6">
      <RegistrationSummary registrationData={registrationData} />
      
      <StripeCheckout 
        ticketType={registrationData.ticketType}
        email={registrationData.email}
        fullName={registrationData.fullName}
        onSuccess={handlePaymentSuccess}
        onError={onPaymentError}
        groupSize={registrationData.groupSize}
      />
      
      <Button 
        variant="outline" 
        onClick={onBackClick}
        className="w-full border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
        disabled={isSubmitting}
      >
        Back to Registration Form
      </Button>
    </div>
  );
};

export default PaymentSection;
