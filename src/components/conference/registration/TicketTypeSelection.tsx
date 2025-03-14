
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
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
  TICKET_TYPES
} from "../RegistrationFormTypes";

/**
 * TicketTypeSelection Component
 * 
 * Displays ticket type dropdown for conference registration.
 * Shows appropriate price information based on ticket type.
 * 
 * @param watch - React Hook Form watch function to observe field changes
 * @param setValue - React Hook Form setValue function to update form values
 * @param errors - Form validation errors object
 */
interface TicketTypeSelectionProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  errors: any;
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
        onValueChange={(value) => setValue("ticketType", value)}
        value={watchTicketType}
      >
        <SelectTrigger id="ticketType">
          <SelectValue placeholder="Select ticket type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TICKET_TYPES.STUDENT}>Student {getTicketPriceText(TICKET_TYPES.STUDENT)}</SelectItem>
          <SelectItem value={TICKET_TYPES.PROFESSIONAL}>Professional {getTicketPriceText(TICKET_TYPES.PROFESSIONAL)}</SelectItem>
          <SelectItem value={TICKET_TYPES.STUDENT_GROUP}>Student Group {getTicketPriceText(TICKET_TYPES.STUDENT_GROUP)}</SelectItem>
        </SelectContent>
      </Select>
      {errors.ticketType && (
        <p className="text-red-500 text-sm mt-1">{errors.ticketType.message}</p>
      )}
      
      {watchTicketType === TICKET_TYPES.STUDENT && (
        <p className="text-gray-600 text-sm mt-1">
          Student tickets require a valid .edu email address.
        </p>
      )}
    </div>
  );
};

export default TicketTypeSelection;
