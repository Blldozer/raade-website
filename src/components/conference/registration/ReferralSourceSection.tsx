
import React from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData, REFERRAL_SOURCES } from "../RegistrationFormTypes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormItem } from "@/components/ui/form";

interface ReferralSourceSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue?: UseFormSetValue<RegistrationFormData>;
  watch?: UseFormWatch<RegistrationFormData>;
}

/**
 * ReferralSourceSection Component
 * 
 * Displays options for how the registrant heard about the conference
 * This is an optional field to help with marketing analytics
 * 
 * @param register - React Hook Form register function
 * @param setValue - Optional React Hook Form setValue function for programmatic updates
 * @param watch - Optional React Hook Form watch function for monitoring values
 */
const ReferralSourceSection: React.FC<ReferralSourceSectionProps> = ({ 
  register,
  setValue,
  watch
}) => {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">How did you hear about the conference? <span className="text-gray-500 text-xs">(optional)</span></div>
      
      <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {REFERRAL_SOURCES.map((source) => (
          <FormItem key={source} className="flex items-center space-x-2 space-y-0">
            <RadioGroupItem 
              value={source} 
              id={`referral-${source}`} 
              {...register("referralSource")}
            />
            <Label 
              htmlFor={`referral-${source}`}
              className="text-sm cursor-pointer"
            >
              {source}
            </Label>
          </FormItem>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ReferralSourceSection;
