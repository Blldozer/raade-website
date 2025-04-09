import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
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
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-base font-medium text-gray-700">Select an amount</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  handleAmountSelect(value);
                }}
                defaultValue={field.value}
                className="flex flex-wrap gap-3"
              >
                {["25", "50", "100", "250", "500", "1000", "custom"].map((amount) => (
                  <motion.div 
                    key={amount} 
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RadioGroupItem
                      value={amount}
                      id={`amount-${amount}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`amount-${amount}`}
                      className={`px-5 py-3 rounded-lg cursor-pointer font-medium transition-all duration-300 ${
                        selectedAmount === amount
                          ? "bg-[#FBB03B] text-white shadow-md scale-105"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      {amount === "custom" ? "Custom" : `$${amount}`}
                    </Label>
                  </motion.div>
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
              <FormLabel className="text-sm font-medium text-gray-700">Enter custom amount ($)</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="E.g. 75"
                    min="1"
                    step="any"
                    className="pl-8 py-6 rounded-lg border-gray-300 focus:ring-[#FBB03B] focus:border-[#FBB03B]"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default DonationAmountSelector;
