
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData, REFERRAL_SOURCES, ReferralSource } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ReferralSourceSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

/**
 * ReferralSourceSection Component
 * 
 * Collects information on how attendees heard about the conference
 * Used for marketing analytics and improving outreach
 */
const ReferralSourceSection = ({
  register,
  setValue,
  watch
}: ReferralSourceSectionProps) => {
  const [otherSource, setOtherSource] = useState<string>("");
  const referralSource = watch("referralSource");
  
  const handleSourceChange = (value: ReferralSource) => {
    setValue("referralSource", value);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-lora mb-2 block">How did you hear about us?</Label>
        <RadioGroup
          value={referralSource}
          onValueChange={(value) => handleSourceChange(value as ReferralSource)}
          className="space-y-2"
        >
          {REFERRAL_SOURCES.map((source) => (
            <div key={source} className="flex items-center space-x-2">
              <RadioGroupItem value={source} id={`source-${source}`} />
              <Label htmlFor={`source-${source}`}>{source}</Label>
              
              {source === "Other" && referralSource === "Other" && (
                <Input
                  placeholder="Please specify"
                  className="ml-2 w-full md:w-64"
                  value={otherSource}
                  onChange={(e) => setOtherSource(e.target.value)}
                />
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default ReferralSourceSection;
