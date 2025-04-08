
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
 * Allows users to enter any special requests or accommodations
 * they might need for the conference
 */
const SpecialRequests = ({ register }: SpecialRequestsProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="specialRequests" className="font-lora">Special Requests (Optional)</Label>
      <Textarea
        id="specialRequests"
        placeholder="Enter any special accommodations, dietary requirements, or other requests"
        rows={3}
        className="resize-none"
        {...register("specialRequests")}
      />
      <p className="text-sm text-gray-500">
        Let us know if you have any special needs or requests. We'll do our best to accommodate them.
      </p>
    </div>
  );
};

export default SpecialRequests;
