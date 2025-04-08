
import { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface BasicInformationSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
}

/**
 * BasicInformationSection Component
 * 
 * Collects basic attendee information for conference registration
 * - Name, email, organization, and role fields
 * - Includes field validation and error display
 * - Provides live email validation
 */
const BasicInformationSection = ({
  register,
  errors,
  watch,
  onEmailValidation
}: BasicInformationSectionProps) => {
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const email = watch("email");
  
  const handleEmailBlur = async () => {
    if (!email || email.trim() === "" || !email.includes("@")) {
      return;
    }
    
    setIsValidatingEmail(true);
    
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(email);
    
    if (!isValidFormat) {
      setIsValidatingEmail(false);
      if (onEmailValidation) {
        onEmailValidation({
          isValid: false,
          message: "Please enter a valid email address"
        });
      }
      return;
    }
    
    // Just a short delay to simulate checking (in a real app, this would be an API call)
    setTimeout(() => {
      setIsValidatingEmail(false);
      if (onEmailValidation) {
        onEmailValidation({
          isValid: true
        });
      }
    }, 300);
  };

  return (
    <div className="grid gap-5">
      <div>
        <Label htmlFor="fullName" className="font-lora">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          className="mt-1"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="email" className="font-lora">Email</Label>
        <div className="relative mt-1">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className={`pr-9 ${errors.email ? 'border-red-500' : ''}`}
            {...register("email")}
            onBlur={handleEmailBlur}
          />
          {isValidatingEmail && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          )}
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
        <div>
          <Label htmlFor="organization" className="font-lora">Organization</Label>
          <Input
            id="organization"
            placeholder="University or company name"
            className="mt-1"
            {...register("organization")}
          />
          {errors.organization && (
            <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="role" className="font-lora">Role</Label>
          <Input
            id="role"
            placeholder="Student, Professor, Professional, etc."
            className="mt-1"
            {...register("role")}
          />
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInformationSection;
