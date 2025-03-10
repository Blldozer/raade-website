import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegistrationFormFields from "./RegistrationFormFields";
import PaymentSection from "./PaymentSection";
import StepIndicator from "./registration/StepIndicator";
import { useRegistrationForm } from "./registration/useRegistrationForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ConferenceRegistrationForm = () => {
  const {
    form,
    isSubmitting,
    showPayment,
    registrationData,
    emailValidationResult,
    setEmailValidationResult,
    handleInitialSubmit,
    setShowPayment,
  } = useRegistrationForm();

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
    setIsSubmitting(false);
  };

  const { toast } = useToast();

  return (
    <Card className="shadow-lg border-[#FBB03B]/10">
      <CardHeader>
        <CardTitle className="text-2xl font-simula">Registration Details</CardTitle>
        <CardDescription>Please fill out the form below to register for the conference.</CardDescription>
      </CardHeader>
      <CardContent>
        <StepIndicator currentStep={showPayment ? 'payment' : 'registration'} />
        
        {!showPayment ? (
          <form onSubmit={form.handleSubmit(handleInitialSubmit)} className="space-y-6">
            <RegistrationFormFields 
              register={form.register}
              errors={form.formState.errors}
              setValue={form.setValue}
              watch={form.watch}
              control={form.control}
              onEmailValidation={setEmailValidationResult}
            />
            
            <Button
              type="submit"
              disabled={isSubmitting || (emailValidationResult && !emailValidationResult.isValid)}
              className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora"
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
      <CardFooter className="text-sm text-gray-500 border-t pt-4 font-lora">
        Your information will only be used for conference communication purposes.
      </CardFooter>
    </Card>
  );
};

export default ConferenceRegistrationForm;
