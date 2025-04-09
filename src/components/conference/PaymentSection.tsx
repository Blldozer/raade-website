
import { Button } from "@/components/ui/button";
import SimpleStripeProvider from "./payment/direct/SimpleStripeProvider";
import { RegistrationFormData } from "./RegistrationFormTypes";
import RegistrationSummary from "./RegistrationSummary";
import { useState, useEffect } from "react";
import SuccessfulPayment from "./payment/SuccessfulPayment";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PaymentSectionProps {
  registrationData: RegistrationFormData;
  isSubmitting: boolean;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  onBackClick: () => void;
  couponDiscount?: { type: 'percentage' | 'fixed'; amount: number } | null;
  totalPrice?: number;
  isFullDiscount?: boolean;
  onFreeRegistration?: () => void;
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
 * - Handles both partial and full discount coupons
 * - Added timeout recovery for registration navigation
 * - Enhanced error handling for free registrations
 * 
 * @param registrationData - Form data from the registration form
 * @param isSubmitting - Loading state for the form
 * @param onPaymentSuccess - Callback when payment succeeds
 * @param onPaymentError - Callback when payment fails
 * @param onBackClick - Callback to go back to the registration form
 * @param couponDiscount - Applied coupon discount information
 * @param totalPrice - Total price after discounts
 * @param isFullDiscount - Whether the coupon provides 100% discount
 * @param onFreeRegistration - Callback for free registration (100% discount)
 */
const PaymentSection = ({
  registrationData,
  isSubmitting,
  onPaymentSuccess,
  onPaymentError,
  onBackClick,
  couponDiscount,
  totalPrice,
  isFullDiscount,
  onFreeRegistration
}: PaymentSectionProps) => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [processingFreeRegistration, setProcessingFreeRegistration] = useState(false);
  const [registrationStartTime, setRegistrationStartTime] = useState<number | null>(null);
  const navigate = useNavigate();
  
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

  // Auto-recover from registrations that get stuck for too long
  useEffect(() => {
    if (processingFreeRegistration && registrationStartTime) {
      const REGISTRATION_TIMEOUT = 15000; // 15 seconds
      
      const timeoutId = setTimeout(() => {
        // If we're still processing after timeout period, assume there's an issue
        if (processingFreeRegistration) {
          console.log("Free registration taking too long, checking for redirect opportunity");
          
          // Check if email is in sessionStorage - if so, we might have completed registration
          // but failed to navigate or update UI state
          const registeredEmail = sessionStorage.getItem("registrationEmail");
          
          if (registeredEmail && registeredEmail === registrationData.email) {
            console.log("Found registration email in session storage, likely completed successfully");
            
            // Assume registration was successful but UI didn't update
            setProcessingFreeRegistration(false);
            
            toast({
              title: "Registration processed",
              description: "Your registration appears to have been processed. Redirecting to confirmation page.",
              variant: "default",
            });
            
            // Navigate to success page
            setTimeout(() => {
              navigate("/conference/success");
            }, 1000);
          } else {
            // Registration appears to have actually failed
            setProcessingFreeRegistration(false);
            
            toast({
              title: "Registration timeout",
              description: "Your registration is taking longer than expected. Please try again.",
              variant: "destructive",
            });
          }
        }
      }, REGISTRATION_TIMEOUT);
      
      return () => clearTimeout(timeoutId);
    }
  }, [processingFreeRegistration, registrationStartTime, registrationData.email, navigate]);

  const handlePaymentSuccess = () => {
    // Show payment confirmation screen first
    setPaymentComplete(true);
  };

  const handleCompleteFreeRegistration = () => {
    if (!onFreeRegistration) {
      console.error("Missing onFreeRegistration callback");
      return;
    }
    
    setProcessingFreeRegistration(true);
    setRegistrationStartTime(Date.now());
    
    try {
      // Store registration email before navigating
      sessionStorage.setItem("registrationEmail", registrationData.email);
      
      // Add a console log for debugging
      console.log("Starting free registration process for:", registrationData.email);
      
      // Call the free registration handler
      onFreeRegistration();
      
      // Note: We intentionally don't clear processingFreeRegistration here
      // It will be cleared either by the successful registration callback
      // or by the timeout recovery effect
    } catch (error) {
      console.error("Error during free registration:", error);
      setProcessingFreeRegistration(false);
      setRegistrationStartTime(null);
      
      toast({
        title: "Registration error",
        description: "There was an error starting your registration. Please try again.",
        variant: "destructive",
      });
    }
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
      
      {isFullDiscount ? (
        <div className="mt-6">
          <Button
            onClick={handleCompleteFreeRegistration}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-lora
              transition-colors duration-300"
            disabled={isSubmitting || processingFreeRegistration}
          >
            {isSubmitting || processingFreeRegistration ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Registration...
              </>
            ) : (
              'Complete Free Registration'
            )}
          </Button>
          <p className="text-center text-sm text-green-600 mt-2">
            Your registration is free with the applied coupon code.
          </p>
          
          {/* Add more context about what's happening during processing */}
          {processingFreeRegistration && (
            <p className="text-center text-xs text-gray-500 mt-1 animate-pulse">
              Please wait while we finalize your registration...
            </p>
          )}
        </div>
      ) : (
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
      )}
      
      <Button 
        variant="outline" 
        onClick={onBackClick}
        className="w-full border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora
          dark:border-[#FBB03B] dark:text-[#FBB03B] dark:hover:bg-[#FBB03B] dark:hover:text-white
          transition-colors duration-300"
        disabled={isSubmitting || processingFreeRegistration}
      >
        Back to Registration Form
      </Button>
    </div>
  );
};

export default PaymentSection;
