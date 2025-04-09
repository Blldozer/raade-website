import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { DonationFormValues } from "./useDonationForm";

interface DonorInformationFormProps {
  form: UseFormReturn<DonationFormValues>;
}

/**
 * DonorInformationForm Component
 * 
 * Collects and validates donor personal information:
 * - Full name field with validation
 * - Email address with format validation
 * - Optional message field
 * - Anonymous donation checkbox option
 */
const DonorInformationForm: React.FC<DonorInformationFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-medium text-[#274675] mb-3">Your Information</h4>
      
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="Jane Doe"
                  className="rounded-lg border-gray-300 py-6 transition-shadow focus:ring-2 focus:ring-[#FBB03B] focus:border-transparent"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  className="rounded-lg border-gray-300 py-6 transition-shadow focus:ring-2 focus:ring-[#FBB03B] focus:border-transparent"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-gray-700">Message (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Share why you're supporting RAADE..."
                className="min-h-28 rounded-lg border-gray-300 transition-shadow focus:ring-2 focus:ring-[#FBB03B] focus:border-transparent resize-y"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Removed the makeAnonymous checkbox as requested */}
      
    </div>
  );
};

export default DonorInformationForm;
