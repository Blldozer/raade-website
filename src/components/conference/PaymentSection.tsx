
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import StripeCheckout from "./StripeCheckout";
import { RegistrationFormData } from "./RegistrationFormTypes";
import RegistrationSummary from "./RegistrationSummary";
import SubmissionConfirmation from "@/components/forms/SubmissionConfirmation";

interface PaymentSectionProps {
  registrationData: RegistrationFormData;
  isSubmitting: boolean;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  onBackClick: () => void;
}

const PaymentSection = ({
  registrationData,
  isSubmitting,
  onPaymentSuccess,
  onPaymentError,
  onBackClick
}: PaymentSectionProps) => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    // Delay the onPaymentSuccess callback to allow the user to see the confirmation
    setTimeout(() => {
      onPaymentSuccess();
    }, 5000); // Auto-redirect after 5 seconds
  };
  
  const paymentConfirmation = (
    <div className="text-white/80 font-lora text-left p-4 bg-[#1a1a1a] rounded-md mb-4">
      <h3 className="text-[#FBB03B] mb-2 font-simula">Payment Details:</h3>
      <p><span className="text-[#FBB03B]/80">Name:</span> {registrationData.fullName}</p>
      <p><span className="text-[#FBB03B]/80">Email:</span> {registrationData.email}</p>
      <p><span className="text-[#FBB03B]/80">Ticket Type:</span> {registrationData.ticketType}</p>
    </div>
  );
  
  if (paymentComplete) {
    return (
      <SubmissionConfirmation
        title="Payment Successful!"
        message="Thank you for registering for the RAADE Conference 2025. Your payment has been received."
        customMessage={paymentConfirmation}
        buttonText="Continue"
        icon={<CreditCard className="h-16 w-16 text-green-500" />}
        buttonAction={onPaymentSuccess}
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
