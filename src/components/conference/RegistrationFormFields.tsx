
import { UseFormRegister, FormState, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegistrationFormData, getTicketPriceText } from "./RegistrationFormTypes";

interface RegistrationFormFieldsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

const RegistrationFormFields = ({ 
  register, 
  errors, 
  setValue, 
  watch 
}: RegistrationFormFieldsProps) => {
  const watchTicketType = watch("ticketType");
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          placeholder="Enter your organization name"
          {...register("organization")}
        />
        {errors.organization && (
          <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="role">Your Role</Label>
        <Input
          id="role"
          placeholder="Your position or role"
          {...register("role")}
        />
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="ticketType">Ticket Type</Label>
        <Select 
          onValueChange={(value) => setValue("ticketType", value)}
          value={watchTicketType}
        >
          <SelectTrigger id="ticketType">
            <SelectValue placeholder="Select ticket type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="early-bird">Early Bird {getTicketPriceText("early-bird")}</SelectItem>
            <SelectItem value="standard">Standard {getTicketPriceText("standard")}</SelectItem>
            <SelectItem value="student">Student {getTicketPriceText("student")}</SelectItem>
            <SelectItem value="speaker">Speaker {getTicketPriceText("speaker")}</SelectItem>
          </SelectContent>
        </Select>
        {errors.ticketType && (
          <p className="text-red-500 text-sm mt-1">{errors.ticketType.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requests or accommodations (optional)"
          {...register("specialRequests")}
        />
      </div>
    </div>
  );
};

export default RegistrationFormFields;
