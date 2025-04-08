
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CouponCodeInputProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

/**
 * CouponCodeInput Component
 * 
 * Allows users to enter coupon codes for discounts on registration fees
 */
const CouponCodeInput = ({ register }: CouponCodeInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="couponCode" className="font-lora">Coupon Code (Optional)</Label>
      <Input
        id="couponCode"
        placeholder="Enter coupon code if you have one"
        className="mt-1 w-full md:w-64"
        {...register("couponCode")}
      />
      <p className="text-sm text-gray-500">
        If you have a coupon code, enter it here to receive a discount.
      </p>
    </div>
  );
};

export default CouponCodeInput;
