
import { Button } from "@/components/ui/button";
import SimpleStripeProvider from "./payment/direct/SimpleStripeProvider";
import { RegistrationFormData, calculateTotalPrice, CouponData } from "./RegistrationFormTypes";
import RegistrationSummary from "./RegistrationSummary";
import { useState } from "react";
import SuccessfulPayment from "./payment/SuccessfulPayment";
import { useRegistrationStorage } from "./payment/direct/hooks/useRegistrationStorage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentSectionProps {
  registrationData: RegistrationFormData;
  couponData?: CouponData | null;
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
 * - Handles free registration with coupon codes
 * - Uses our simplified direct Stripe integration
 * - Provides consistent back button functionality
 * - Shows payment confirmation screen on success
 * 
 * @param registrationData - Form data from the registration form
 * @param couponData - Applied coupon code data (if any)
 * @param isSubmitting - Loading state for the form
 * @param onPaymentSuccess - Callback when payment succeeds
 * @param onPaymentError - Callback when payment fails
 * @param onBackClick - Callback to go back to the registration form
 */
const PaymentSection = ({
  registrationData,
  couponData,
  isSubmitting,
  onPaymentSuccess,
  onPaymentError,
  onBackClick
}: PaymentSectionProps) => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [processingFreeRegistration, setProcessingFreeRegistration] = useState(false);
  const { storeRegistrationData } = useRegistrationStorage();
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

  // Check if this is a free registration (100% discount)
  const isFreeRegistration = couponData?.discount_type === 'full' || 
    calculateTotalPrice(registrationData.ticketType, registrationData.groupSize, couponData) === 0;

  const handlePaymentSuccess = () => {
    // Show payment confirmation screen first
    setPaymentComplete(true);
  };

  // Handle free registration without Stripe
  const handleFreeRegistration = async () => {
    setProcessingFreeRegistration(true);
    
    try {
      // Store the registration data directly without payment
      const success = await storeRegistrationData({
        fullName: registrationData.fullName,
        email: registrationData.email,
        organization: registrationData.organization || "",
        role: registrationData.role || "",
        ticketType: registrationData.ticketType,
        specialRequests: registrationData.specialRequests || "",
        referralSource: registrationData.referralSource || "",
        groupSize: registrationData.groupSize,
        groupEmails: processedGroupEmails,
        paymentComplete: true,
        couponCode: couponData?.code || "",
        // Mark payment method as coupon instead of stripe
        paymentMethod: "coupon"
      });
      
      if (success) {
        // Show success message
        toast({
          title: "Registration Complete",
          description: "Your free registration has been processed successfully!",
          variant: "default",
        });
        
        // Proceed to confirmation screen
        setPaymentComplete(true);
      } else {
        throw new Error("Failed to store registration data");
      }
    } catch (error) {
      console.error("Free registration error:", error);
      
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
      
      onPaymentError("Failed to process free registration. Please try again later.");
    } finally {
      setProcessingFreeRegistration(false);
    }
  };

  if (paymentComplete) {
    return (
      <SuccessfulPayment 
        registrationData={registrationData}
        onContinue={onPaymentSuccess}
        isFreeRegistration={isFreeRegistration}
      />
    );
  }

  return (
    <div className="space-y-6">
      <RegistrationSummary 
        registrationData={registrationData} 
        couponData={couponData}
      />
      
      {isFreeRegistration ? (
        // For free registration (100% discount)
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md text-center">
            <h3 className="text-lg font-medium text-green-800 dark:text-green-300">Free Registration</h3>
            <p className="text-green-700 dark:text-green-400">
              Your coupon code provides 100% discount. No payment is required.
            </p>
          </div>
          
          <Button 
            onClick={handleFreeRegistration}
            disabled={processingFreeRegistration}
            className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora 
              dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
              transition-colors duration-300"
          >
            {processingFreeRegistration ? (
              <>Processing...</>
            ) : (
              <>Complete Free Registration</>
            )}
          </Button>
        </div>
      ) : (
        // For paid registration
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
          couponCode={couponData?.code}
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
