
import { UseFormRegister, UseFormSetValue, UseFormWatch, useFieldArray, Control } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash, PlusCircle, Info, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * GroupRegistrationSection Component
 * 
 * Manages the group registration flow where a primary registrant can
 * register multiple attendees at once.
 * 
 * Features:
 * - Dynamically add/remove group members
 * - Validate email formats
 * - Display clear feedback on requirements
 * 
 * @param register - React Hook Form register function
 * @param setValue - React Hook Form setValue function
 * @param watch - React Hook Form watch function
 * @param control - React Hook Form control object
 * @param errors - Form validation errors
 */
interface GroupRegistrationSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  errors: any;
}

const GroupRegistrationSection = ({
  register,
  setValue,
  watch,
  control,
  errors,
}: GroupRegistrationSectionProps) => {
  const ticketType = watch("ticketType");
  const groupSize = watch("groupSize");
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupEmails",
  });

  // Only show this section if the ticket type is student-group
  if (ticketType !== "student-group") {
    return null;
  }

  // Add an email field when a user increases the group size
  const handleAddEmail = () => {
    append({ email: "" });
  };

  // Calculate how many more emails are needed to match the group size
  const getEmailsNeeded = () => {
    if (!groupSize || !fields) return 0;
    return Math.max(0, groupSize - fields.length);
  };

  const emailsNeeded = getEmailsNeeded();

  return (
    <div className="space-y-6 mt-6 p-6 border rounded-lg bg-gray-50">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold font-lora">Group Members</h3>
          <p className="text-sm text-gray-600 mt-1">
            Please provide the email addresses of all group members.
          </p>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5 text-gray-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>
                All group members will receive a confirmation email with their
                ticket information. You are responsible for ensuring their
                information is correct.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Email list */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="flex-1">
              <Label
                htmlFor={`groupEmails.${index}.email`}
                className="sr-only"
              >
                Group Member Email {index + 1}
              </Label>
              <Input
                id={`groupEmails.${index}.email`}
                type="email"
                placeholder={`Group member ${index + 1} email`}
                {...register(`groupEmails.${index}.email`)}
                className={cn(
                  errors?.groupEmails?.[index]?.email && "border-red-500"
                )}
              />
              {errors?.groupEmails?.[index]?.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.groupEmails[index].email.message}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              className="shrink-0"
            >
              <Trash className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Remove email</span>
            </Button>
          </div>
        ))}
      </div>

      {/* Show warning if emails don't match group size */}
      {groupSize && fields.length !== groupSize && (
        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            {emailsNeeded > 0
              ? `Please add ${emailsNeeded} more email${
                  emailsNeeded === 1 ? "" : "s"
                } to match your group size of ${groupSize}.`
              : `You have ${Math.abs(
                  emailsNeeded
                )} too many emails for your group size of ${groupSize}.`}
          </p>
        </div>
      )}

      {/* Add email button */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddEmail}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add another group member
      </Button>
    </div>
  );
};

export default GroupRegistrationSection;
