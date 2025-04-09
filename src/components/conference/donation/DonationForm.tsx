
import React from "react";
import { useDonationForm } from "./useDonationForm";
import DonationAmountSelector from "./DonationAmountSelector";
import DonorInformationForm from "./DonorInformationForm";
import DonationFormSubmit from "./DonationFormSubmit";
import DonationConfirmation from "./DonationConfirmation";
import { Card } from "@/components/ui/card";
import { FormProvider } from "react-hook-form";
import DonationSummary from "./DonationSummary";
import DonationStepIndicator from "./DonationStepIndicator";
import StripePaymentForm from "./stripe/StripePaymentForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useStripePayment } from "./stripe/useStripePayment";

interface DonationFormProps {
  onPaymentError: (error: string) => void;
}

/**
 * DonationForm Component
 * 
 * Manages the donation process:
 * - Form for collecting donation amount and donor information
 * - Displays summary before payment
 * - Handles payment submission
 * - Shows confirmation after successful donation
 */
const DonationForm: React.FC<DonationFormProps> = ({ onPaymentError }) => {
  const {
    form,
    isSubmitting,
    showConfirmation,
    showCardPayment,
    selectedAmount,
    submittedValues,
    paymentError,
    onSubmit,
    handleAmountSelect,
    getDonationAmount,
    handleDonateAgain,
    handlePaymentSuccess,
    handlePaymentError,
    handleBackToForm
  } = useDonationForm();

  const { processPayment, isLoading, error, setError } = useStripePayment({
    donationAmount: submittedValues ? 
      (submittedValues.amount === "custom" && submittedValues.customAmount ? 
        parseFloat(submittedValues.customAmount) : 
        parseInt(submittedValues.amount)) : 0,
    email: submittedValues?.email || "",
    fullName: submittedValues?.fullName || "",
    message: submittedValues?.message,
    makeAnonymous: submittedValues?.makeAnonymous
  });

  // If there's a payment error, make sure it gets propagated up
  React.useEffect(() => {
    if (error) {
      handlePaymentError(error);
      onPaymentError(error);
    }
  }, [error, handlePaymentError, onPaymentError]);

  const handlePaymentSubmit = async () => {
    if (!submittedValues) return;
    
    try {
      const success = await processPayment();
      if (success) {
        handlePaymentSuccess();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed. Please try again.";
      handlePaymentError(errorMessage);
      onPaymentError(errorMessage);
    }
  };

  if (showConfirmation) {
    return <DonationConfirmation 
      onDonateAgain={handleDonateAgain} 
      values={submittedValues!} 
    />;
  }

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <DonationStepIndicator currentStep={showCardPayment ? 'payment' : 'information'} />
      
      {showCardPayment ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semula mb-4 text-center">Complete Your Donation</h3>
          
          <DonationSummary 
            values={submittedValues!}
            formattedAmount={getDonationAmount()}
          />
          
          <div className="border-t border-gray-200 pt-6">
            <StripePaymentForm 
              isSubmitting={isLoading} 
              error={paymentError} 
            />
            
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-6">
              <Button
                variant="outline"
                onClick={handleBackToForm}
                disabled={isLoading}
                type="button"
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <Button
                type="button"
                className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
                disabled={isLoading}
                onClick={handlePaymentSubmit}
              >
                {isLoading ? "Processing..." : `Donate ${getDonationAmount()}`}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-xl font-semula mb-4 text-center">Make a Donation</h3>
            
            <DonationAmountSelector
              selectedAmount={selectedAmount}
              handleAmountSelect={handleAmountSelect}
              form={form}
            />
            
            <DonorInformationForm form={form} />
            
            <DonationFormSubmit 
              isSubmitting={isSubmitting} 
              donationAmount={getDonationAmount()}
            />
          </form>
        </FormProvider>
      )}
    </Card>
  );
};

export default DonationForm;
