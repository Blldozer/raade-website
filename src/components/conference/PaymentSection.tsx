
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RegistrationFormData, getFullName } from "./RegistrationFormTypes";
import StripeContainer from "./payment/direct/StripeContainer";
import RegistrationSummary from "./RegistrationSummary";
import { Loader2, ArrowLeftIcon, PartyPopper } from "lucide-react";
import { useEffect } from "react";

interface PaymentSectionProps {
  registrationData: RegistrationFormData;
  isSubmitting: boolean;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  onBackClick: () => void;
  couponDiscount?: { type: 'percentage' | 'fixed'; amount: number } | null;
  totalPrice: number;
  isFullDiscount?: boolean;
  onFreeRegistration?: () => void;
}

// A helper component for the free registration case
const FreeRegistrationConfirmation = ({ 
  onConfirm, 
  isSubmitting 
}: { 
  onConfirm: () => void;
  isSubmitting: boolean;
}) => {
  return (
    <Card className="border-green-200 bg-green-50 shadow-md dark:bg-green-900/20 dark:border-green-800 mt-8">
      <CardContent className="p-6">
        <div className="flex items-center mb-4 text-green-600 dark:text-green-400">
          <PartyPopper className="h-6 w-6 mr-2" />
          <h3 className="text-xl font-bold">Free Registration Confirmed!</h3>
        </div>
        
        <p className="mb-6 text-green-700 dark:text-green-300">
          You're eligible for a free conference registration! Click the button below to complete your registration.
        </p>
        
        <Button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Complete Free Registration'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

/**
 * PaymentSection Component
 * 
 * Displays the payment section of the registration form:
 * - Shows a summary of the registration information
 * - Renders the Stripe payment form if payment is required
 * - Shows free registration confirmation for 100% off coupons
 * - Back button to return to edit registration details
 */
const PaymentSection = ({
  registrationData,
  isSubmitting,
  onPaymentSuccess,
  onPaymentError,
  onBackClick,
  couponDiscount,
  totalPrice,
  isFullDiscount = false,
  onFreeRegistration
}: PaymentSectionProps) => {
  
  useEffect(() => {
    // Scroll to top when component mounts for better UX
    window.scrollTo(0, 0);
  }, []);
  
  // Create the full name from first and last name
  const fullName = getFullName(registrationData.firstName, registrationData.lastName);
  
  return (
    <div className="space-y-8">
      <Button 
        variant="ghost" 
        onClick={onBackClick}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        disabled={isSubmitting}
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to registration
      </Button>
      
      <RegistrationSummary 
        registrationData={registrationData} 
        couponDiscount={couponDiscount}
        totalPrice={totalPrice}
      />
      
      {isFullDiscount && onFreeRegistration ? (
        <FreeRegistrationConfirmation 
          onConfirm={onFreeRegistration}
          isSubmitting={isSubmitting} 
        />
      ) : (
        <Card className="border-gray-200 shadow-md dark:border-gray-700 mt-6">
          <CardContent className="p-6">
            <StripeContainer
              ticketType={registrationData.ticketType}
              email={registrationData.email}
              firstName={registrationData.firstName}
              lastName={registrationData.lastName}
              groupSize={registrationData.groupSize}
              groupEmails={registrationData.groupEmails}
              organization={registrationData.organization}
              role={registrationData.role}
              specialRequests={registrationData.specialRequests}
              referralSource={registrationData.referralSource}
              couponCode={registrationData.couponCode}
              couponDiscount={couponDiscount}
              onSuccess={onPaymentSuccess}
              onError={onPaymentError}
            />
          </CardContent>
        </Card>
      )}
      
      {/* Add hidden element to store couponCode for stripe */}
      {registrationData.couponCode && (
        <div id="coupon-code-value" data-value={registrationData.couponCode} style={{ display: 'none' }}></div>
      )}
    </div>
  );
};

export default PaymentSection;
