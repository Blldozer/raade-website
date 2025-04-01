
import { UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RegistrationFormData,
  getTicketPriceText,
  TICKET_TYPES_ENUM
} from "../RegistrationFormTypes";

/**
 * TicketTypeSelection Component
 * 
 * Displays ticket type dropdown for conference registration.
 * Shows appropriate price information based on ticket type.
 * Includes proper name attributes for improved form accessibility and autofill.
 * 
 * @param watch - React Hook Form watch function to observe field changes
 * @param setValue - React Hook Form setValue function to update form values
 * @param errors - Form validation errors object
 */
interface TicketTypeSelectionProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

const TicketTypeSelection = ({
  watch,
  setValue,
  errors
}: TicketTypeSelectionProps) => {
  const watchTicketType = watch("ticketType");
  
  return (
    <div>
      <Label htmlFor="ticketType">Ticket Type</Label>
      <Select 
        onValueChange={(value: typeof TICKET_TYPES_ENUM[keyof typeof TICKET_TYPES_ENUM]) => setValue("ticketType", value)}
        value={watchTicketType}
      >
        <SelectTrigger id="ticketType" name="ticketType">
          <SelectValue placeholder="Select ticket type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TICKET_TYPES_ENUM.STUDENT}>Student {getTicketPriceText(TICKET_TYPES_ENUM.STUDENT)}</SelectItem>
          <SelectItem value={TICKET_TYPES_ENUM.PROFESSIONAL}>Professional {getTicketPriceText(TICKET_TYPES_ENUM.PROFESSIONAL)}</SelectItem>
          <SelectItem value={TICKET_TYPES_ENUM.STUDENT_GROUP}>Student Group {getTicketPriceText(TICKET_TYPES_ENUM.STUDENT_GROUP)}</SelectItem>
          <SelectItem value={TICKET_TYPES_ENUM.TRIAL}>Trial Ticket {getTicketPriceText(TICKET_TYPES_ENUM.TRIAL)}</SelectItem>
        </SelectContent>
      </Select>
      {errors.ticketType && (
        <p className="text-red-500 text-sm mt-1">{errors.ticketType.message}</p>
      )}
      
      {watchTicketType === TICKET_TYPES_ENUM.STUDENT && (
        <p className="text-gray-600 text-sm mt-1">
          Student tickets require a valid .edu email address.
        </p>
      )}
      
      {watchTicketType === TICKET_TYPES_ENUM.TRIAL && (
        <p className="text-gray-600 text-sm mt-1">
          Trial tickets are for testing the registration process.
        </p>
      )}
    </div>
  );
};

export default TicketTypeSelection;
