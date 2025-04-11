
import { UseFormRegister, FormState, UseFormWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Info } from "lucide-react";

interface BasicInformationProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  watch: UseFormWatch<RegistrationFormData>;
  isCheckingEmail: boolean;
  emailValidationMessage?: string | null;
  emailIsValid?: boolean | null;
}

/**
 * BasicInformation Component
 * 
 * Handles the collection of basic personal information for conference registration:
 * - First name and last name fields with appropriate autocomplete
 * - Email address with validation for academic emails
 * - Organization/University with improved autofill
 * - Role/Position with context-specific autocomplete
 * 
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @param watch - React Hook Form watch function
 * @param isCheckingEmail - Whether email validation is in progress
 * @param emailValidationMessage - Validation message for email
 * @param emailIsValid - Whether the email is valid
 */
const BasicInformation = ({ 
  register, 
  errors, 
  watch, 
  isCheckingEmail,
  emailValidationMessage,
  emailIsValid
}: BasicInformationProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            autoComplete="given-name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            autoComplete="family-name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          autoComplete="email"
          {...register("email")}
          className={`${isCheckingEmail ? "bg-gray-100" : ""} ${emailIsValid === false ? "border-orange-400" : ""}`}
        />
        {isCheckingEmail && (
          <p className="text-gray-500 text-sm mt-1">Checking email...</p>
        )}
        {emailValidationMessage && !isCheckingEmail && (
          <div className="flex items-start mt-1 text-sm">
            <Info className="h-4 w-4 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
            <p className="text-amber-600">{emailValidationMessage}</p>
          </div>
        )}
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="organization">Organization/University</Label>
        <Input
          id="organization"
          name="organization"
          placeholder="Enter your organization or university name"
          autoComplete="organization"
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
          name="role"
          placeholder="Your position or role"
          autoComplete="organization-title"
          {...register("role")}
        />
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>
    </>
  );
};

export default BasicInformation;
