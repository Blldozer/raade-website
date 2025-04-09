import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface CouponCodeSectionProps {
  setCouponCode: (couponCode: string | null) => void;
  setCouponDiscount: (discount: { type: 'percentage' | 'fixed'; amount: number } | null) => void;
  setIsFullDiscount: (isFullDiscount: boolean) => void;
}

/**
 * CouponCodeSection Component
 * 
 * Allows users to enter and validate coupon codes:
 * - Validates coupon codes client-side for now (can be switched to API later)
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
      // Using client-side validation for now to avoid edge function issues
      // In production, replace this with an API call
      setTimeout(() => {
        const validCoupons = {
          "RAADE100": { type: 'percentage' as const, amount: 100 },
          "SPEAKER": { type: 'percentage' as const, amount: 100 },
          "SPONSOR50": { type: 'percentage' as const, amount: 50 },
          "EARLY25": { type: 'percentage' as const, amount: 25 },
          "DISCOUNT10": { type: 'fixed' as const, amount: 10 }
        };
        
        const code = inputValue.trim().toUpperCase();
        
        if (code in validCoupons) {
          const discount = validCoupons[code as keyof typeof validCoupons];
          
          // Set coupon code in parent component
          setCouponCode(code);
          setCouponDiscount(discount);
          
          // Check if it's a 100% discount
          const isFullDiscount = discount.type === 'percentage' && discount.amount === 100;
          setIsFullDiscount(isFullDiscount);
          
          // Set validation result for UI
          setValidationResult({
            isValid: true,
            message: isFullDiscount 
              ? 'Free registration code applied!' 
              : `Discount applied: ${discount.type === 'percentage' ? `${discount.amount}%` : `$${discount.amount}`} off`,
            discount
          });
        } else {
          setValidationResult({
            isValid: false,
            message: "Invalid coupon code"
          });
        }
        
        setIsValidating(false);
      }, 500); // Simulate API delay
    } catch (error) {
      console.error("Coupon validation error:", error);
      setValidationResult({
        isValid: false,
        message: "Error validating coupon"
      });
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
      <h3 className="text-lg font-medium text-[#274675]">Apply Coupon Code</h3>
      
      <div className="flex gap-2">
        <Input
          placeholder="Enter coupon code"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
        <div className={`flex items-center gap-2 text-sm ${validationResult.isValid ? 'text-green-600' : 'text-red-500'}`}>
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
