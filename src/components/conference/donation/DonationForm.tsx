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
import DynamicDonationImpact from "./DynamicDonationImpact";

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
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 rounded-xl shadow-lg border border-gray-100">
          <DonationStepIndicator currentStep={showCardPayment ? 'payment' : 'information'} />
          
          {showCardPayment ? (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6 text-center text-[#274675]">Complete Your Donation</h3>
              
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
                    className="flex items-center rounded-lg transition-all duration-200 hover:bg-gray-100"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  
                  <Button
                    type="button"
                    className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-medium rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-[#274675]">Make a Donation</h3>
                
                <DonationAmountSelector
                  selectedAmount={selectedAmount}
                  handleAmountSelect={handleAmountSelect}
                  form={form}
                />
                
                <div className="py-2 border-t border-b border-gray-100">
                  <DonorInformationForm form={form} />
                </div>
                
                <DonationFormSubmit 
                  isSubmitting={isSubmitting} 
                  donationAmount={getDonationAmount()}
                />
              </form>
            </FormProvider>
          )}
        </Card>
        
        {/* Desktop Impact Display - Hidden on mobile */}
        <div className="hidden md:block">
          <div className="sticky top-24">
            <DynamicDonationImpact 
              selectedAmount={selectedAmount}
              customAmount={form.watch("customAmount")}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Impact Display - Only visible on small screens */}
      <div className="mt-8 md:hidden">
        <h3 className="text-xl font-semibold mb-4 text-center text-[#274675]">Your Impact</h3>
        <DynamicDonationImpact 
          selectedAmount={selectedAmount}
          customAmount={form.watch("customAmount")}
        />
      </div>
    </div>
  );
};

export default DonationForm;
