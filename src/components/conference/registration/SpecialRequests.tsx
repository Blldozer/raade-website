
import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RegistrationFormData } from "../RegistrationFormTypes";

interface SpecialRequestsProps {
  register: UseFormRegister<RegistrationFormData>;
}

const SpecialRequests = ({ register }: SpecialRequestsProps) => {
  return (
    <div>
      <Label htmlFor="specialRequests">Special Requests</Label>
      <Textarea
        id="specialRequests"
        placeholder="Any special requests or accommodations (optional)"
        {...register("specialRequests")}
      />
    </div>
  );
};

export default SpecialRequests;
