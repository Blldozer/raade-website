import { UseFormWatch, UseFormSetValue, Control, useFieldArray, FieldErrors } from "react-hook-form";
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
import { RegistrationFormData, calculateTotalPrice, getTicketPrice, getRegularTicketPrice } from "../RegistrationFormTypes";

interface GroupRegistrationProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  errors?: FieldErrors<RegistrationFormData>;
}

/**
 * GroupRegistration Component
 * 
 * Handles the group registration form fields:
 * - Group size selection (minimum 3 people for sale)
 * - Group member name and email collection with proper autocomplete attributes
 * - Validation for group size and email domains
 * - Price calculation and display
 * - Mobile-responsive layout with accessible form controls
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

  const groupSize = watch("groupSize") || 3; // Default to 3 now instead of 5
  const totalPrice = calculateTotalPrice("student-group", groupSize);
  // Get the per-person price dynamically from the pricing configuration
  const perPersonPrice = getRegularTicketPrice("student-group");
  
  return (
    <div className="mt-4 space-y-4">
      <div className="p-4 bg-blue-50 rounded-md">
        <div className="flex items-start mb-2">
          <Users className="h-5 w-5 text-blue-500 mr-2 mt-1" />
          <div>
            <h3 className="font-medium text-blue-700">Group Registration</h3>
            <p className="text-sm text-blue-600">
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-medium">SALE!</span> Register 3+ students at a discounted rate ($30/person).
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
          <SelectTrigger id="groupSize" name="groupSize">
            <SelectValue placeholder="Select group size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 People</SelectItem>
            <SelectItem value="4">4 People</SelectItem>
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
            <span className="font-medium">${perPersonPrice}</span>
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
        <Label>Group Member Information</Label>
        <p className="text-gray-600 text-sm">
          You will be the group leader. Please provide names and emails for all group members (including yourself).
        </p>
        
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2 p-3 border border-gray-200 rounded-md">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Member {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                aria-label={`Remove group member ${index + 1}`}
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
            
            <div className="grid gap-2">
              <div>
                <Label htmlFor={`groupMemberName${index + 1}`}>Full Name</Label>
                <Input
                  placeholder="Full name"
                  id={`groupMemberName${index + 1}`}
                  name={`groupMemberName${index + 1}`}
                  type="text"
                  autoComplete={index === 0 ? "name" : `member-name-${index + 1}`}
                  {...control.register(`groupEmails.${index}.firstName` as const)}
                  aria-label={`First name for group member ${index + 1}`}
                />
              </div>
              
              <div>
                <Label htmlFor={`groupMemberLastName${index + 1}`}>Last Name</Label>
                <Input
                  placeholder="Last name"
                  id={`groupMemberLastName${index + 1}`}
                  name={`groupMemberLastName${index + 1}`}
                  type="text"
                  autoComplete={index === 0 ? "family-name" : `member-family-name-${index + 1}`}
                  {...control.register(`groupEmails.${index}.lastName` as const)}
                  aria-label={`Last name for group member ${index + 1}`}
                />
              </div>
              
              <div>
                <Label htmlFor={`groupEmail${index + 1}`}>Email (.edu required)</Label>
                <Input
                  placeholder="Email address"
                  id={`groupEmail${index + 1}`}
                  name={`groupEmail${index + 1}`}
                  type="email"
                  autoComplete={index === 0 ? "email" : `email-${index + 1}`}
                  {...control.register(`groupEmails.${index}.value` as const)}
                  aria-label={`Email address for group member ${index + 1}`}
                />
              </div>
            </div>
          </div>
        ))}
        
        {fields.length < groupSize && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => append({ value: "", firstName: "", lastName: "" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Group Member
          </Button>
        )}
        
        {fields.length > 0 && fields.length < groupSize && (
          <Alert className="bg-amber-50 text-amber-800 border-amber-200">
            <AlignJustify className="h-4 w-4" />
            <AlertDescription>
              Please add {groupSize - fields.length} more member{fields.length === groupSize - 1 ? '' : 's'} to match your group size of {groupSize}.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default GroupRegistration;
