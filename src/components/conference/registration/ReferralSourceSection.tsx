
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegistrationFormData, REFERRAL_SOURCES } from "../RegistrationFormTypes";
import { Input } from "@/components/ui/input";

interface ReferralSourceSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

/**
 * ReferralSourceSection Component
 * 
 * Displays a dropdown for selecting how the user heard about the conference.
 * Includes an "Other" option that displays an input field for custom responses.
 * 
 * @param register - React Hook Form register function
 * @param setValue - React Hook Form setValue function
 * @param watch - React Hook Form watch function
 */
const ReferralSourceSection = ({
  register,
  setValue,
  watch
}: ReferralSourceSectionProps) => {
  const watchReferralSource = watch("referralSource");
  const isOther = watchReferralSource === "Other";
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="referralSource">How did you hear about us?</Label>
        <Select
          onValueChange={(value) => setValue("referralSource", value)}
          value={watchReferralSource}
        >
          <SelectTrigger id="referralSource">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {REFERRAL_SOURCES.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isOther && (
        <div>
          <Label htmlFor="otherReferralSource">Please specify:</Label>
          <Input
            id="otherReferralSource"
            placeholder="Where did you hear about us?"
            {...register("referralSource")}
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};

export default ReferralSourceSection;
