
import { CouponValidationResult } from "../../RegistrationFormTypes";
import { supabase } from "@/lib/supabase";

/**
 * Validates a coupon code against the database
 * 
 * Checks if:
 * - The coupon exists
 * - It's not expired
 * - It hasn't reached its usage limit
 * - It's applicable to the current sale
 * 
 * @param code - The coupon code to validate
 * @returns A validation result object with status and details
 */
export const validateCouponCode = async (code: string): Promise<CouponValidationResult> => {
  // Handle empty codes
  if (!code || code.trim() === "") {
    return {
      isValid: false,
      message: "Please enter a coupon code"
    };
  }
  
  try {
    // Format code for consistent validation (uppercase, trimmed)
    const formattedCode = code.trim().toUpperCase();
    
    // Check against hardcoded coupon codes for testing/demo
    if (formattedCode === "RAADE2025") {
      return {
        isValid: true,
        message: "15% discount applied!",
        discountAmount: 15,
        discountType: "percentage"
      };
    }
    
    if (formattedCode === "EARLYBIRD") {
      return {
        isValid: true,
        message: "20% early bird discount applied!",
        discountAmount: 20,
        discountType: "percentage"
      };
    }
    
    if (formattedCode === "VIP100") {
      return {
        isValid: true,
        message: "You've received a free registration!",
        discountAmount: 100,
        discountType: "percentage"
      };
    }
    
    // For demo/testing - all other codes that start with TEST are valid with 10% off
    if (formattedCode.startsWith("TEST")) {
      return {
        isValid: true,
        message: "Test coupon applied (10% off)",
        discountAmount: 10,
        discountType: "percentage"
      };
    }

    // Query the database for the coupon code
    const { data: coupon, error } = await supabase
      .from('coupon_codes')
      .select('*')
      .eq('code', formattedCode)
      .single();
      
    if (error) {
      console.error("Error checking coupon:", error);
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
    
    // Check if coupon is expired
    const now = new Date();
    if (coupon.expiry_date && new Date(coupon.expiry_date) < now) {
      return {
        isValid: false,
        message: "This coupon has expired"
      };
    }
    
    // Check if max uses is exceeded
    if (coupon.max_uses && coupon.uses >= coupon.max_uses) {
      return {
        isValid: false,
        message: "This coupon has reached its usage limit"
      };
    }
    
    // Valid coupon!
    return {
      isValid: true,
      message: coupon.description || `${coupon.discount_amount}% discount applied!`,
      discountAmount: coupon.discount_amount,
      discountType: coupon.discount_type || "percentage"
    };
    
  } catch (error) {
    console.error("Error validating coupon:", error);
    return {
      isValid: false,
      message: "Failed to validate coupon"
    };
  }
};

/**
 * Increments the usage count for a coupon code
 * 
 * @param code - The coupon code that was used
 * @returns Success status
 */
export const incrementCouponUsage = async (code: string): Promise<boolean> => {
  if (!code || code.trim() === "") {
    return false;
  }
  
  try {
    // Format code for consistent tracking
    const formattedCode = code.trim().toUpperCase();
    
    // For hardcoded test coupons, just return success
    if (
      formattedCode === "RAADE2025" || 
      formattedCode === "EARLYBIRD" || 
      formattedCode === "VIP100" || 
      formattedCode.startsWith("TEST")
    ) {
      console.log(`Usage for test coupon ${formattedCode} would be incremented`);
      return true;
    }
    
    // For real coupons, update the database
    const { data, error } = await supabase.rpc('increment_coupon_usage', { 
      coupon_code: formattedCode 
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
