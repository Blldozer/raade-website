
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CouponCodeSectionProps {
  setCouponData: (data: CouponData | null) => void;
  couponData: CouponData | null;
  disabled?: boolean;
}

export interface CouponData {
  code: string;
  discount_type: 'percentage' | 'fixed' | 'full';
  discount_amount: number;
  description?: string;
}

/**
 * Coupon Code Section Component
 * 
 * Allows users to enter and validate coupon codes during registration
 * - Handles validation through the Supabase Edge Function
 * - Shows appropriate feedback for valid/invalid codes
 * - Displays discount information for valid codes
 */
const CouponCodeSection = ({ setCouponData, couponData, disabled = false }: CouponCodeSectionProps) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const validateCouponCode = async () => {
    // Reset validation state
    setIsValid(null);
    setValidationMessage(null);
    
    // Don't validate empty codes
    if (!couponCode.trim()) {
      setValidationMessage("Please enter a coupon code");
      return;
    }
    
    setIsValidating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("validate-coupon-code", {
        body: { code: couponCode }
      });
      
      if (error) {
        console.error("Coupon validation error:", error);
        setIsValid(false);
        setValidationMessage("Error validating coupon code. Please try again.");
        setCouponData(null);
        return;
      }
      
      if (data.valid) {
        setIsValid(true);
        setValidationMessage(data.coupon.description || "Valid coupon code applied!");
        setCouponData(data.coupon);
        
        // Show toast notification
        toast({
          title: "Coupon Applied",
          description: getDiscountDescription(data.coupon),
          variant: "default",
        });
      } else {
        setIsValid(false);
        setValidationMessage(data.message || "Invalid coupon code");
        setCouponData(null);
      }
    } catch (error) {
      console.error("Error during coupon validation:", error);
      setIsValid(false);
      setValidationMessage("An error occurred while validating the code");
      setCouponData(null);
    } finally {
      setIsValidating(false);
    }
  };

  const getDiscountDescription = (coupon: CouponData): string => {
    switch (coupon.discount_type) {
      case 'full':
        return "100% discount - Free registration!";
      case 'percentage':
        return `${coupon.discount_amount}% discount applied`;
      case 'fixed':
        return `$${coupon.discount_amount} discount applied`;
      default:
        return "Discount applied";
    }
  };

  const clearCoupon = () => {
    setCouponCode("");
    setIsValid(null);
    setValidationMessage(null);
    setCouponData(null);
  };

  return (
    <div className="space-y-3">
      <div className="grid">
        <Label htmlFor="couponCode" className="mb-2 font-medium text-gray-700 dark:text-gray-300">
          Coupon Code {isValid === true && "(Applied)"}
        </Label>
        
        {/* Show current coupon if applied */}
        {isValid && couponData ? (
          <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <p className="font-medium text-sm">{couponData.code}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{getDiscountDescription(couponData)}</p>
              </div>
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              disabled={disabled}
              onClick={clearCoupon}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              id="couponCode"
              placeholder="Enter your coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              disabled={isValidating || disabled}
            />
            <Button
              type="button"
              onClick={validateCouponCode}
              disabled={isValidating || !couponCode.trim() || disabled}
              variant="outline"
              className="min-w-[100px]"
            >
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        )}
        
        {/* Validation message */}
        {validationMessage && !isValid && (
          <div className="flex items-center mt-1 text-red-500 text-sm">
            <XCircle className="h-4 w-4 mr-1" />
            {validationMessage}
          </div>
        )}
        
        {/* Description of what coupon codes are for */}
        {!isValid && !isValidating && !validationMessage && (
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
            Enter a coupon code if you have one. Certain codes may provide discounts or free registration.
          </p>
        )}
      </div>
    </div>
  );
};

export default CouponCodeSection;
