
import React from "react";
import { Form } from "@/components/ui/form";
import DonationConfirmation from "./DonationConfirmation";
import DonationAmountSelector from "./DonationAmountSelector";
import DonorInformationForm from "./DonorInformationForm";
import DonationFormSubmit from "./DonationFormSubmit";
import { useDonationForm } from "./useDonationForm";

/**
 * DonationForm Component
 * 
 * Interactive donation form with:
 * - Preset donation amounts with custom option
 * - Donor information collection
 * - Optional message field
 * - Anonymous donation option
 * - Success state with confirmation
 * - Mobile responsive design
 * 
 * This component has been refactored to use smaller, focused components
 * for better maintainability and code organization.
 */
const DonationForm = () => {
  const {
    form,
    isSubmitting,
    showConfirmation,
    selectedAmount,
    submittedValues,
    onSubmit,
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
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 font-simula">Make a Donation</h3>
      
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Donation amount selection section */}
          <DonationAmountSelector 
            form={form}
            selectedAmount={selectedAmount}
            handleAmountSelect={handleAmountSelect}
          />
          
          {/* Donor information section */}
          <DonorInformationForm form={form} />
          
          {/* Submit button and footer text */}
          <DonationFormSubmit 
            isSubmitting={isSubmitting}
            donationAmount={getDonationAmount()}
          />
        </form>
      </Form>
    </div>
  );
};

export default DonationForm;
