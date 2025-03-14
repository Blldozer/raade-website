
import { UseFormWatch, UseFormSetValue, Control, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegistrationFormData } from "../RegistrationFormTypes";

interface GroupRegistrationProps {
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  control: Control<RegistrationFormData>;
}

const GroupRegistration = ({ watch, setValue, control }: GroupRegistrationProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupEmails",
  });

  const groupSize = watch("groupSize") || 5;

  return (
    <div className="mt-4 space-y-4">
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
        <p className="text-gray-600 text-sm mt-1">
          Group registration requires a minimum of 5 students. All members must have .edu email addresses.
        </p>
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
      </div>
    </div>
  );
};

export default GroupRegistration;
