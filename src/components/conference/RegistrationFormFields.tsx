import { useState, useEffect } from "react";
import { UseFormRegister, FormState, UseFormSetValue, UseFormWatch, Control, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RegistrationFormData,
  getTicketPriceText,
  TICKET_TYPES,
  validateEmailDomain
} from "./RegistrationFormTypes";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RegistrationFormFieldsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
}

const RegistrationFormFields = ({ 
  register, 
  errors, 
  setValue, 
  watch,
  control,
  onEmailValidation
}: RegistrationFormFieldsProps) => {
  const watchTicketType = watch("ticketType");
  const watchEmail = watch("email");
  const { toast } = useToast();
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupEmails",
  });

  const isStudentGroup = watchTicketType === TICKET_TYPES.STUDENT_GROUP;
  
  useEffect(() => {
    // Reset group size when ticket type changes
    if (!isStudentGroup) {
      setValue("groupSize", undefined);
      setValue("groupEmails", []);
    } else if (!watch("groupSize")) {
      setValue("groupSize", 5); // Default group size
    }
  }, [watchTicketType, setValue, isStudentGroup, watch]);

  useEffect(() => {
    // When email changes and ticket type is set, validate the email domain
    const validateEmail = async () => {
      if (watchEmail && watchTicketType) {
        setIsCheckingEmail(true);
        
        try {
          // Client-side basic validation
          const initialValidation = validateEmailDomain(watchEmail);
          
          if (!initialValidation.isValid) {
            if (onEmailValidation) {
              onEmailValidation({ isValid: false, message: "Invalid email format" });
            }
            setIsCheckingEmail(false);
            return;
          }
          
          // Server-side validation with database check
          const { data, error } = await supabase.functions.invoke('verify-email-domain', {
            body: {
              email: watchEmail,
              ticketType: watchTicketType
            }
          });
          
          if (error) {
            console.error("Error validating email domain:", error);
            toast({
              title: "Email validation error",
              description: "There was an error validating your email domain. Please try again.",
              variant: "destructive",
            });
            if (onEmailValidation) {
              onEmailValidation({ isValid: false, message: "Error validating email" });
            }
          } else if (data) {
            if (onEmailValidation) {
              onEmailValidation({ 
                isValid: data.isValid, 
                message: data.message 
              });
            }
            
            if (!data.isValid) {
              toast({
                title: "Email domain not valid",
                description: data.message,
                variant: "destructive",
              });
            }
          }
        } catch (error) {
          console.error("Error in email validation:", error);
          if (onEmailValidation) {
            onEmailValidation({ isValid: false, message: "Error validating email" });
          }
        } finally {
          setIsCheckingEmail(false);
        }
      }
    };
    
    const debounceTimeout = setTimeout(() => {
      validateEmail();
    }, 500); // Debounce the validation
    
    return () => clearTimeout(debounceTimeout);
  }, [watchEmail, watchTicketType, toast, onEmailValidation]);

  const addGroupMember = () => {
    append({ value: "" });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...register("email")}
          className={isCheckingEmail ? "bg-gray-100" : ""}
        />
        {isCheckingEmail && (
          <p className="text-gray-500 text-sm mt-1">Checking email...</p>
        )}
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          placeholder="Enter your organization name"
          {...register("organization")}
        />
        {errors.organization && (
          <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="role">Your Role</Label>
        <Input
          id="role"
          placeholder="Your position or role"
          {...register("role")}
        />
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="ticketType">Ticket Type</Label>
        <Select 
          onValueChange={(value) => setValue("ticketType", value)}
          value={watchTicketType}
        >
          <SelectTrigger id="ticketType">
            <SelectValue placeholder="Select ticket type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TICKET_TYPES.RICE_STUDENT}>Rice Student {getTicketPriceText(TICKET_TYPES.RICE_STUDENT)}</SelectItem>
            <SelectItem value={TICKET_TYPES.NON_RICE_STUDENT}>Non-Rice Student {getTicketPriceText(TICKET_TYPES.NON_RICE_STUDENT)}</SelectItem>
            <SelectItem value={TICKET_TYPES.YOUNG_PROFESSIONAL}>Young Professional {getTicketPriceText(TICKET_TYPES.YOUNG_PROFESSIONAL)}</SelectItem>
            <SelectItem value={TICKET_TYPES.STUDENT_GROUP}>Student Group {getTicketPriceText(TICKET_TYPES.STUDENT_GROUP)}</SelectItem>
            <SelectItem value={TICKET_TYPES.SPEAKER}>Speaker {getTicketPriceText(TICKET_TYPES.SPEAKER)}</SelectItem>
          </SelectContent>
        </Select>
        {errors.ticketType && (
          <p className="text-red-500 text-sm mt-1">{errors.ticketType.message}</p>
        )}
        
        {watchTicketType === TICKET_TYPES.RICE_STUDENT && (
          <p className="text-gray-600 text-sm mt-1">
            Rice Student tickets require a valid Rice University email address.
          </p>
        )}
        
        {watchTicketType === TICKET_TYPES.NON_RICE_STUDENT && (
          <p className="text-gray-600 text-sm mt-1">
            Student tickets require a valid .edu email address.
          </p>
        )}
        
        {isStudentGroup && (
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="groupSize">Group Size</Label>
              <Select 
                onValueChange={(value) => setValue("groupSize", parseInt(value))}
                value={watch("groupSize")?.toString() || "5"}
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
                    {...register(`groupEmails.${index}.value` as any)}
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
              
              {fields.length < (watch("groupSize") || 5) && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addGroupMember}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Group Member
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requests or accommodations (optional)"
          {...register("specialRequests")}
        />
      </div>
    </div>
  );
};

export default RegistrationFormFields;
