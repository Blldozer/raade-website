
import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type ReferralSource = 
  | "Friends" 
  | "University ASA" 
  | "LinkedIn" 
  | "Instagram" 
  | "No Bystanders" 
  | "RAADE Outreach Team" 
  | "Other";

export interface ReferralSourceSectionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: any;
}

/**
 * ReferralSourceSection Component
 * 
 * Form section for capturing how the user heard about the conference
 * Includes standard options and an "Other" field for custom responses
 */
const ReferralSourceSection: React.FC<ReferralSourceSectionProps> = ({ 
  register, 
  setValue, 
  errors 
}) => {
  const [referralSource, setReferralSource] = React.useState<ReferralSource | null>(null);
  const [otherSource, setOtherSource] = React.useState("");

  const handleReferralChange = (value: ReferralSource) => {
    setReferralSource(value);
    setValue("referralSource", value);
  };

  const handleOtherSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherSource(value);
    if (referralSource === "Other") {
      setValue("otherReferralSource", value);
    }
  };

  const referralSources: ReferralSource[] = [
    "Friends",
    "University ASA",
    "LinkedIn",
    "Instagram",
    "No Bystanders",
    "RAADE Outreach Team",
    "Other"
  ];

  return (
    <div className="space-y-4">
      <FormField
        name="referralSource"
        render={() => (
          <FormItem>
            <FormLabel>How did you hear about us?</FormLabel>
            <FormControl>
              <RadioGroup 
                onValueChange={handleReferralChange} 
                className="flex flex-col space-y-1"
              >
                {referralSources.map((source) => (
                  <div key={source} className="flex items-center space-x-2">
                    <RadioGroupItem id={`referral-${source}`} value={source} />
                    <Label htmlFor={`referral-${source}`}>{source}</Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {referralSource === "Other" && (
        <FormField
          name="otherReferralSource"
          render={() => (
            <FormItem>
              <FormLabel>Please specify</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Where did you hear about us?" 
                  value={otherSource}
                  onChange={handleOtherSourceChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default ReferralSourceSection;
