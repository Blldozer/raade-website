
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CouponCodeSectionProps {
  setCouponCode: (couponCode: string | null) => void;
  setCouponDiscount: (discount: { type: 'percentage' | 'fixed'; amount: number } | null) => void;
  setIsFullDiscount: (isFullDiscount: boolean) => void;
}

/**
 * CouponCodeSection Component
 * 
 * Allows users to enter and validate coupon codes:
 * - Validates coupon codes through the Supabase edge function
 * - Shows coupon discount information
 * - Displays validation state with clear feedback
 * - Handles various coupon validation errors
 * - Improved visual feedback for successful coupon application
 * 
 * @param setCouponCode - Function to update coupon code in parent component
 * @param setCouponDiscount - Function to update coupon discount details
 * @param setIsFullDiscount - Function to indicate if coupon is 100% off
 */
const CouponCodeSection = ({
  setCouponCode,
  setCouponDiscount,
  setIsFullDiscount
}: CouponCodeSectionProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    discount?: { type: 'percentage' | 'fixed'; amount: number } | null;
  } | null>(null);

  // Handle coupon code validation
  const validateCoupon = async () => {
    if (!inputValue.trim()) return;
    
    setIsValidating(true);
    setCouponCode(null);
    setCouponDiscount(null);
    setIsFullDiscount(false);
    setValidationResult(null);
    
    try {
      // Call the validate-coupon edge function
      const { data, error } = await supabase.functions.invoke('validate-coupon', {
        body: { code: inputValue.trim() }
      });
      
      if (error) {
        console.error("Coupon validation error:", error);
        setValidationResult({
          isValid: false,
          message: "Error validating coupon code. Please try again."
        });
        setIsValidating(false);
        return;
      }
      
      if (data.isValid) {
        // Set coupon code and discount in parent component
        setCouponCode(inputValue.trim().toUpperCase());
        setCouponDiscount(data.discount);
        
        // Check if it's a 100% discount
        const isFullDiscount = data.discount.type === 'percentage' && data.discount.amount === 100;
        setIsFullDiscount(isFullDiscount);
        
        // Format message based on discount type and amount
        let message = "";
        if (isFullDiscount) {
          message = 'Free registration code applied!';
        } else {
          message = `Discount applied: ${data.discount.type === 'percentage' 
            ? `${data.discount.amount}%` 
            : `$${data.discount.amount}`} off`;
        }
        
        setValidationResult({
          isValid: true,
          message,
          discount: data.discount
        });
      } else {
        setValidationResult({
          isValid: false,
          message: data.message || "Invalid coupon code"
        });
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      setValidationResult({
        isValid: false,
        message: "Error validating coupon"
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Clear current coupon validation
  const clearCoupon = () => {
    setInputValue("");
    setCouponCode(null);
    setCouponDiscount(null);
    setIsFullDiscount(false);
    setValidationResult(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#274675] flex items-center">
        <Tag className="h-5 w-5 mr-2" />
        Apply Coupon Code
      </h3>
      
      <div className="flex gap-2">
        <Input
          placeholder="Enter coupon code"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toUpperCase())}
          className="flex-grow"
          disabled={isValidating || (validationResult?.isValid ?? false)}
        />
        
        {validationResult?.isValid ? (
          <Button
            onClick={clearCoupon}
            variant="outline"
            type="button"
          >
            Clear
          </Button>
        ) : (
          <Button
            onClick={validateCoupon}
            disabled={!inputValue.trim() || isValidating}
            variant="outline"
            type="button"
          >
            {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
          </Button>
        )}
      </div>
      
      {validationResult && (
        <div className={`flex items-center gap-2 text-sm p-2 rounded-md ${
          validationResult.isValid 
            ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' 
            : 'text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {validationResult.isValid ? (
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 flex-shrink-0" />
          )}
          <span>{validationResult.message}</span>
        </div>
      )}
      
      {validationResult?.isValid && validationResult.discount && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <p className="italic">
            This discount will be applied at checkout.
            {validationResult.discount.type === 'percentage' && validationResult.discount.amount === 100 
              ? ' Your registration will be free.' 
              : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default CouponCodeSection;
