
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
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-700">Your Information</h4>
      
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="your.email@example.com" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Message (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Share why you're supporting RAADE..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="makeAnonymous"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <input
                type="checkbox"
                className="h-4 w-4 mt-1"
                checked={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Make this donation anonymous</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default DonorInformationForm;
