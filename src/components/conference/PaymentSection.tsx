
import { Button } from "@/components/ui/button";
import SimpleStripeProvider from "./payment/direct/SimpleStripeProvider";
import { RegistrationFormData } from "./RegistrationFormTypes";
import RegistrationSummary from "./RegistrationSummary";
import { useState, useEffect } from "react";
import SuccessfulPayment from "./payment/SuccessfulPayment";
import { validateCouponCode, incrementCouponUsage } from "./payment/services/couponService";
import { useToast } from "@/hooks/use-toast";

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
 * - Validates coupon codes and applies discounts
 * - Uses our simplified direct Stripe integration
 * - Provides consistent back button functionality
 * - Shows payment confirmation screen on success
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
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const { toast } = useToast();
  
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

  useEffect(() => {
    // Validate coupon code if provided
    const validateCouponIfProvided = async () => {
      if (registrationData.couponCode && registrationData.couponCode.trim() !== "") {
        setIsValidatingCoupon(true);
        try {
          const result = await validateCouponCode(registrationData.couponCode);
          setIsCouponValid(result.isValid);
          setCouponDiscount(result.isValid ? result.discountAmount || 0 : 0);
          
          if (!result.isValid) {
            toast({
              title: "Invalid coupon",
              description: result.message || "The coupon code you entered is invalid.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error validating coupon:", error);
          setIsCouponValid(false);
          setCouponDiscount(0);
        } finally {
          setIsValidatingCoupon(false);
        }
      }
    };
    
    validateCouponIfProvided();
  }, [registrationData.couponCode, toast]);

  const handlePaymentSuccess = async () => {
    // If a valid coupon was used, increment its usage
    if (isCouponValid && registrationData.couponCode) {
      try {
        await incrementCouponUsage(registrationData.couponCode);
      } catch (error) {
        console.error("Error incrementing coupon usage:", error);
        // Continue with success flow even if tracking failed
      }
    }
    
    // Show payment confirmation screen
    setPaymentComplete(true);
  };

  // For 100% discount coupons, we bypass Stripe completely
  const handleFreeRegistration = async () => {
    try {
      if (registrationData.couponCode) {
        await incrementCouponUsage(registrationData.couponCode);
      }
      
      // Show payment confirmation screen
      setPaymentComplete(true);
    } catch (error) {
      console.error("Error processing free registration:", error);
      onPaymentError("Failed to process your registration. Please try again.");
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

  // If coupon provides 100% discount, show free registration option
  if (isCouponValid && couponDiscount === 100) {
    return (
      <div className="space-y-6">
        <RegistrationSummary registrationData={registrationData} couponDiscount={couponDiscount} />
        
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
            Free Registration Available!
          </h3>
          <p className="text-green-700 dark:text-green-400 mb-4">
            Your coupon code provides a 100% discount. You can complete your registration without payment.
          </p>
          
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handleFreeRegistration}
            disabled={isSubmitting}
          >
            Complete Free Registration
          </Button>
        </div>
        
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
  }
  
  return (
    <div className="space-y-6">
      <RegistrationSummary 
        registrationData={registrationData} 
        couponDiscount={isCouponValid ? couponDiscount : 0} 
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
        couponCode={isCouponValid ? registrationData.couponCode : undefined}
        couponDiscount={isCouponValid ? couponDiscount : 0}
        onSuccess={handlePaymentSuccess}
        onError={onPaymentError}
      />
      
      <Button 
        variant="outline" 
        onClick={onBackClick}
        className="w-full border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora
          dark:border-[#FBB03B] dark:text-[#FBB03B] dark:hover:bg-[#FBB03B] dark:hover:text-white
          transition-colors duration-300"
        disabled={isSubmitting || isValidatingCoupon}
      >
        Back to Registration Form
      </Button>
    </div>
  );
};

export default PaymentSection;
