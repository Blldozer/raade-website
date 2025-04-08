
import { UseFormRegister } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SpecialRequestsProps {
  register: UseFormRegister<RegistrationFormData>;
}

/**
 * SpecialRequests Component
 * 
 * Collects any special requests or accommodations needed by attendees
 * - Accessible textarea with proper labeling
 * - Optional field with helpful placeholder text
 */
const SpecialRequests = ({ register }: SpecialRequestsProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="specialRequests" className="font-lora">Special Requests (Optional)</Label>
      <Textarea
        id="specialRequests"
        placeholder="Please let us know if you have any dietary restrictions, accessibility needs, or other special requests."
        className="h-24 resize-none"
        {...register("specialRequests")}
      />
      <p className="text-sm text-gray-500">
        We'll do our best to accommodate your needs.
      </p>
    </div>
  );
};

export default SpecialRequests;
