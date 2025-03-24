
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegistrationFormFields from "./RegistrationFormFields";
import PaymentSection from "./PaymentSection";
import StepIndicator from "./registration/StepIndicator";
import { useRegistrationForm } from "./registration/useRegistrationForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * ConferenceRegistrationForm Component
 * 
 * Displays the main registration form for the conference:
 * - Properly supports dark mode with enhanced color inversion for mobile
 * - Handles form state and session management
 * - Provides smooth transitions between registration and payment steps
 * - Shows appropriate feedback with toast notifications
 * - Improved contrast and readability in both light and dark modes
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
    resetForm
  } = useRegistrationForm();

  const { toast } = useToast();

  // Check for any existing session data on mount - helps with back navigation
  useEffect(() => {
    const checkForExistingSession = () => {
      const sessionId = sessionStorage.getItem("checkoutSessionId");
      
      // If there's a checkout session ID in storage, clear it when returning to the form
      if (sessionId) {
        console.log("Found existing checkout session ID, clearing session data");
        sessionStorage.removeItem("checkoutSessionId");
        sessionStorage.removeItem("registrationEmail");
        
        // If we're already showing payment, also reset the form
        if (showPayment) {
          toast({
            title: "Session Reset",
            description: "Your previous checkout session has been cleared.",
            variant: "default",
          });
          resetForm();
        }
      }
    };
    
    checkForExistingSession();
    
    // Also listen for storage events in case it changes in another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "checkoutSessionId" && !e.newValue) {
        checkForExistingSession();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [showPayment]);
  
  const handlePaymentSuccess = () => {
    form.reset();
    setShowPayment(false);
  };

  const handlePaymentError = (errorMessage: string) => {
    toast({
      title: "Payment failed",
      description: errorMessage || "There was an error processing your payment. Please try again.",
      variant: "destructive",
    });
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
          <form onSubmit={form.handleSubmit(handleInitialSubmit)} className="space-y-6">
            <RegistrationFormFields 
              register={form.register}
              errors={form.formState.errors}
              setValue={form.setValue}
              watch={form.watch}
              control={form.control}
              onEmailValidation={handleEmailValidation}
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
                <>Continue to Payment</>
              )}
            </Button>
          </form>
        ) : (
          <PaymentSection 
            registrationData={registrationData!}
            isSubmitting={isSubmitting}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            onBackClick={() => setShowPayment(false)}
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
