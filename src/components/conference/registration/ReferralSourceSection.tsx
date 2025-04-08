
import { useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegistrationFormData } from "../RegistrationFormTypes";

interface ReferralSourceSectionProps {
  control: Control<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
}

const REFERRAL_OPTIONS = [
  { value: "Friends", label: "Friends or Colleagues" },
  { value: "University ASA", label: "University African Student Association" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Instagram", label: "Instagram" },
  { value: "No Bystanders", label: "No Bystanders Organization" },
  { value: "RAADE Outreach Team", label: "RAADE Outreach Team" },
  { value: "Other", label: "Other" },
];

/**
 * ReferralSourceSection Component
 * 
 * Collects information about how the user heard about the conference
 * with support for "Other" custom input
 * 
 * @param control - React Hook Form control object
 * @param setValue - React Hook Form setValue function
 */
const ReferralSourceSection = ({ control, setValue }: ReferralSourceSectionProps) => {
  const referralSource = useWatch({
    control,
    name: "referralSource",
  });

  const isOtherSelected = referralSource === "Other";

  // Reset the custom referral source when "Other" is not selected
  useEffect(() => {
    if (!isOtherSelected) {
      // If you need to store the other value, you'd need to add a field to the schema
      // This would typically be otherReferralSource in the form data
    }
  }, [isOtherSelected, setValue]);

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="referralSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How did you hear about us?</FormLabel>
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
                {REFERRAL_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              This helps us understand how people find our conference.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {isOtherSelected && (
        <FormItem>
          <FormLabel>Please specify</FormLabel>
          <FormControl>
            <Input 
              placeholder="Please let us know how you heard about us"
              onChange={(e) => {
                // You might want to store this in a separate field in your form state
                // This is where you'd use setValue("otherReferralSource", e.target.value)
                // For now, we're just logging it
                console.log("Other referral source:", e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    </div>
  );
};

export default ReferralSourceSection;
