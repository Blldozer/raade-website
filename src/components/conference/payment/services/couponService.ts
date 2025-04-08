
import { supabase } from "@/integrations/supabase/client";

/**
 * Interface for coupon validation result
 */
export interface CouponValidationResult {
  isValid: boolean;
  message?: string;
  discountAmount?: number;
  discountType?: "fixed" | "percentage";
}

/**
 * Coupon Service
 * 
 * Handles coupon code validation and usage tracking:
 * - Validates coupon codes against database
 * - Checks expiration and usage limits
 * - Calculates discount values based on coupon type
 * - Updates coupon usage count after successful payments
 */
export const validateCouponCode = async (code: string): Promise<CouponValidationResult> => {
  if (!code || code.trim() === "") {
    return {
      isValid: false,
      message: "Please enter a valid coupon code"
    };
  }

  try {
    // Query the coupons table for the provided code
    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code.trim().toUpperCase())
      .single();

    if (error) {
      console.error("Error validating coupon:", error);
      return {
        isValid: false,
        message: "Invalid coupon code"
      };
    }

    if (!coupon) {
      return {
        isValid: false,
        message: "Coupon not found"
      };
    }

    // Check if the coupon is active
    if (!coupon.is_active) {
      return {
        isValid: false,
        message: "This coupon is no longer active"
      };
    }

    // Check if the coupon has expired
    if (coupon.expires_at) {
      const expiryDate = new Date(coupon.expires_at);
      if (expiryDate < new Date()) {
        return {
          isValid: false,
          message: "This coupon has expired"
        };
      }
    }

    // Check if the coupon has reached its usage limit
    if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
      return {
        isValid: false,
        message: "This coupon has reached its usage limit"
      };
    }

    // Process the discount amount based on the type
    const discountType = coupon.discount_type as "fixed" | "percentage";
    let discountAmount = coupon.discount_amount;

    // For percentage discounts, return the percentage value directly
    // The frontend will apply it to the appropriate price
    
    return {
      isValid: true,
      discountAmount,
      discountType
    };
  } catch (error) {
    console.error("Error validating coupon:", error);
    return {
      isValid: false,
      message: "An error occurred while validating your coupon"
    };
  }
};

/**
 * Increments the usage count for a coupon
 * 
 * Called after successful payment to track coupon usage
 * 
 * @param code The coupon code to increment usage for
 * @returns A boolean indicating success or failure
 */
export const incrementCouponUsage = async (code: string): Promise<boolean> => {
  if (!code || code.trim() === "") {
    return false;
  }

  try {
    // Call the RPC function to increment the coupon usage
    const { error } = await supabase.rpc("increment_coupon_usage", {
      code_param: code.trim().toUpperCase()
    });

    if (error) {
      console.error("Error incrementing coupon usage:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error incrementing coupon usage:", error);
    return false;
  }
};
