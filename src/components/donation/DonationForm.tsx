
import React from "react";
import { useDonationForm } from "./hooks/useDonationForm";
import AmountSelection from "./AmountSelection";
import DonorInformation from "./DonorInformation";
import DonationButton from "./DonationButton";

interface DonationFormProps {
  selectedAmount: number | null;
  setSelectedAmount: (amount: number | null) => void;
}

/**
 * DonationForm Component
 * 
 * A form for collecting donation information:
 * - Allows selection of predefined amounts or custom amount
 * - Collects donor information
 * - Handles form validation and submission
 * - Processes payment via Stripe
 * 
 * @param selectedAmount - Currently selected donation amount
 * @param setSelectedAmount - Function to update the selected amount
 */
const DonationForm = ({ selectedAmount, setSelectedAmount }: DonationFormProps) => {
  const {
    isCustomAmount,
    setIsCustomAmount,
    isSubmitting,
    register,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
    handleAmountSelect,
    handleCustomAmount
  } = useDonationForm(selectedAmount);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-2xl font-simula mb-4 text-gray-900">Make a Donation</h3>

      {/* Donation amount selection */}
      <AmountSelection
        selectedAmount={selectedAmount}
        setSelectedAmount={setSelectedAmount}
        isCustomAmount={isCustomAmount}
        setIsCustomAmount={setIsCustomAmount}
        register={register}
        setValue={setValue}
        errors={errors}
        onAmountSelect={handleAmountSelect}
        onCustomAmount={handleCustomAmount}
      />

      {/* Personal information */}
      <DonorInformation register={register} errors={errors} />

      {/* Submit button */}
      <DonationButton isSubmitting={isSubmitting} selectedAmount={selectedAmount} />
    </form>
  );
};

export default DonationForm;
