
import { UseFormWatch, UseFormSetValue, Control, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, AlignJustify, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RegistrationFormData, calculateTotalPrice } from "../RegistrationFormTypes";

interface GroupRegistrationProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  errors?: any;
}

/**
 * GroupRegistration Component
 * 
 * Handles the group registration form fields:
 * - Group size selection (minimum 5 people)
 * - Group member email collection
 * - Validation for group size and email domains
 * - Price calculation and display
 * 
 * @param watch - React Hook Form watch function
 * @param setValue - React Hook Form setValue function
 * @param control - React Hook Form control object
 * @param errors - Form validation errors
 */
const GroupRegistration = ({ watch, setValue, control, errors }: GroupRegistrationProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupEmails",
  });

  const groupSize = watch("groupSize") || 5;
  const totalPrice = calculateTotalPrice("student-group", groupSize);
  
  return (
    <div className="mt-4 space-y-4">
      <div className="p-4 bg-blue-50 rounded-md">
        <div className="flex items-start mb-2">
          <Users className="h-5 w-5 text-blue-500 mr-2 mt-1" />
          <div>
            <h3 className="font-medium text-blue-700">Group Registration</h3>
            <p className="text-sm text-blue-600">
              Register multiple students at a discounted rate ($30/person).
              All group members must have valid .edu email addresses.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="groupSize">Group Size</Label>
        <Select 
          onValueChange={(value) => setValue("groupSize", parseInt(value))}
          value={groupSize.toString()}
        >
          <SelectTrigger id="groupSize">
            <SelectValue placeholder="Select group size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 People</SelectItem>
            <SelectItem value="6">6 People</SelectItem>
            <SelectItem value="7">7 People</SelectItem>
            <SelectItem value="8">8 People</SelectItem>
            <SelectItem value="9">9 People</SelectItem>
            <SelectItem value="10">10 People</SelectItem>
          </SelectContent>
        </Select>
        {errors?.groupSize && (
          <p className="text-red-500 text-sm mt-1">{errors.groupSize.message}</p>
        )}
        
        <div className="mt-2 p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Price per person:</span>
            <span className="font-medium">$30</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-gray-700">Group size:</span>
            <span className="font-medium">{groupSize} people</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center text-lg font-medium">
            <span>Total price:</span>
            <span className="text-blue-700">${totalPrice}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Group Member Emails</Label>
        <p className="text-gray-600 text-sm">
          You will be the group leader. Please provide emails for all group members (including yourself).
        </p>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input
              placeholder={`Group member ${index + 1} email`}
              {...control.register(`groupEmails.${index}.value` as const)}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {fields.length < groupSize && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => append({ value: "" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Group Member
          </Button>
        )}
        
        {fields.length > 0 && fields.length < groupSize && (
          <Alert className="bg-amber-50 text-amber-800 border-amber-200">
            <AlignJustify className="h-4 w-4" />
            <AlertDescription>
              Please add {groupSize - fields.length} more email{fields.length === groupSize - 1 ? '' : 's'} to match your group size of {groupSize}.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default GroupRegistration;
