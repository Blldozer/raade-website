
import { UseFormRegister, FormState, UseFormWatch } from "react-hook-form";
import { RegistrationFormData, validateTicketEmailDomain } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

/**
 * BasicInformationSection Component
 * 
 * Renders form fields for collecting basic information:
 * - Full name
 * - Email (with validation)
 * - Organization
 * - Role
 * 
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @param watch - React Hook Form watch function
 * @param onEmailValidation - Callback for reporting email validation results
 */
interface BasicInformationSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  watch: UseFormWatch<RegistrationFormData>;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
}

const BasicInformationSection = ({ 
  register, 
  errors, 
  watch,
  onEmailValidation
}: BasicInformationSectionProps) => {
  const [emailValidation, setEmailValidation] = useState<{ isValid: boolean; message?: string } | null>(null);
  
  const watchEmail = watch("email");
  const watchTicketType = watch("ticketType");
  
  // Validate email based on ticket type
  useEffect(() => {
    if (watchEmail && watchTicketType) {
      const result = validateTicketEmailDomain(watchEmail, watchTicketType);
      setEmailValidation(result);
      
      // If a callback is provided, call it with the validation result
      if (onEmailValidation) {
        onEmailValidation(result);
      }
    } else {
      setEmailValidation(null);
      
      // If a callback is provided and we're clearing validation, call it
      if (onEmailValidation) {
        onEmailValidation({ isValid: false });
      }
    }
  }, [watchEmail, watchTicketType, onEmailValidation]);
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="font-lora">Full Name</Label>
        <Input 
          id="fullName" 
          className={errors.fullName ? "border-red-500" : ""} 
          {...register("fullName")} 
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="email" className="font-lora">Email Address</Label>
        <div className="relative">
          <Input 
            id="email" 
            type="email"
            className={errors.email ? "border-red-500" : ""} 
            {...register("email")} 
          />
          {emailValidation && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {emailValidation.isValid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        {emailValidation && !emailValidation.isValid && (
          <p className="text-amber-600 text-sm mt-1">{emailValidation.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="organization" className="font-lora">Organization/University</Label>
        <Input 
          id="organization" 
          className={errors.organization ? "border-red-500" : ""} 
          {...register("organization")} 
        />
        {errors.organization && (
          <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="role" className="font-lora">Role/Title</Label>
        <Input 
          id="role" 
          className={errors.role ? "border-red-500" : ""} 
          {...register("role")} 
        />
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInformationSection;
