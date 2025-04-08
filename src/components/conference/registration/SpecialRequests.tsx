
import { UseFormRegister } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * SpecialRequests Component
 * 
 * Allows registrants to provide any special requirements
 * or additional information for their conference attendance.
 * 
 * @param register - React Hook Form register function
 */
interface SpecialRequestsProps {
  register: UseFormRegister<RegistrationFormData>;
}

const SpecialRequests = ({ register }: SpecialRequestsProps) => {
  return (
    <div>
      <Label htmlFor="specialRequests" className="font-lora">Special Requests (Optional)</Label>
      <Textarea
        id="specialRequests"
        className="mt-1"
        placeholder="Please let us know if you have any dietary restrictions, accessibility needs, or other considerations."
        {...register("specialRequests")}
      />
    </div>
  );
};

export default SpecialRequests;
