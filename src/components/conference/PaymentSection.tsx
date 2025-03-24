
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

/**
 * PaymentSection Component
 * 
 * Handles the payment process for conference registration:
 * - Displays registration summary
 * - Initializes Stripe Checkout flow
 * - Provides back button to return to form
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
  return (
    <div className="space-y-6">
      <RegistrationSummary registrationData={registrationData} />
      
      <StripeCheckout 
        ticketType={registrationData.ticketType}
        email={registrationData.email}
        fullName={registrationData.fullName}
        groupSize={registrationData.groupSize}
        groupEmails={registrationData.groupEmails}
        organization={registrationData.organization}
        role={registrationData.role}
        specialRequests={registrationData.specialRequests}
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
