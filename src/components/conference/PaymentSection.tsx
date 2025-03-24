
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
 * - Fixed CORS issues with Stripe Checkout
 * - Improved dark mode support for mobile devices
 * - Enhanced error handling and recovery
 * - Consistent colors that properly invert in dark mode
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
  // Process raw form data into a clean array of emails for Stripe checkout
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

  return (
    <div className="space-y-6">
      <RegistrationSummary registrationData={registrationData} />
      
      <StripeCheckout 
        ticketType={registrationData.ticketType}
        email={registrationData.email}
        fullName={registrationData.fullName}
        groupSize={registrationData.groupSize}
        groupEmails={processedGroupEmails}
        organization={registrationData.organization}
        role={registrationData.role}
        specialRequests={registrationData.specialRequests}
        onSuccess={onPaymentSuccess}
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
