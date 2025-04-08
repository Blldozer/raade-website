
import { UseFormWatch, UseFormSetValue, Control, useFieldArray } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Minus, Plus, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { validateTicketEmailDomain } from "../RegistrationFormTypes";
import { useState, useEffect } from "react";

/**
 * GroupRegistrationSection Component
 * 
 * Handles group registration form fields:
 * - Shows/hides based on ticket type
 * - Manages group size selection
 * - Collects email addresses for each group member
 * - Validates student emails for .edu domains
 * 
 * @param watch - React Hook Form watch function
 * @param setValue - React Hook Form setValue function
 * @param control - React Hook Form control object
 */
interface GroupRegistrationSectionProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  control: Control<RegistrationFormData>;
}

const GroupRegistrationSection = ({
  watch,
  setValue,
  control
}: GroupRegistrationSectionProps) => {
  const [emailValidations, setEmailValidations] = useState<Record<number, { isValid: boolean; message?: string }>>({});
  
  const ticketType = watch("ticketType");
  const groupSize = watch("groupSize") || 0;
  
  // For student groups, use field array to manage multiple email inputs
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupEmails",
  });
  
  // When group size changes, adjust the number of email fields
  useEffect(() => {
    if (ticketType !== "student-group") return;

    // Add or remove email fields based on group size
    const currentLength = fields.length;
    
    if (groupSize > currentLength) {
      // Add new email fields
      for (let i = currentLength; i < groupSize; i++) {
        append({ value: "" });
      }
    } else if (groupSize < currentLength) {
      // Remove excess email fields
      for (let i = currentLength - 1; i >= groupSize; i--) {
        remove(i);
      }
    }
  }, [groupSize, fields.length, append, remove, ticketType]);

  // When an email value changes, validate it
  const handleEmailChange = (index: number, email: string) => {
    const result = validateTicketEmailDomain(email, ticketType);
    setEmailValidations(prev => ({
      ...prev,
      [index]: result
    }));
  };

  // If ticket type is not student-group, don't show this section
  if (ticketType !== "student-group") {
    return null;
  }

  return (
    <div className="space-y-4 border p-4 rounded-md border-gray-200 dark:border-gray-700">
      <div>
        <Label htmlFor="groupSize" className="font-lora">Group Size</Label>
        <div className="flex items-center space-x-3 mt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => {
              const newSize = Math.max(2, (groupSize || 5) - 1);
              setValue("groupSize", newSize);
            }}
            disabled={groupSize <= 2}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <Input 
            id="groupSize" 
            type="number"
            min="2"
            max="20"
            className="w-20 text-center"
            value={groupSize || 5}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setValue("groupSize", isNaN(value) ? 5 : Math.max(2, Math.min(20, value)));
            }}
          />
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => {
              const newSize = Math.min(20, (groupSize || 5) + 1);
              setValue("groupSize", newSize);
            }}
            disabled={groupSize >= 20}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Minimum 2, maximum 20 people per group
        </p>
      </div>
      
      <div className="space-y-2">
        <Label className="font-lora">Group Member Emails</Label>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Please enter the email addresses of all group members. For student tickets, .edu email addresses are required.
        </p>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                placeholder={`Group member ${index + 1} email`}
                value={typeof field.value === 'object' && field.value !== null ? field.value.value : field.value || ''}
                onChange={(e) => {
                  setValue(`groupEmails.${index}`, { value: e.target.value });
                  handleEmailChange(index, e.target.value);
                }}
                className={emailValidations[index]?.isValid === false ? "border-red-300 pr-10" : ""}
              />
              {emailValidations[index] && !emailValidations[index].isValid && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="h-8 w-8"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        {Object.values(emailValidations).some(v => !v.isValid) && (
          <p className="text-red-500 text-sm">All student group members must use .edu email addresses</p>
        )}
      </div>
    </div>
  );
};

export default GroupRegistrationSection;
