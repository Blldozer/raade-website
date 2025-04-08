
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";
import { DonationFormValues } from "./DonationFormTypes";

interface DonorInformationProps {
  register: UseFormRegister<DonationFormValues>;
  errors: any;
}

/**
 * DonorInformation Component
 * 
 * Collects donor's personal information:
 * - Full name
 * - Email address
 * - Optional message
 * 
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 */
const DonorInformation = ({ register, errors }: DonorInformationProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="block mb-2 font-medium">
          Full Name
        </Label>
        <Input
          id="fullName"
          type="text"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="block mb-2 font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="block mb-2 font-medium">
          Message (Optional)
        </Label>
        <Input
          id="message"
          type="text"
          {...register("message")}
          placeholder="What inspired your donation?"
        />
      </div>
    </div>
  );
};

export default DonorInformation;
