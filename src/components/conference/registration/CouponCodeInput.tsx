import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface CouponCodeInputProps {
  onApply: (result: {
    valid: boolean;
    code: string;
    discount: { type: 'percentage' | 'fixed'; amount: number } | null;
    message: string;
  }) => void;
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
}

/**
 * CouponCodeInput Component
 * 
 * Allows users to input and verify coupon codes:
 * - Handles coupon code validation
 * - Shows loading state during verification
 * - Displays success/error feedback
 * - Works with parent form validation
 */
const CouponCodeInput = ({ onApply, value, onChange, isDisabled }: CouponCodeInputProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  const verifyCoupon = async () => {
    if (!value) return;
    setIsVerifying(true);
    
    try {
      // For testing/demo purposes we'll use a client-side verification
      // In production, this should be a server API call
      setTimeout(() => {
        const validCoupons = {
          "RAADE100": { type: 'percentage' as const, amount: 100 },
          "SPEAKER": { type: 'percentage' as const, amount: 100 },
          "SPONSOR50": { type: 'percentage' as const, amount: 50 },
          "EARLY25": { type: 'percentage' as const, amount: 25 },
          "DISCOUNT10": { type: 'fixed' as const, amount: 10 }
        };
        
        const couponCode = value.toUpperCase();
        
        if (couponCode in validCoupons) {
          const discount = validCoupons[couponCode as keyof typeof validCoupons];
          const result = {
            valid: true,
            code: couponCode,
            discount,
            message: `${discount.type === 'percentage' ? `${discount.amount}% off` : `$${discount.amount} off`}`
          };
          
          setVerificationResult({
            valid: true,
            message: result.message
          });
          
          onApply(result);
        } else {
          setVerificationResult({
            valid: false,
            message: "Invalid coupon code"
          });
          
          onApply({
            valid: false,
            code: couponCode,
            discount: null,
            message: "Invalid coupon code"
          });
        }
        
        setIsVerifying(false);
      }, 500); // Simulate network delay
    } catch (error) {
      setVerificationResult({
        valid: false,
        message: "Error verifying coupon"
      });
      
      onApply({
        valid: false,
        code: value,
        discount: null,
        message: "Error verifying coupon"
      });
      
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          placeholder="Enter coupon code"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="flex-grow"
          disabled={isDisabled}
        />
        <Button 
          onClick={verifyCoupon} 
          disabled={!value || isVerifying || isDisabled}
          variant="outline"
          size="sm"
          type="button"
        >
          {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
        </Button>
      </div>
      
      {verificationResult && (
        <div className={`flex items-center space-x-2 text-sm ${verificationResult.valid ? 'text-green-600' : 'text-red-500'}`}>
          {verificationResult.valid ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span>{verificationResult.message}</span>
        </div>
      )}
    </div>
  );
};

export default CouponCodeInput;
