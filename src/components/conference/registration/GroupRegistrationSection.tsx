
import { useEffect } from "react";
import { Control, UseFormWatch, UseFormSetValue, UseFormRegister, FieldErrors } from "react-hook-form";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface GroupRegistrationSectionProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

/**
 * GroupRegistrationSection Component
 * 
 * Handles group registration for conference attendance:
 * - Collects group size and member email addresses
 * - Shows only for student-group ticket type
 * - Dynamically manages email input fields based on group size
 * - Validates group member email addresses
 */
const GroupRegistrationSection = ({
  watch,
  setValue,
  control,
  register,
  errors
}: GroupRegistrationSectionProps) => {
  const ticketType = watch("ticketType");
  const groupSize = watch("groupSize");
  const groupEmails = watch("groupEmails") || [];
  
  // Only show for student group ticket type
  if (ticketType !== TICKET_TYPES_ENUM.STUDENT_GROUP) {
    return null;
  }
  
  // Update the group email array when group size changes
  useEffect(() => {
    if (groupSize && groupSize > 0) {
      // Get the current emails array
      const currentEmails = groupEmails || [];
      
      // If group size is increased, add empty slots
      if (currentEmails.length < groupSize - 1) {
        const newEmails = [...currentEmails];
        
        // Add empty slots until we have group size - 1 (one for the main registrant)
        for (let i = currentEmails.length; i < groupSize - 1; i++) {
          newEmails.push({ email: "" });
        }
        
        setValue("groupEmails", newEmails);
      } 
      // If group size is decreased, remove excess slots
      else if (currentEmails.length > groupSize - 1 && groupSize > 1) {
        setValue("groupEmails", currentEmails.slice(0, groupSize - 1));
      }
    }
  }, [groupSize, setValue, groupEmails]);

  return (
    <Card className="bg-gray-50 dark:bg-gray-800/50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Group Registration Details</h3>
          
          <div>
            <Label htmlFor="groupSize" className="font-lora mb-1 block">Group Size</Label>
            <Controller
              name="groupSize"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString() || "5"}
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <SelectTrigger id="groupSize" className="w-full md:w-40">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 16 }, (_, i) => i + 5).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} people
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          
          {groupSize && groupSize > 1 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Please provide the email addresses of all group members. You'll be the group leader.
              </p>
              
              {Array.from({ length: groupSize - 1 }, (_, index) => (
                <div key={index} className="relative">
                  <Label htmlFor={`groupEmail-${index}`} className="sr-only">
                    Group Member {index + 1} Email
                  </Label>
                  <Controller
                    name={`groupEmails.${index}.email`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        id={`groupEmail-${index}`}
                        type="email"
                        placeholder={`Member ${index + 1} email address`}
                        {...field}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupRegistrationSection;
