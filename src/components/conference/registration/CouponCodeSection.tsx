
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
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
 * - Provides real-time validation with server-side checking
 * - Shows appropriate feedback based on coupon status
 * - Updates parent form with discount information
 */
const CouponCodeSection = ({ setCouponCode, setCouponDiscount, setIsFullDiscount }: CouponCodeSectionProps) => {
  const [couponInput, setCouponInput] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleValidateCoupon = async () => {
    if (!couponInput.trim()) {
      setValidationMessage({ type: 'error', message: "Please enter a coupon code" });
      return;
    }

    setIsValidating(true);
    setValidationMessage(null);

    try {
      const { data, error } = await supabase.functions.invoke('validate-coupon', {
        body: { code: couponInput.trim() }
      });

      if (error || !data.success) {
        setValidationMessage({ 
          type: 'error', 
          message: (data && data.message) || "Invalid coupon code" 
        });
        setCouponCode(null);
        setCouponDiscount(null);
        setIsFullDiscount(false);
        setAppliedCoupon(null);
        return;
      }

      // Valid coupon
      setValidationMessage({ 
        type: 'success', 
        message: `Coupon applied: ${data.coupon.discountType === 'percentage' ? 
          `${data.coupon.discountAmount}% off` : 
          `$${data.coupon.discountAmount} off`}`
      });
      
      setCouponCode(data.coupon.code);
      setCouponDiscount({
        type: data.coupon.discountType,
        amount: data.coupon.discountAmount
      });
      setIsFullDiscount(data.coupon.isFullDiscount);
      setAppliedCoupon(data.coupon.code);

    } catch (err) {
      console.error("Error validating coupon:", err);
      setValidationMessage({ type: 'error', message: "Error validating coupon" });
      setCouponCode(null);
      setCouponDiscount(null);
      setIsFullDiscount(false);
      setAppliedCoupon(null);
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponInput("");
    setValidationMessage(null);
    setCouponCode(null);
    setCouponDiscount(null);
    setIsFullDiscount(false);
    setAppliedCoupon(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Enter coupon code"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          className="flex-grow"
          disabled={!!appliedCoupon || isValidating}
        />
        
        {!appliedCoupon ? (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleValidateCoupon}
            disabled={isValidating || !couponInput.trim()}
            className="min-w-24"
          >
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Validating
              </>
            ) : (
              "Apply"
            )}
          </Button>
        ) : (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleRemoveCoupon}
            className="min-w-24"
          >
            Remove
          </Button>
        )}
      </div>
      
      {validationMessage && (
        <div className={`flex items-center text-sm ${
          validationMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {validationMessage.type === 'success' ? (
            <CheckCircle className="h-4 w-4 mr-2" />
          ) : (
            <AlertCircle className="h-4 w-4 mr-2" />
          )}
          {validationMessage.message}
        </div>
      )}
    </div>
  );
};

export default CouponCodeSection;
