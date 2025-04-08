
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, Control } from "react-hook-form";
import { REFERRAL_SOURCES } from "../RegistrationFormTypes";

/**
 * Props for the ReferralSourceSection component
 */
export interface ReferralSourceSectionProps {
  register: UseFormRegister<any>;
  errors: any;
  control: Control<any>;
  watch: any;
}

/**
 * ReferralSourceSection Component
 * 
 * Handles the referral source section of the conference registration form
 * with radio buttons for standard sources and a text input for "Other"
 */
const ReferralSourceSection: React.FC<ReferralSourceSectionProps> = ({
  register,
  errors,
  control,
  watch
}) => {
  const referralSource = watch("referralSource");
  const isOtherSelected = referralSource === "Other";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white">
        How did you hear about us?
      </h3>
      
      <FormField
        control={control}
        name="referralSource"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                {REFERRAL_SOURCES.map((source) => (
                  <div key={source} className="flex items-center space-x-2">
                    <RadioGroupItem value={source} id={`referral-${source.toLowerCase().replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`referral-${source.toLowerCase().replace(/\s+/g, '-')}`}>{source}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="referral-other" />
                  <Label htmlFor="referral-other">Other</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isOtherSelected && (
        <div>
          <FormItem className="mt-2">
            <FormLabel htmlFor="referralSourceOther">Please specify</FormLabel>
            <FormControl>
              <Input
                id="referralSourceOther"
                placeholder="Where did you hear about us?"
                {...register("referralSourceOther")}
              />
            </FormControl>
            {errors.referralSourceOther && (
              <FormMessage>{errors.referralSourceOther.message}</FormMessage>
            )}
          </FormItem>
        </div>
      )}
    </div>
  );
};

export default ReferralSourceSection;
