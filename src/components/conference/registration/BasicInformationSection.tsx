
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * BasicInformationSection Component
 * 
 * Contains the core registration fields like name, email,
 * organization, and role.
 * 
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @param watch - React Hook Form watch function
 * @param onEmailValidation - Callback for email validation results
 */
interface BasicInformationSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: any;
  watch?: UseFormWatch<RegistrationFormData>;
  onEmailValidation?: (result: { isValid: boolean; message?: string }) => void;
}

const BasicInformationSection = ({ 
  register, 
  errors, 
  watch, 
  onEmailValidation 
}: BasicInformationSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="font-lora">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Your full name"
          className="mt-1"
          {...register("fullName", { required: "Full name is required" })}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Label htmlFor="email" className="font-lora">Email Address</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                This email will be used for your registration confirmation and updates about the conference.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          className="mt-1"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address"
            }
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="organization" className="font-lora">Organization / University</Label>
        <Input
          id="organization"
          type="text"
          placeholder="Your organization or university"
          className="mt-1"
          {...register("organization", { required: "Organization is required" })}
        />
        {errors.organization && (
          <p className="text-sm text-red-500 mt-1">
            {errors.organization.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="role" className="font-lora">Role / Major</Label>
        <Input
          id="role"
          type="text"
          placeholder="Your role or major"
          className="mt-1"
          {...register("role", { required: "Role or major is required" })}
        />
        {errors.role && (
          <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInformationSection;
