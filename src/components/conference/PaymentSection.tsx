
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import StripeCheckout from "./StripeCheckout";
import { RegistrationFormData } from "./RegistrationFormTypes";
import RegistrationSummary from "./RegistrationSummary";

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
  return (
    <div className="space-y-6">
      <RegistrationSummary registrationData={registrationData} />
      
      <StripeCheckout 
        ticketType={registrationData.ticketType}
        email={registrationData.email}
        fullName={registrationData.fullName}
        onSuccess={onPaymentSuccess}
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
