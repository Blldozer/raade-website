
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface BasicInformationProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  isCheckingEmail: boolean;
  emailValidationMessage?: string;
  emailIsValid: boolean;
}

/**
 * BasicInformation Component
 * 
 * Collects name, email, organization, and role information for registration.
 * Improved email validation feedback with timeout handling.
 * 
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 * @param watch - React Hook Form watch function
 * @param isCheckingEmail - Whether email validation is in progress
 * @param emailValidationMessage - Message to display for email validation
 * @param emailIsValid - Whether email is valid for the selected ticket type
 */
const BasicInformation = ({
  register,
  errors,
  watch,
  isCheckingEmail,
  emailValidationMessage,
  emailIsValid
}: BasicInformationProps) => {
  const email = watch("email");
  const showEmailValidation = email && email.length > 0;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          {...register("fullName")}
          placeholder="John Doe"
          className={errors.fullName ? "border-red-500" : ""}
          aria-invalid={errors.fullName ? "true" : "false"}
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
          {...register("email")}
          placeholder="you@example.com"
          className={errors.email || (!emailIsValid && emailValidationMessage) ? "border-red-500" : ""}
          aria-invalid={errors.email ? "true" : "false"}
        />
        
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        
        {showEmailValidation && (
          <div className="mt-1">
            {isCheckingEmail ? (
              <p className="text-gray-500 flex items-center text-sm">
                <Loader2 className="animate-spin h-3 w-3 mr-2" />
                Checking email...
              </p>
            ) : emailValidationMessage ? (
              <p className={`text-sm ${emailIsValid ? 'text-green-600' : 'text-red-500'}`}>
                {emailValidationMessage}
              </p>
            ) : emailIsValid && (
              <p className="text-green-600 text-sm">Email is valid</p>
            )}
          </div>
        )}

        {/* Show manual override hint if validation takes too long */}
        {isCheckingEmail && (
          <p className="text-xs text-gray-500 mt-1">
            If validation takes too long, you'll be able to proceed after 5 seconds.
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="organization">Organization / University</Label>
        <Input 
          id="organization" 
          {...register("organization")}
          placeholder="Rice University"
        />
      </div>
      
      <div>
        <Label htmlFor="role">Role / Position</Label>
        <Input 
          id="role" 
          {...register("role")}
          placeholder="Student, Professional, etc."
        />
      </div>
    </div>
  );
};

export default BasicInformation;
