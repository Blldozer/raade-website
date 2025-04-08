
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { DonationFormValues } from "./DonationFormTypes";

// Predefined donation amounts
export const DONATION_AMOUNTS = [25, 50, 100, 250, 500, 1000];

interface AmountSelectionProps {
  selectedAmount: number | null;
  setSelectedAmount: (amount: number | null) => void;
  isCustomAmount: boolean;
  setIsCustomAmount: (isCustom: boolean) => void;
  register: UseFormRegister<DonationFormValues>;
  setValue: UseFormSetValue<DonationFormValues>;
  errors: any;
}

/**
 * AmountSelection Component
 * 
 * Handles donation amount selection including:
 * - Predefined amount buttons grid
 * - Custom amount option
 * - Custom amount input field
 * 
 * @param props - Component properties including form controls and state
 */
const AmountSelection = ({
  selectedAmount,
  setSelectedAmount,
  isCustomAmount,
  setIsCustomAmount,
  register,
  setValue,
  errors
}: AmountSelectionProps) => {
  
  // Helper function to handle amount selection
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setValue("amount", amount);
    setIsCustomAmount(false);
  };

  // Helper function to toggle custom amount input
  const handleCustomAmount = () => {
    setIsCustomAmount(true);
    setValue("amount", undefined);
    setSelectedAmount(null);
  };

  return (
    <div className="mb-6">
      <Label htmlFor="amount" className="block mb-2 font-medium">
        Select Amount
      </Label>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {DONATION_AMOUNTS.map((amount) => (
          <Button
            key={amount}
            type="button"
            variant={selectedAmount === amount && !isCustomAmount ? "default" : "outline"}
            className={`${
              selectedAmount === amount && !isCustomAmount
                ? "bg-[#274675] hover:bg-[#274675]/90 text-white"
                : "border-[#274675] text-[#274675] hover:bg-[#274675]/10"
            }`}
            onClick={() => handleAmountSelect(amount)}
          >
            ${amount}
          </Button>
        ))}
      </div>
      <Button
        type="button"
        variant={isCustomAmount ? "default" : "outline"}
        className={`w-full mt-2 ${
          isCustomAmount
            ? "bg-[#274675] hover:bg-[#274675]/90 text-white"
            : "border-[#274675] text-[#274675] hover:bg-[#274675]/10"
        }`}
        onClick={handleCustomAmount}
      >
        Custom Amount
      </Button>
      
      {isCustomAmount && (
        <div className="mt-3">
          <Label htmlFor="custom-amount" className="sr-only">
            Custom Amount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <Input
              id="custom-amount"
              type="number"
              min="1"
              step="any"
              className="pl-7 pr-12"
              placeholder="Enter amount"
              {...register("amount", { valueAsNumber: true })}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  setSelectedAmount(value);
                } else {
                  setSelectedAmount(null);
                }
              }}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">USD</span>
            </div>
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AmountSelection;
