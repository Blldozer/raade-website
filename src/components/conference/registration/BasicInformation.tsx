
import { UseFormRegister, FormState, UseFormWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegistrationFormData } from "../RegistrationFormTypes";

interface BasicInformationProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
  watch: UseFormWatch<RegistrationFormData>;
  isCheckingEmail: boolean;
}

const BasicInformation = ({ 
  register, 
  errors, 
  watch, 
  isCheckingEmail 
}: BasicInformationProps) => {
  return (
    <>
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
    </>
  );
};

export default BasicInformation;
