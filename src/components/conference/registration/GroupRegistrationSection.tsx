
import { useState, useEffect } from "react";
import { Control, UseFormSetValue, UseFormWatch, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GroupRegistrationSectionProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  control: Control<RegistrationFormData>;
}

/**
 * GroupRegistrationSection Component
 * 
 * Handles group registration functionality:
 * - Displays only when student-group ticket type is selected
 * - Allows selecting group size (3-10)
 * - Dynamically adds/removes email input fields based on group size
 * - Collects first and last name for each group member
 * - Validates email addresses for group members
 * 
 * @param watch - React Hook Form watch function for reactive updates
 * @param setValue - React Hook Form setValue function
 * @param control - React Hook Form control object
 */
const GroupRegistrationSection = ({ 
  watch, 
  setValue,
  control
}: GroupRegistrationSectionProps) => {
  const [groupSizeOptions] = useState(Array.from({ length: 8 }, (_, i) => i + 3)); // Group sizes 3-10
  const ticketType = watch("ticketType");
  const groupSize = watch("groupSize");
  
  // Use fieldArray for dynamic management of group emails
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "groupEmails"
  });
  
  // Update the group emails array when group size changes
  useEffect(() => {
    if (ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP && groupSize) {
      // Calculate how many email fields we need (groupSize minus the lead)
      const targetLength = groupSize - 1;
      const currentLength = fields.length;
      
      if (targetLength > currentLength) {
        // We need to add more fields
        const fieldsToAdd = targetLength - currentLength;
        for (let i = 0; i < fieldsToAdd; i++) {
          append({ value: "", firstName: "", lastName: "" });
        }
      } else if (targetLength < currentLength) {
        // We need to remove some fields
        const fieldsToRemove = currentLength - targetLength;
        for (let i = 0; i < fieldsToRemove; i++) {
          remove(currentLength - 1 - i);
        }
      }
    }
  }, [ticketType, groupSize, fields.length, append, remove]);
  
  // If not student group, don't render anything
  if (ticketType !== TICKET_TYPES_ENUM.STUDENT_GROUP) {
    return null;
  }
  
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-[#274675] dark:text-white">Group Registration</h3>
      
      <div className="mb-6">
        <Label htmlFor="groupSize">Number of people in your group (including yourself)</Label>
        <Select
          value={groupSize?.toString()}
          onValueChange={(value) => {
            setValue("groupSize", parseInt(value));
          }}
        >
          <SelectTrigger id="groupSize" className="w-full">
            <SelectValue placeholder="Select group size" />
          </SelectTrigger>
          <SelectContent>
            {groupSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size} people
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
          Enter the emails of your group members below. Each person must have a unique email.
        </p>
      </div>
      
      {/* Only show email fields if group size is selected */}
      {groupSize && groupSize > 1 && (
        <div className="space-y-6">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Group Member Information</h4>
          
          {fields.map((field, index) => (
            <div key={field.id} className="p-3 border border-gray-200 rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Member {index + 2}</span>
                
                {fields.length > 1 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      // Remove this field and update the group size
                      remove(index);
                      setValue("groupSize", groupSize - 1);
                    }}
                    className="h-7 w-7 p-0 text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <Label htmlFor={`member-${index}-firstName`} className="text-sm">First Name</Label>
                  <Input
                    id={`member-${index}-firstName`}
                    value={field.firstName || ""}
                    onChange={(e) => {
                      update(index, { 
                        value: field.value, 
                        firstName: e.target.value, 
                        lastName: field.lastName || "" 
                      });
                    }}
                    placeholder="First name"
                    className="text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`member-${index}-lastName`} className="text-sm">Last Name</Label>
                  <Input
                    id={`member-${index}-lastName`}
                    value={field.lastName || ""}
                    onChange={(e) => {
                      update(index, { 
                        value: field.value, 
                        firstName: field.firstName || "", 
                        lastName: e.target.value 
                      });
                    }}
                    placeholder="Last name"
                    className="text-sm"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`member-${index}-email`} className="text-sm">Email Address</Label>
                <Input
                  id={`member-${index}-email`}
                  value={field.value}
                  onChange={(e) => {
                    update(index, { 
                      value: e.target.value, 
                      firstName: field.firstName || "", 
                      lastName: field.lastName || "" 
                    });
                  }}
                  placeholder="Group member's email"
                  type="email"
                  className="text-sm"
                />
              </div>
            </div>
          ))}
          
          {/* Button to add more members */}
          {groupSize < 10 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                append({ value: "", firstName: "", lastName: "" });
                setValue("groupSize", (groupSize || 0) + 1);
              }}
              className="w-full mt-2"
            >
              Add Another Group Member
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupRegistrationSection;
