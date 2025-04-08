
import { useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch, Control, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";
import { PlusCircle, Trash2, UserIcon } from "lucide-react";

interface GroupRegistrationSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  errors: any;
}

/**
 * GroupRegistrationSection Component
 * 
 * Handles the collection of email addresses for group registrations:
 * - Dynamically adds input fields based on group size
 * - Validates email formats
 * - Allows removal of individual emails
 * - Only displays when group ticket type is selected
 */
const GroupRegistrationSection = ({
  register,
  watch,
  setValue,
  control,
  errors
}: GroupRegistrationSectionProps) => {
  const ticketType = watch("ticketType");
  const groupSize = watch("groupSize");
  
  // Use field array to handle dynamic group email inputs
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupEmails",
  });
  
  // Only show group registration section for student-group ticket type
  if (ticketType !== TICKET_TYPES_ENUM.STUDENT_GROUP || !groupSize || groupSize < 3) {
    return null;
  }
  
  // Calculate how many additional members needed (excluding the registrant)
  const additionalMembersNeeded = groupSize - 1;
  const currentMemberCount = fields.length;
  
  // Add empty inputs if needed based on group size
  if (currentMemberCount < additionalMembersNeeded) {
    const missingCount = additionalMembersNeeded - currentMemberCount;
    for (let i = 0; i < missingCount; i++) {
      append({ email: "" });
    }
  }
  
  return (
    <div className="space-y-4 p-4 border border-blue-100 bg-blue-50 rounded-md dark:border-blue-900 dark:bg-blue-900/20">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Group Member Information</h3>
        <span className="text-sm text-gray-500">
          {fields.length} of {additionalMembersNeeded} members added
        </span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Please provide the email addresses of all group members. Each member will receive their own registration confirmation.
      </p>
      
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="w-6 text-gray-400 text-right">
              {index + 1}.
            </div>
            <div className="flex-1">
              <Input
                placeholder={`Group member ${index + 1} email`}
                type="email"
                {...register(`groupEmails.${index}.email` as const)}
                className={
                  errors.groupEmails?.[index]?.email ? "border-red-500" : ""
                }
              />
              {errors.groupEmails?.[index]?.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.groupEmails[index].email.message}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                remove(index);
                // Append a new empty email at the end to maintain the count
                append({ email: "" });
              }}
              aria-label={`Remove member ${index + 1}`}
            >
              <Trash2 className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="text-sm text-gray-500 flex items-start gap-2 mt-2">
        <UserIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <p>
          You are included as the group leader and will be the main contact for this registration.
        </p>
      </div>
    </div>
  );
};

export default GroupRegistrationSection;
