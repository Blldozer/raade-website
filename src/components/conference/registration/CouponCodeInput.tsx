import React from "../../../setup-jsx";
import { UseFormRegister, FormState } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegistrationFormData } from "../RegistrationFormTypes";

export interface CouponCodeInputProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FormState<RegistrationFormData>["errors"];
}

/**
 * CouponCodeInput Component
 * 
 * Renders a form input for coupon code entry
 * 
 * @param register - React Hook Form register function
 * @param errors - Form validation errors
 */
const CouponCodeInput: React.FC<CouponCodeInputProps> = ({ 
  register, 
  errors 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
      <Input
        id="couponCode"
        placeholder="Enter your coupon code"
        {...register("couponCode")}
        className="w-full"
      />
      {errors.couponCode && (
        <p className="text-sm text-destructive">{errors.couponCode.message}</p>
      )}
    </div>
  );
};

export default CouponCodeInput;
