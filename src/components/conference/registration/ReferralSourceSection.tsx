
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

interface ReferralSourceSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

/**
 * ReferralSourceSection Component
 * 
 * Provides form fields for collecting information about how the user heard about the event
 * With conditional logic to show an input field for "Other" sources
 * 
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @param control - React Hook Form control object
 * @param watch - React Hook Form watch function
 */
const ReferralSourceSection = ({
  register,
  errors,
  control,
  watch
}: ReferralSourceSectionProps) => {
  const watchReferralSource = watch("referralSource");
  const [showOtherField, setShowOtherField] = useState(false);
  
  useEffect(() => {
    // Check if referral source is "Other" to show the custom input field
    setShowOtherField(watchReferralSource === "Other");
  }, [watchReferralSource]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">How did you hear about us?</h3>
      
      <FormField
        control={control}
        name="referralSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Referral Source</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select how you heard about us" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Friends">Friends or Colleagues</SelectItem>
                <SelectItem value="University ASA">University ASA</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="No Bystanders">No Bystanders</SelectItem>
                <SelectItem value="RAADE Outreach Team">RAADE Outreach Team</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {showOtherField && (
        <div>
          <FormLabel htmlFor="otherReferralSource">Please specify</FormLabel>
          <Input
            id="otherReferralSource"
            placeholder="How did you hear about us?"
            className="mt-1"
            {...register("otherReferralSource")}
          />
          {errors.otherReferralSource && (
            <p className="text-red-500 text-sm mt-1">{errors.otherReferralSource.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReferralSourceSection;
