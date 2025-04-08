
import { useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { validateCouponCode } from "../payment/services/couponService";

interface CouponCodeInputProps {
  register: UseFormRegister<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

/**
 * CouponCodeInput Component
 * 
 * Allows users to enter and validate coupon codes:
 * - Provides real-time validation feedback
 * - Shows discount amount when valid
 * - Handles loading and error states
 */
const CouponCodeInput = ({ register, setValue, watch }: CouponCodeInputProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    checked: boolean;
    isValid: boolean;
    discount: number;
    message?: string;
  }>({
    checked: false,
    isValid: false,
    discount: 0
  });
  
  const couponCode = watch("couponCode");
  
  const handleValidateCoupon = async () => {
    // Skip validation if empty
    if (!couponCode || couponCode.trim() === "") {
      setValidationResult({
        checked: true,
        isValid: false,
        discount: 0,
        message: "Please enter a coupon code"
      });
      return;
    }
    
    setIsChecking(true);
    
    try {
      const result = await validateCouponCode(couponCode);
      
      // Store validation result
      setValidationResult({
        checked: true,
        isValid: result.isValid,
        discount: result.discount,
        message: result.message
      });
      
      // If the code is valid, make sure we use the correctly formatted code
      if (result.isValid && result.couponCode) {
        setValue("couponCode", result.couponCode);
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      setValidationResult({
        checked: true,
        isValid: false,
        discount: 0,
        message: "An error occurred while validating the coupon"
      });
    } finally {
      setIsChecking(false);
    }
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="couponCode" className="font-lora">Coupon Code (Optional)</Label>
      <div className="flex space-x-2">
        <div className="relative flex-grow">
          <Input
            id="couponCode"
            placeholder="Enter coupon code"
            className="w-full"
            autoComplete="off"
            {...register("couponCode")}
          />
          {validationResult.checked && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {validationResult.isValid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleValidateCoupon}
          disabled={isChecking || !couponCode}
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking
            </>
          ) : (
            'Apply'
          )}
        </Button>
      </div>
      
      {validationResult.checked && (
        <div className={validationResult.isValid ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
          {validationResult.isValid 
            ? validationResult.discount === 100 
              ? "100% discount applied!" 
              : `${validationResult.discount}% discount will be applied`
            : validationResult.message}
        </div>
      )}
    </div>
  );
};

export default CouponCodeInput;
