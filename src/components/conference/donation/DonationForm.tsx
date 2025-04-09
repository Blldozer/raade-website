
import React from "react";
import { Form } from "@/components/ui/form";
import DonationConfirmation from "./DonationConfirmation";
import { useDonationForm } from "./useDonationForm";
import StripeWrapper from "./stripe/StripeWrapper";
import DynamicDonationImpact from "./DynamicDonationImpact";
import DonationAmountSelector from "./DonationAmountSelector";
import DonorInformationForm from "./DonorInformationForm";
import DonationFormSubmit from "./DonationFormSubmit";

/**
 * DonationForm Component
 * 
 * Interactive donation form with:
 * - Clean, modern interface based on the provided design
 * - Preset donation amounts with highlighted selection
 * - Simplified one-page layout
 * - Mobile responsive design
 */
const DonationForm = () => {
  return (
    <StripeWrapper>
      <DonationFormContent />
    </StripeWrapper>
  );
};

/**
 * DonationFormContent Component
 * 
 * Contains the actual form content that needs to be wrapped in the Stripe context
 */
const DonationFormContent = () => {
  const {
    form,
    isSubmitting,
    showConfirmation,
    selectedAmount,
    submittedValues,
    paymentError,
    onSubmit: handleSubmit,
    handleAmountSelect,
    getDonationAmount,
    handleDonateAgain
  } = useDonationForm();
  
  // Show confirmation screen after successful submission
  if (showConfirmation && submittedValues) {
    return (
      <DonationConfirmation 
        values={submittedValues} 
        onDonateAgain={handleDonateAgain} 
      />
    );
  }
  
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Donation Form */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 font-simula">Make a Donation</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Donation amount selection */}
              <DonationAmountSelector 
                form={form} 
                selectedAmount={selectedAmount}
                handleAmountSelect={handleAmountSelect}
              />
              
              {/* Personal Information */}
              <DonorInformationForm form={form} />
              
              {/* Submit button */}
              <DonationFormSubmit 
                isSubmitting={isSubmitting} 
                donationAmount={getDonationAmount()} 
              />
            </form>
          </Form>
        </div>
        
        {/* Right column - Impact Display */}
        <div>
          <DynamicDonationImpact 
            selectedAmount={selectedAmount} 
            customAmount={form.watch("customAmount")}
          />
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
