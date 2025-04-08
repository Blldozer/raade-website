
import { UseFormRegister, FormState, UseFormWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegistrationFormData } from "../RegistrationFormTypes";

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
 * - Full name with appropriate autocomplete for name fields
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
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          autoComplete="name"
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
          <p className="text-orange-500 text-sm mt-1">{emailValidationMessage}</p>
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
