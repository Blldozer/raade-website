
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { DonationFormValues } from "./useDonationForm";

interface DonationAmountSelectorProps {
  form: UseFormReturn<DonationFormValues>;
  selectedAmount: string;
  handleAmountSelect: (value: string) => void;
}

/**
 * DonationAmountSelector Component
 * 
 * Handles the donation amount selection UI, including:
 * - Preset amount options as radio buttons
 * - Custom amount input field
 * - Visual feedback for selected amount
 */
const DonationAmountSelector: React.FC<DonationAmountSelectorProps> = ({
  form,
  selectedAmount,
  handleAmountSelect,
}) => {
  return (
    <>
      {/* Donation amount selection */}
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base">Select an amount</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  handleAmountSelect(value);
                }}
                defaultValue={field.value}
                className="flex flex-wrap gap-3"
              >
                {["25", "50", "100", "250", "custom"].map((amount) => (
                  <div key={amount} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={amount}
                      id={`amount-${amount}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`amount-${amount}`}
                      className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
                        selectedAmount === amount
                          ? "bg-[#FBB03B] text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      {amount === "custom" ? "Custom" : `$${amount}`}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Custom amount field */}
      {selectedAmount === "custom" && (
        <FormField
          control={form.control}
          name="customAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter custom amount ($)</FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g. 75"
                  type="number"
                  min="1"
                  step="any"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default DonationAmountSelector;
