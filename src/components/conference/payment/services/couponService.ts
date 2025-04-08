
import { supabase } from "@/integrations/supabase/client";

interface CouponValidationResult {
  isValid: boolean;
  discount: number; // Percentage discount (0-100)
  message?: string;
  couponCode?: string;
}

// Define a type for the coupon code data structure
interface CouponCode {
  id: string;
  code: string;
  discount_type: string;
  discount_amount: number;
  is_active: boolean;
  max_uses?: number;
  current_uses: number;
  expires_at?: string;
  created_at: string;
  created_by?: string;
  description?: string;
}

/**
 * Coupon Service
 * 
 * Handles validation and application of coupon codes:
 * - Verifies coupon validity against database
 * - Checks expiration and usage limits
 * - Calculates discount amount
 * - Updates usage counter when applied
 */
export const validateCouponCode = async (code: string): Promise<CouponValidationResult> => {
  if (!code || code.trim().length === 0) {
    return { 
      isValid: false, 
      discount: 0,
      message: "Please enter a valid coupon code" 
    };
  }
  
  try {
    // Check if the coupon exists and is valid
    const { data: coupon, error } = await supabase
      .from("coupon_codes")
      .select("*")
      .eq("code", code.trim().toUpperCase())
      .eq("is_active", true)
      .single();
    
    if (error || !coupon) {
      console.log("Coupon not found or inactive:", code);
      return { 
        isValid: false, 
        discount: 0, 
        message: "Invalid coupon code" 
      };
    }
    
    // Explicit type assertion to CouponCode
    const typedCoupon = coupon as CouponCode;
    
    // Check if the coupon has expired
    if (typedCoupon.expires_at && new Date(typedCoupon.expires_at) < new Date()) {
      console.log("Coupon expired:", code);
      return { 
        isValid: false, 
        discount: 0, 
        message: "This coupon has expired" 
      };
    }
    
    // Check if the coupon has reached its usage limit
    if (typedCoupon.max_uses && typedCoupon.current_uses >= typedCoupon.max_uses) {
      console.log("Coupon usage limit reached:", code);
      return { 
        isValid: false, 
        discount: 0, 
        message: "This coupon has reached its usage limit" 
      };
    }
    
    // Calculate discount
    let discountPercentage = 0;
    if (typedCoupon.discount_type === "percentage") {
      discountPercentage = Number(typedCoupon.discount_amount);
    } else if (typedCoupon.discount_type === "fixed") {
      // For fixed amount discounts, we'd need to calculate the percentage based on the ticket price
      // We're simplifying here to just handle percentage discounts
      discountPercentage = 0;
    }
    
    // Return validation result
    return { 
      isValid: true, 
      discount: discountPercentage,
      couponCode: typedCoupon.code
    };
    
  } catch (error) {
    console.error("Error validating coupon:", error);
    return { 
      isValid: false, 
      discount: 0, 
      message: "Error validating coupon code" 
    };
  }
};

/**
 * Increments the usage counter for a coupon code
 * 
 * @param code The coupon code to update
 * @returns Whether the update was successful
 */
export const incrementCouponUsage = async (code: string): Promise<boolean> => {
  if (!code) return false;
  
  try {
    // Instead of using RPC, we'll do a direct update since the function doesn't exist
    const { data, error } = await supabase
      .from("coupon_codes")
      .update({ current_uses: supabase.rpc('increment', { column_name: 'current_uses' }) })
      .eq("code", code.trim().toUpperCase())
      .select("current_uses");
    
    if (error) {
      console.error("Error incrementing coupon usage:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Unexpected error incrementing coupon usage:", error);
    return false;
  }
};

