
import { Button } from "@/components/ui/button";
import SimpleStripeProvider from "./payment/direct/SimpleStripeProvider";
import { RegistrationFormData } from "./RegistrationFormTypes";
import RegistrationSummary from "./RegistrationSummary";
import { useState } from "react";
import SuccessfulPayment from "./payment/SuccessfulPayment";

interface PaymentSectionProps {
  registrationData: RegistrationFormData;
  isSubmitting: boolean;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  onBackClick: () => void;
  couponDiscount?: { type: 'percentage' | 'fixed'; amount: number } | null;
  totalPrice?: number;
}

/**
 * PaymentSection Component
 * 
 * Handles the payment process for conference registration:
 * - Now with support for coupon discounts
 * - Displays registration summary with discounted prices
 * - Uses our simplified direct Stripe integration
 * - Provides consistent back button functionality
 * - Shows payment confirmation screen on success
 * 
 * @param registrationData - Form data from the registration form
 * @param isSubmitting - Loading state for the form
 * @param onPaymentSuccess - Callback when payment succeeds
 * @param onPaymentError - Callback when payment fails
 * @param onBackClick - Callback to go back to the registration form
 * @param couponDiscount - Applied coupon discount information
 * @param totalPrice - Total price after discounts
 */
const PaymentSection = ({
  registrationData,
  isSubmitting,
  onPaymentSuccess,
  onPaymentError,
  onBackClick,
  couponDiscount,
  totalPrice
}: PaymentSectionProps) => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Process raw form data into a clean array of emails
  const processedGroupEmails = Array.isArray(registrationData.groupEmails) 
    ? registrationData.groupEmails
        .filter(Boolean) // Remove nullish values
        .map(email => {
          if (typeof email === 'object' && email !== null && 'value' in email) {
            return typeof email.value === 'string' ? email.value : '';
          }
          return String(email || '');
        })
        .filter(email => email.length > 0) // Remove empty strings
    : [];

  const handlePaymentSuccess = () => {
    // Show payment confirmation screen first
    setPaymentComplete(true);
  };

  if (paymentComplete) {
    return (
      <SuccessfulPayment 
        registrationData={registrationData}
        onContinue={onPaymentSuccess}
      />
    );
  }

  return (
    <div className="space-y-6">
      <RegistrationSummary 
        registrationData={registrationData} 
        couponDiscount={couponDiscount}
        totalPrice={totalPrice}
      />
      
      <SimpleStripeProvider 
        ticketType={registrationData.ticketType}
        email={registrationData.email}
        fullName={registrationData.fullName}
        groupSize={registrationData.groupSize}
        groupEmails={processedGroupEmails}
        organization={registrationData.organization}
        role={registrationData.role}
        specialRequests={registrationData.specialRequests}
        referralSource={registrationData.referralSource}
        couponCode={registrationData.couponCode}
        couponDiscount={couponDiscount}
        onSuccess={handlePaymentSuccess}
        onError={onPaymentError}
      />
      
      <Button 
        variant="outline" 
        onClick={onBackClick}
        className="w-full border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora
          dark:border-[#FBB03B] dark:text-[#FBB03B] dark:hover:bg-[#FBB03B] dark:hover:text-white
          transition-colors duration-300"
        disabled={isSubmitting}
      >
        Back to Registration Form
      </Button>
    </div>
  );
};

export default PaymentSection;
