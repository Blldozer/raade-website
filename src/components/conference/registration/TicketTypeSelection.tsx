
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
          <SelectItem value={TICKET_TYPES.TEST}>Test Ticket {getTicketPriceText(TICKET_TYPES.TEST)}</SelectItem>
          <SelectItem value={TICKET_TYPES.RICE_STUDENT}>Rice Student {getTicketPriceText(TICKET_TYPES.RICE_STUDENT)}</SelectItem>
          <SelectItem value={TICKET_TYPES.NON_RICE_STUDENT}>Non-Rice Student {getTicketPriceText(TICKET_TYPES.NON_RICE_STUDENT)}</SelectItem>
          <SelectItem value={TICKET_TYPES.YOUNG_PROFESSIONAL}>Professional {getTicketPriceText(TICKET_TYPES.YOUNG_PROFESSIONAL)}</SelectItem>
          <SelectItem value={TICKET_TYPES.STUDENT_GROUP}>Student Group {getTicketPriceText(TICKET_TYPES.STUDENT_GROUP)}</SelectItem>
        </SelectContent>
      </Select>
      {errors.ticketType && (
        <p className="text-red-500 text-sm mt-1">{errors.ticketType.message}</p>
      )}
      
      {watchTicketType === TICKET_TYPES.RICE_STUDENT && (
        <p className="text-gray-600 text-sm mt-1">
          Rice Student tickets require a valid Rice University email address.
        </p>
      )}
      
      {watchTicketType === TICKET_TYPES.NON_RICE_STUDENT && (
        <p className="text-gray-600 text-sm mt-1">
          Student tickets require a valid .edu email address.
        </p>
      )}
    </div>
  );
};

export default TicketTypeSelection;
