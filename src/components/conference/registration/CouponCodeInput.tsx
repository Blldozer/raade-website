
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
 * - Handles coupon code validation via Supabase edge function
 * - Shows loading state during verification
 * - Displays success/error feedback
 * - Works with parent form validation
 * 
 * @param onApply - Function called when coupon verification completes
 * @param value - Current input value
 * @param onChange - Function to update input value
 * @param isDisabled - Whether the input is disabled
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
      // Call the validate-coupon edge function
      const { data, error } = await supabase.functions.invoke('validate-coupon', {
        body: { code: value.trim() }
      });
      
      if (error) {
        console.error("Coupon validation error:", error);
        setVerificationResult({
          valid: false,
          message: "Error validating coupon"
        });
        
        onApply({
          valid: false,
          code: value,
          discount: null,
          message: "Error validating coupon"
        });
        
        setIsVerifying(false);
        return;
      }
      
      if (data.isValid) {
        // Format message based on discount type and amount
        const message = data.discount.type === 'percentage' 
          ? `${data.discount.amount}% off` 
          : `$${data.discount.amount} off`;
        
        setVerificationResult({
          valid: true,
          message
        });
        
        onApply({
          valid: true,
          code: value.toUpperCase(),
          discount: data.discount,
          message
        });
      } else {
        setVerificationResult({
          valid: false,
          message: data.message || "Invalid coupon code"
        });
        
        onApply({
          valid: false,
          code: value,
          discount: null,
          message: data.message || "Invalid coupon code"
        });
      }
    } catch (error) {
      console.error("Error verifying coupon:", error);
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
    } finally {
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
