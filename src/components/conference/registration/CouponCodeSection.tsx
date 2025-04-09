
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
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
 * - Checks coupon validity through edge function
 * - Shows coupon discount information
 * - Displays validation state with clear feedback
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
      // Call validate-coupon edge function
      const { data, error } = await supabase.functions.invoke('validate-coupon', {
        body: { code: inputValue.trim() }
      });
      
      if (error) {
        throw new Error(`Validation failed: ${error.message}`);
      }
      
      if (!data?.isValid) {
        setValidationResult({
          isValid: false,
          message: data?.message || "Invalid coupon code"
        });
        return;
      }
      
      // Process valid coupon
      setCouponCode(inputValue.trim());
      
      // Handle discount information
      if (data.discount) {
        setCouponDiscount(data.discount);
        
        // Check if this is a 100% discount coupon
        const isFullDiscount = 
          (data.discount.type === 'percentage' && data.discount.amount === 100) ||
          (data.discount.type === 'fixed' && data.discount.amount >= 500); // Assuming $500 or higher means full discount
        
        setIsFullDiscount(isFullDiscount);
        
        // Set validation result with appropriate message
        setValidationResult({
          isValid: true,
          message: isFullDiscount 
            ? "Free registration coupon applied!"
            : `Coupon applied: ${data.discount.type === 'percentage' 
                ? `${data.discount.amount}% off` 
                : `$${data.discount.amount} off`}`,
          discount: data.discount
        });
      } else {
        setValidationResult({
          isValid: true,
          message: "Coupon applied!"
        });
      }
    } catch (err) {
      console.error("Coupon validation error:", err);
      setValidationResult({
        isValid: false,
        message: "Error validating coupon"
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <Input
          placeholder="Enter coupon code"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow"
          disabled={isValidating}
        />
        <Button 
          onClick={validateCoupon}
          disabled={!inputValue.trim() || isValidating}
          variant="outline"
          type="button"
        >
          {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
        </Button>
      </div>
      
      {validationResult && (
        <div className={`text-sm flex items-center space-x-1 ${
          validationResult.isValid ? 'text-green-600' : 'text-red-600'
        }`}>
          {validationResult.isValid ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span>{validationResult.message}</span>
        </div>
      )}
    </div>
  );
};

export default CouponCodeSection;
