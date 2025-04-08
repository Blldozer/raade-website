
import { useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Tag } from "lucide-react";

/**
 * CouponCodeInput Component
 * 
 * Allows users to enter and validate coupon codes for discounts
 * during conference registration.
 * 
 * @param register - React Hook Form register function
 * @param setValue - React Hook Form setValue function
 * @param watch - React Hook Form watch function
 */
interface CouponCodeInputProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

const CouponCodeInput = ({
  register,
  setValue,
  watch,
}: CouponCodeInputProps) => {
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  const couponCode = watch("couponCode");

  const validateCoupon = async () => {
    if (!couponCode || couponCode.trim() === "") {
      setValidationResult({
        valid: false,
        message: "Please enter a coupon code",
      });
      return;
    }

    setValidating(true);
    setValidationResult(null);

    // Simulate validation - would be replaced with actual API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === "RAADE2025") {
        setValidationResult({
          valid: true,
          message: "15% discount applied!",
        });
      } else {
        setValidationResult({
          valid: false,
          message: "Invalid coupon code",
        });
      }
      setValidating(false);
    }, 1000);
  };

  const clearCoupon = () => {
    setValue("couponCode", "");
    setValidationResult(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="couponCode" className="font-lora">Coupon Code (Optional)</Label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            id="couponCode"
            placeholder="Enter coupon code"
            className="pr-10"
            {...register("couponCode")}
          />
          {couponCode && (
            <button
              type="button"
              onClick={clearCoupon}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XCircle className="h-5 w-5" />
              <span className="sr-only">Clear</span>
            </button>
          )}
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={validateCoupon}
          disabled={validating || !couponCode}
        >
          {validating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Tag className="h-4 w-4 mr-2" />
          )}
          Validate
        </Button>
      </div>
      
      {validationResult && (
        <div
          className={`flex items-center mt-2 text-sm ${
            validationResult.valid ? "text-green-600" : "text-red-600"
          }`}
        >
          {validationResult.valid ? (
            <CheckCircle className="h-4 w-4 mr-1" />
          ) : (
            <XCircle className="h-4 w-4 mr-1" />
          )}
          {validationResult.message}
        </div>
      )}
    </div>
  );
};

export default CouponCodeInput;
