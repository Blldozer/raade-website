
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";

// Extended interface to include all required props
export interface ReferralSourceSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: any;
  control: Control<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
}

/**
 * ReferralSourceSection Component
 * 
 * Collects information about how attendees heard about the conference
 * Provides a radio group with common options plus "Other" with a text field
 */
const ReferralSourceSection: React.FC<ReferralSourceSectionProps> = ({
  register,
  errors,
  control,
  watch,
  setValue
}) => {
  const watchReferralSource = watch("referralSource");
  const isOtherSelected = watchReferralSource === "Other";

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">How did you hear about us?</h3>
      
      <FormField
        control={control}
        name="referralSource"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-2"
              >
                {["Friends", "University ASA", "LinkedIn", "Instagram", "No Bystanders", "RAADE Outreach Team", "Other"].map((source) => (
                  <FormItem
                    key={source}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={source} />
                    </FormControl>
                    <FormLabel className="font-normal">{source}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {isOtherSelected && (
        <FormItem className="space-y-1">
          <FormLabel htmlFor="otherReferralSource">Please specify:</FormLabel>
          <FormControl>
            <Input
              id="otherReferralSource"
              placeholder="How did you hear about us?"
              {...register("otherReferralSource")}
            />
          </FormControl>
          {errors.otherReferralSource && (
            <FormMessage>{errors.otherReferralSource.message}</FormMessage>
          )}
        </FormItem>
      )}
    </div>
  );
};

export default ReferralSourceSection;
