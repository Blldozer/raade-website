
import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RegistrationFormData } from "../RegistrationFormTypes";

interface SpecialRequestsProps {
  register: UseFormRegister<RegistrationFormData>;
}

/**
 * SpecialRequests Component
 * 
 * Provides a textarea for users to enter special requests or accommodations
 * for their conference registration. Includes proper name and id attributes
 * for accessibility and form submissions.
 * 
 * @param register - React Hook Form register function
 */
const SpecialRequests = ({ register }: SpecialRequestsProps) => {
  return (
    <div>
      <Label htmlFor="specialRequests">Special Requests</Label>
      <Textarea
        id="specialRequests"
        name="specialRequests"
        placeholder="Any special requests or accommodations (optional)"
        autoComplete="off"
        {...register("specialRequests")}
      />
    </div>
  );
};

export default SpecialRequests;
