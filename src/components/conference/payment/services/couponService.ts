
import { supabase } from "@/integrations/supabase/client";

export interface CouponCode {
  id: string;
  code: string;
  description?: string;
  discount_type: "percentage" | "fixed";
  discount_amount: number;
  is_active: boolean;
  current_uses: number;
  max_uses?: number;
  expires_at?: string;
  created_at: string;
}

export interface CouponValidationResult {
  isValid: boolean;
  message: string;
  discountAmount?: number;
  discountType?: "percentage" | "fixed";
  originalCode?: string;
}

/**
 * Validates a coupon code
 * 
 * Checks if the coupon exists, is active, hasn't expired,
 * and hasn't reached its maximum usage limit
 * 
 * @param code - The coupon code to validate
 * @returns Validation result with discount info if valid
 */
export const validateCouponCode = async (
  code: string
): Promise<CouponValidationResult> => {
  if (!code || code.trim() === "") {
    return {
      isValid: false,
      message: "No coupon code provided",
    };
  }

  try {
    // Convert code to uppercase for case-insensitive matching
    const normalizedCode = code.trim().toUpperCase();

    // Fetch the coupon from the database
    const { data: coupons, error } = await supabase
      .from("coupon_codes")
      .select("*")
      .ilike("code", normalizedCode)
      .limit(1);

    if (error) {
      console.error("Error validating coupon:", error);
      return {
        isValid: false,
        message: "Error validating coupon code",
      };
    }

    if (!coupons || coupons.length === 0) {
      return {
        isValid: false,
        message: "Invalid coupon code",
        originalCode: code,
      };
    }

    const coupon = coupons[0] as CouponCode;

    // Check if the coupon is active
    if (!coupon.is_active) {
      return {
        isValid: false,
        message: "This coupon code is no longer active",
        originalCode: code,
      };
    }

    // Check if the coupon has expired
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return {
        isValid: false,
        message: "This coupon code has expired",
        originalCode: code,
      };
    }

    // Check if the coupon has reached its maximum usage limit
    if (
      coupon.max_uses !== null &&
      coupon.max_uses !== undefined &&
      coupon.current_uses >= coupon.max_uses
    ) {
      return {
        isValid: false,
        message: "This coupon code has reached its usage limit",
        originalCode: code,
      };
    }

    // Coupon is valid
    return {
      isValid: true,
      message: `Coupon applied: ${
        coupon.discount_type === "percentage"
          ? `${coupon.discount_amount}% off`
          : `$${coupon.discount_amount} off`
      }`,
      discountAmount: coupon.discount_amount,
      discountType: coupon.discount_type,
      originalCode: code,
    };
  } catch (error) {
    console.error("Error in coupon validation:", error);
    return {
      isValid: false,
      message: "An error occurred while validating your coupon code",
      originalCode: code,
    };
  }
};

/**
 * Increments the usage count for a coupon code
 * 
 * @param code - The coupon code to increment
 * @returns Updated usage count or undefined if error
 */
export const incrementCouponUsage = async (
  code: string
): Promise<number | undefined> => {
  if (!code) return undefined;

  try {
    // Call the database function to increment coupon usage
    const { data, error } = await supabase
      .rpc("increment_coupon_usage", { coupon_code_param: code.trim().toUpperCase() });

    if (error) {
      console.error("Error incrementing coupon usage:", error);
      return undefined;
    }

    return data as number;
  } catch (error) {
    console.error("Error in incrementCouponUsage:", error);
    return undefined;
  }
};

/**
 * Gets the current usage count for a coupon code
 * 
 * @param code - The coupon code to check
 * @returns Current usage count or 0 if error
 */
export const getCouponUsageCount = async (
  code: string
): Promise<number> => {
  if (!code) return 0;

  try {
    // Call the database function to get coupon usage
    const { data, error } = await supabase
      .rpc("get_current_uses", { coupon_code_param: code.trim().toUpperCase() });

    if (error) {
      console.error("Error getting coupon usage:", error);
      return 0;
    }

    return data as number;
  } catch (error) {
    console.error("Error in getCouponUsageCount:", error);
    return 0;
  }
};
