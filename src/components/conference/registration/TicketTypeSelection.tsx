
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM, getTicketPrice, getRegularTicketPrice, isSaleActive } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TicketTypeSelectionProps {
  register: UseFormRegister<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

/**
 * TicketTypeSelection Component
 * 
 * Displays available ticket types for the conference:
 * - Student, Professional, and Student Group options
 * - Shows regular and sale prices when applicable
 * - Handles selection of ticket type
 * - Provides visual feedback for selected option
 */
const TicketTypeSelection = ({
  register,
  watch,
  setValue,
  errors
}: TicketTypeSelectionProps) => {
  const selectedTicketType = watch("ticketType");
  const saleActive = isSaleActive();

  // Handle ticket type change
  const handleTicketTypeChange = (value: string) => {
    setValue("ticketType", value as RegistrationFormData["ticketType"]);
    
    // Reset group size if switching from group ticket
    if (value !== TICKET_TYPES_ENUM.STUDENT_GROUP && watch("groupSize")) {
      setValue("groupSize", undefined);
      setValue("groupEmails", []);
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-lora">Ticket Type</Label>
        <p className="text-sm text-gray-500 mb-2">Select the ticket type that best fits your situation.</p>
      </div>
      
      <RadioGroup
        value={selectedTicketType}
        onValueChange={handleTicketTypeChange}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Student Ticket */}
        <div>
          <RadioGroupItem
            id="student"
            value={TICKET_TYPES_ENUM.STUDENT}
            className="sr-only"
            {...register("ticketType")}
          />
          <Label
            htmlFor="student"
            className={`flex flex-col h-full p-4 rounded-md border-2 cursor-pointer transition-colors
              ${selectedTicketType === TICKET_TYPES_ENUM.STUDENT ? 'border-[#FBB03B] bg-[#FBB03B]/10' : 'border-gray-200 hover:border-[#FBB03B]/50 dark:border-gray-700'}
            `}
          >
            <div className="flex justify-between items-start">
              <span className="font-semibold text-lg">Student</span>
              {saleActive && <Badge className="bg-red-500">SALE!</Badge>}
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-bold text-xl">${getTicketPrice(TICKET_TYPES_ENUM.STUDENT)}</span>
              {saleActive && (
                <span className="text-gray-500 line-through text-sm">
                  ${getRegularTicketPrice(TICKET_TYPES_ENUM.STUDENT)}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              For all students with valid .edu email
            </p>
          </Label>
        </div>
        
        {/* Professional Ticket */}
        <div>
          <RadioGroupItem
            id="professional"
            value={TICKET_TYPES_ENUM.PROFESSIONAL}
            className="sr-only"
            {...register("ticketType")}
          />
          <Label
            htmlFor="professional"
            className={`flex flex-col h-full p-4 rounded-md border-2 cursor-pointer transition-colors
              ${selectedTicketType === TICKET_TYPES_ENUM.PROFESSIONAL ? 'border-[#FBB03B] bg-[#FBB03B]/10' : 'border-gray-200 hover:border-[#FBB03B]/50 dark:border-gray-700'}
            `}
          >
            <div className="flex justify-between items-start">
              <span className="font-semibold text-lg">Professional</span>
              {saleActive && <Badge className="bg-red-500">SALE!</Badge>}
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-bold text-xl">${getTicketPrice(TICKET_TYPES_ENUM.PROFESSIONAL)}</span>
              {saleActive && (
                <span className="text-gray-500 line-through text-sm">
                  ${getRegularTicketPrice(TICKET_TYPES_ENUM.PROFESSIONAL)}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              For industry professionals and faculty
            </p>
          </Label>
        </div>
        
        {/* Student Group Ticket */}
        <div>
          <RadioGroupItem
            id="student-group"
            value={TICKET_TYPES_ENUM.STUDENT_GROUP}
            className="sr-only"
            {...register("ticketType")}
          />
          <Label
            htmlFor="student-group"
            className={`flex flex-col h-full p-4 rounded-md border-2 cursor-pointer transition-colors
              ${selectedTicketType === TICKET_TYPES_ENUM.STUDENT_GROUP ? 'border-[#FBB03B] bg-[#FBB03B]/10' : 'border-gray-200 hover:border-[#FBB03B]/50 dark:border-gray-700'}
            `}
          >
            <div className="flex justify-between items-start">
              <span className="font-semibold text-lg">Student Group</span>
              {saleActive && <Badge className="bg-red-500">SALE!</Badge>}
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-bold text-xl">${getTicketPrice(TICKET_TYPES_ENUM.STUDENT_GROUP)}/person</span>
              {saleActive && (
                <span className="text-gray-500 line-through text-sm">
                  ${getRegularTicketPrice(TICKET_TYPES_ENUM.STUDENT_GROUP)}/person
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              For student groups of 3 or more
            </p>
          </Label>
        </div>
      </RadioGroup>
      
      {errors.ticketType && (
        <p className="text-red-500 text-sm">{errors.ticketType.message}</p>
      )}
    </div>
  );
};

export default TicketTypeSelection;
