
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { DonationFormValues } from "./useDonationForm";

interface DonationAmountSelectorProps {
  form: UseFormReturn<DonationFormValues>;
  selectedAmount: string;
  handleAmountSelect: (amount: string) => void;
}

/**
 * DonationAmountSelector Component
 * 
 * Renders a grid of donation amount buttons:
 * - Highlights the currently selected amount
 * - Includes a custom amount option with input field
 * - Handles validation for custom amounts
 */
const DonationAmountSelector: React.FC<DonationAmountSelectorProps> = ({
  form,
  selectedAmount,
  handleAmountSelect,
}) => {
  // Predefined donation amounts
  const amounts = ["25", "50", "100", "250", "500", "1000"];
  
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-700">Select Amount</h4>
      
      {/* Donation Amount Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {amounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => {
              form.setValue("amount", amount);
              handleAmountSelect(amount);
            }}
            className={`w-full text-center px-4 py-3 rounded-lg border transition-all ${
              selectedAmount === amount
                ? "bg-[#FBB03B] text-white border-[#FBB03B]"
                : "bg-white border-gray-200 hover:border-[#FBB03B]/50 text-gray-700"
            }`}
          >
            ${amount}
          </button>
        ))}
      </div>
      
      {/* Custom Amount Option */}
      <button
        type="button"
        onClick={() => {
          form.setValue("amount", "custom");
          handleAmountSelect("custom");
        }}
        className={`w-full text-center px-4 py-3 rounded-lg border transition-all ${
          selectedAmount === "custom"
            ? "bg-[#FBB03B] text-white border-[#FBB03B]"
            : "bg-white border-gray-200 hover:border-[#FBB03B]/50 text-gray-700"
        }`}
      >
        Custom Amount
      </button>
      
      {/* Custom Amount Input Field */}
      {selectedAmount === "custom" && (
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter custom amount ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              placeholder="e.g. 75"
              type="number"
              min="1"
              step="any"
              className="pl-8 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...form.register("customAmount")}
              onChange={(e) => {
                form.setValue("customAmount", e.target.value);
                // Force re-render to update impact display
                form.trigger("customAmount");
              }}
            />
          </div>
          {form.formState.errors.customAmount && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.customAmount.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DonationAmountSelector;
