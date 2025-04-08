import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormRegister } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";

export interface SpecialRequestsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: any;
}

/**
 * Special Requests Component
 * 
 * Allows attendees to specify dietary restrictions or other accommodations
 */
const SpecialRequests: React.FC<SpecialRequestsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Special Requests</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Let us know if you have any dietary restrictions or need special accommodations.
      </p>
      
      <FormItem className="space-y-1">
        <FormLabel htmlFor="specialRequests">Special Requests (Optional)</FormLabel>
        <FormControl>
          <Textarea
            id="specialRequests"
            placeholder="Dietary restrictions, accessibility needs, etc."
            className="h-24 resize-none"
            {...register("specialRequests")}
          />
        </FormControl>
        {errors.specialRequests && (
          <FormMessage>{errors.specialRequests.message}</FormMessage>
        )}
      </FormItem>
    </div>
  );
};

export default SpecialRequests;
