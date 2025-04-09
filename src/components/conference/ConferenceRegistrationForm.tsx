
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form"; // Import Form from shadcn/ui
import RegistrationFormFields from "./RegistrationFormFields";
import PaymentSection from "./PaymentSection";
import StepIndicator from "./registration/StepIndicator";
import { useRegistrationForm } from "./registration/useRegistrationForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { calculateDiscountedPrice, calculateTotalPrice } from "./RegistrationFormTypes";
import { clearExistingSessionData, detectBackNavigation, getSessionDiagnostics } from "./payment/services/sessionManagement";

/**
 * ConferenceRegistrationForm Component
 * 
 * Displays the main registration form for the conference:
 * - Now with support for coupon codes including 100% off coupons
 * - Skips payment flow for free registrations (100% discount)
 * - Enhanced session management and cleanup
 * - Better error recovery after payment failures
 * - Improved user experience with clear status messages
 * - Added payment confirmation screen for better UX
 */
const ConferenceRegistrationForm = () => {
  const {
    form,
    isSubmitting,
    showPayment,
    registrationData,
    handleEmailValidation,
    handleInitialSubmit,
    setShowPayment,
    resetForm,
    watchTicketType,
    couponCode,
    couponDiscount,
    isFullDiscount,
    setCouponCode,
    setCouponDiscount,
    setIsFullDiscount
  } = useRegistrationForm();

  const { toast } = useToast();

  // When ticket type changes, ensure any checkout sessions are cleared
  useEffect(() => {
    // This watches for ticket type changes and cleans up any stale sessions
    if (sessionStorage.getItem("checkoutSessionId")) {
      console.log("Ticket type changed or form mounted, cleaning checkout session");
      clearExistingSessionData();
    }
  }, [watchTicketType]);

  // Check for back navigation and session cleanup
  useEffect(() => {
    const checkForExistingSession = () => {
      // Check if the user navigated back from Stripe
      const isBackNavigation = detectBackNavigation();
      
      // Get the checkout session ID from storage
      const sessionId = sessionStorage.getItem("checkoutSessionId");
      
      // Log diagnostics for debugging
      console.log("Registration form mounted, session state:", getSessionDiagnostics());
      
      // If there's a checkout session or we detect back navigation, clean up
      if (sessionId || isBackNavigation) {
        console.log("Found existing checkout session or back navigation, cleaning up");
        clearExistingSessionData();
        
        // If we're showing payment, reset the form to start fresh
        if (showPayment) {
          // Use unique ID to prevent duplicate notifications
          toast({
            id: "session-reset",
            title: "Session Reset",
            description: "Your previous checkout session has been cleared. You can try again with a fresh session.",
            variant: "default",
          });
          resetForm();
        }
      }
    };
    
    // Run check on mount
    checkForExistingSession();
    
    // Listen for storage events in case it changes in another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "checkoutSessionId" && !e.newValue) {
        checkForExistingSession();
      }
    };
    
    // Set up event listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) checkForExistingSession();
    });
    
    // Clean up listeners on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("pageshow", (e) => {
        if (e.persisted) checkForExistingSession();
      });
    };
  }, [showPayment, resetForm, toast]);
  
  const handlePaymentSuccess = () => {
    form.reset();
    setShowPayment(false);
  };

  const handlePaymentError = (errorMessage: string) => {
    // Log error details for debugging
    console.error("Payment error:", errorMessage);
    
    // Generate consistent ID for this specific error to prevent duplicates
    const errorId = `payment-error-${errorMessage.substring(0, 20)}`;
    
    // If we get a critical error, reset form and go back to registration
    if (errorMessage.includes("Edge Function") || 
        errorMessage.includes("Payment service") ||
        errorMessage.includes("Bad Request") ||
        errorMessage.includes("No response")) {
      // Clear any session data
      clearExistingSessionData();
      
      console.log("Critical payment error, resetting form");
      resetForm();
      setShowPayment(false);
      
      toast({
        id: "payment-system-error",
        title: "Payment system error",
        description: "We're experiencing technical difficulties with our payment system. Please try again in a few moments.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      id: errorId, // Use consistent ID to prevent duplicates
      title: "Payment failed",
      description: errorMessage || "There was an error processing your payment. Please try again.",
      variant: "destructive",
    });
  };

  // Calculate the total price with discount applied
  const getTotalPrice = () => {
    if (!registrationData) return 0;
    
    const originalPrice = calculateTotalPrice(
      registrationData.ticketType, 
      registrationData.ticketType === "student-group" ? registrationData.groupSize : undefined
    );
    
    return calculateDiscountedPrice(originalPrice, couponDiscount);
  };

  return (
    <Card className="shadow-lg border-[#FBB03B]/10 dark:border-[#FBB03B]/20 dark:bg-gray-900 transition-colors duration-200">
      <CardHeader>
        <CardTitle className="text-2xl font-simula text-gray-900 dark:text-white">Registration Details</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">Please fill out the form below to register for the conference.</CardDescription>
      </CardHeader>
      <CardContent className="text-gray-700 dark:text-gray-200">
        <StepIndicator currentStep={showPayment ? 'payment' : 'registration'} />
        
        {!showPayment ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleInitialSubmit)} className="space-y-6">
              <RegistrationFormFields 
                register={form.register}
                errors={form.formState.errors}
                setValue={form.setValue}
                watch={form.watch}
                control={form.control}
                onEmailValidation={handleEmailValidation}
                setCouponCode={setCouponCode}
                setCouponDiscount={setCouponDiscount}
                setIsFullDiscount={setIsFullDiscount}
                couponDiscount={couponDiscount}
              />
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora 
                  dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
                  transition-colors duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  isFullDiscount ? 'Complete Free Registration' : 'Continue to Payment'
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <PaymentSection 
            registrationData={registrationData!}
            isSubmitting={isSubmitting}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            onBackClick={() => {
              // Clear any session data when going back
              clearExistingSessionData();
              setShowPayment(false);
            }}
            couponDiscount={couponDiscount}
            totalPrice={getTotalPrice()}
          />
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500 border-t pt-4 font-lora dark:text-gray-400 dark:border-gray-700">
        Your information will only be used for conference communication purposes.
      </CardFooter>
    </Card>
  );
};

export default ConferenceRegistrationForm;
