
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { InfoIcon } from "lucide-react";

interface BasicInformationSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: any;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
}

/**
 * BasicInformationSection Component
 * 
 * Renders the basic user information form fields:
 * - Name
 * - Email
 * - Organization
 * - Role
 * 
 * Includes real-time validation for required fields
 */
const BasicInformationSection = ({
  register,
  errors,
  onEmailValidation
}: BasicInformationSectionProps) => {
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!email || !email.includes('@')) return;
    
    // For demo purposes - just validate the format
    // In a real app, you might do more validation
    if (onEmailValidation) {
      onEmailValidation({
        isValid: true,
        message: "Email looks valid"
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal Information</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="font-lora">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Your full name"
            {...register("fullName")}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="font-lora">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register("email")}
            onBlur={handleEmailBlur}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="organization" className="font-lora">Organization/University</Label>
          <Input
            id="organization"
            placeholder="Your organization or university"
            {...register("organization")}
            className={errors.organization ? "border-red-500" : ""}
          />
          {errors.organization && (
            <p className="text-sm text-red-500">{errors.organization.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role" className="font-lora">Role/Major</Label>
          <Input
            id="role"
            placeholder="Your professional role or major"
            {...register("role")}
            className={errors.role ? "border-red-500" : ""}
          />
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-500 flex items-start gap-2">
        <InfoIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <p>
          Your personal information is only used for conference communication and won't be shared with third parties.
        </p>
      </div>
    </div>
  );
};

export default BasicInformationSection;
