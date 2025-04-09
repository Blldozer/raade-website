
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
            <FormLabel className="text-base">Select Amount</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  handleAmountSelect(value);
                }}
                value={field.value}
                className="grid grid-cols-2 gap-3"
              >
                {["25", "50", "100", "250", "500", "1000"].map((amount) => (
                  <div key={amount} className="flex items-center">
                    <div className="w-full">
                      <RadioGroupItem
                        value={amount}
                        id={`amount-${amount}`}
                        className="sr-only peer"
                      />
                      <Label
                        htmlFor={`amount-${amount}`}
                        className="w-full flex justify-center text-center px-4 py-3 rounded-lg cursor-pointer border transition-all peer-data-[state=checked]:bg-[#FBB03B] peer-data-[state=checked]:text-white peer-data-[state=checked]:border-[#FBB03B] bg-white border-gray-200 hover:border-[#FBB03B]/50 text-gray-700"
                      >
                        ${amount}
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                handleAmountSelect(value);
              }}
              value={field.value}
            >
              <div className="flex items-center">
                <div className="w-full">
                  <RadioGroupItem
                    value="custom"
                    id="amount-custom"
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor="amount-custom"
                    className="w-full flex justify-center text-center px-4 py-3 rounded-lg cursor-pointer border transition-all peer-data-[state=checked]:bg-[#FBB03B] peer-data-[state=checked]:text-white peer-data-[state=checked]:border-[#FBB03B] bg-white border-gray-200 hover:border-[#FBB03B]/50 text-gray-700"
                  >
                    Custom Amount
                  </Label>
                </div>
              </div>
            </RadioGroup>
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
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    placeholder="e.g. 75"
                    type="number"
                    min="1"
                    step="any"
                    className="pl-8"
                    {...field}
                  />
                </div>
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
