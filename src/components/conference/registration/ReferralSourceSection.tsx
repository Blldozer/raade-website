
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

/**
 * ReferralSourceSection Component
 * 
 * Allows users to select how they heard about the conference.
 * This information helps with marketing analytics and outreach improvement.
 * 
 * @param register - React Hook Form register function
 * @param setValue - React Hook Form setValue function
 * @param watch - React Hook Form watch function
 */
interface ReferralSourceSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

const ReferralSourceSection = ({
  register,
  setValue,
  watch,
}: ReferralSourceSectionProps) => {
  const watchReferralSource = watch("referralSource");
  
  return (
    <div>
      <Label htmlFor="referralSource" className="font-lora">How did you hear about us? (Optional)</Label>
      <Select
        value={watchReferralSource}
        onValueChange={(value) => setValue("referralSource", value as any)}
      >
        <SelectTrigger id="referralSource">
          <SelectValue placeholder="Select option" />
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
  );
};

export default ReferralSourceSection;
