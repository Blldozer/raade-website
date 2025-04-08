
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData, TicketType } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

/**
 * TicketTypeSelection Component
 * 
 * Allows users to select their ticket type and, if selecting a group ticket,
 * specify the group size.
 * 
 * @param register - React Hook Form register function
 * @param setValue - React Hook Form setValue function
 * @param watch - React Hook Form watch function
 */
interface TicketTypeSelectionProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  errors: any;
}

const TicketTypeSelection = ({
  register,
  setValue,
  watch,
  errors,
}: TicketTypeSelectionProps) => {
  const ticketType = watch("ticketType");
  
  const handleTicketTypeChange = (value: TicketType) => {
    setValue("ticketType", value);
    
    // Reset group size if not selecting student-group
    if (value !== "student-group") {
      setValue("groupSize", undefined);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ticketType" className="text-base font-lora">Ticket Type</Label>
        <RadioGroup
          value={ticketType}
          onValueChange={(value) => handleTicketTypeChange(value as TicketType)}
          className="grid gap-4 md:grid-cols-3 mt-2"
        >
          <div className="relative flex items-start">
            <RadioGroupItem
              value="student"
              id="student"
              className="peer sr-only"
            />
            <Label
              htmlFor="student"
              className="flex flex-col p-4 border rounded-lg cursor-pointer bg-white hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 w-full"
            >
              <span className="font-semibold">Student</span>
              <span className="text-sm text-gray-500 mt-1">
                For currently enrolled students
              </span>
              <span className="font-bold mt-2">$30</span>
            </Label>
          </div>

          <div className="relative flex items-start">
            <RadioGroupItem
              value="professional"
              id="professional"
              className="peer sr-only"
            />
            <Label
              htmlFor="professional"
              className="flex flex-col p-4 border rounded-lg cursor-pointer bg-white hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 w-full"
            >
              <span className="font-semibold">Professional</span>
              <span className="text-sm text-gray-500 mt-1">
                For industry professionals
              </span>
              <span className="font-bold mt-2">$75</span>
            </Label>
          </div>

          <div className="relative flex items-start">
            <RadioGroupItem
              value="student-group"
              id="student-group"
              className="peer sr-only"
            />
            <Label
              htmlFor="student-group"
              className="flex flex-col p-4 border rounded-lg cursor-pointer bg-white hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 w-full"
            >
              <span className="font-semibold">Student Group</span>
              <span className="text-sm text-gray-500 mt-1">
                For student organizations (min. 5)
              </span>
              <span className="font-bold mt-2">$25 per student</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {ticketType === "student-group" && (
        <div className="mt-4">
          <Label htmlFor="groupSize" className="font-lora">Group Size (minimum 5)</Label>
          <Input
            type="number"
            id="groupSize"
            min={5}
            max={50}
            className="w-full md:w-1/3"
            {...register("groupSize", { min: 5, max: 50 })}
          />
          {errors.groupSize && (
            <p className="text-sm text-red-500 mt-1">
              {errors.groupSize.type === "min"
                ? "Minimum group size is 5"
                : errors.groupSize.type === "max"
                ? "Maximum group size is 50"
                : errors.groupSize.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketTypeSelection;
