
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData, REFERRAL_SOURCES } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ReferralSourceSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

/**
 * ReferralSourceSection Component
 * 
 * Captures information about how attendees found out about the conference
 * - Dropdown of common referral sources
 * - Special handling for "Other" with additional input field
 */
const ReferralSourceSection = ({ register, setValue, watch }: ReferralSourceSectionProps) => {
  const referralSource = watch("referralSource");
  
  const handleReferralChange = (value: string) => {
    setValue("referralSource", value as RegistrationFormData["referralSource"]);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="referralSource" className="font-lora">How did you hear about us?</Label>
        <Select
          value={referralSource}
          onValueChange={handleReferralChange}
        >
          <SelectTrigger id="referralSource" className="mt-1">
            <SelectValue placeholder="Select how you heard about us" />
          </SelectTrigger>
          <SelectContent>
            {REFERRAL_SOURCES.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {referralSource === "Other" && (
        <div>
          <Label htmlFor="otherReferralSource" className="sr-only">Please specify</Label>
          <Input
            id="otherReferralSource"
            placeholder="Please specify how you heard about us"
            className="mt-1"
            {...register("otherReferralSource")}
          />
        </div>
      )}
    </div>
  );
};

export default ReferralSourceSection;
