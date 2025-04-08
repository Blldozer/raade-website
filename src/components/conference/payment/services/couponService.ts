
import { supabase } from "@/integrations/supabase/client";

/**
 * CouponCode Type Definition
 * 
 * Represents the structure of a coupon code in the database
 */
export interface CouponCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_amount: number;
  is_active: boolean;
  max_uses: number | null;
  current_uses: number;
  valid_until: string | null;
  created_at: string;
}

/**
 * CouponValidationResult Type Definition
 * 
 * Represents the result of validating a coupon code
 */
export interface CouponValidationResult {
  valid: boolean;
  message: string;
  discountAmount?: number;
  discountType?: 'percentage' | 'fixed';
  code?: string;
}

/**
 * Get a coupon by its code
 * 
 * @param code - The coupon code to retrieve
 * @returns The coupon if found, null otherwise
 */
export const getCouponByCode = async (code: string): Promise<CouponCode | null> => {
  try {
    // We need to manually specify the table type to avoid type issues
    const { data, error } = await supabase
      .from('coupon_codes')
      .select('*')
      .eq('code', code)
      .single();

    if (error) {
      console.error('Error fetching coupon:', error);
      return null;
    }

    // Safely type cast the result
    return data as unknown as CouponCode;
  } catch (error) {
    console.error('Exception fetching coupon:', error);
    return null;
  }
};

/**
 * Validate a coupon code
 * 
 * @param code - The coupon code to validate
 * @returns A validation result object
 */
export const validateCoupon = async (code: string): Promise<CouponValidationResult> => {
  if (!code || code.trim() === '') {
    return {
      valid: false,
      message: 'Please enter a coupon code',
    };
  }

  const coupon = await getCouponByCode(code);

  if (!coupon) {
    return {
      valid: false,
      message: 'Invalid coupon code',
    };
  }

  if (!coupon.is_active) {
    return {
      valid: false,
      message: 'This coupon code is no longer active',
    };
  }

  if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
    return {
      valid: false,
      message: 'This coupon code has expired',
    };
  }

  if (coupon.max_uses !== null && coupon.current_uses >= coupon.max_uses) {
    return {
      valid: false,
      message: 'This coupon code has reached its usage limit',
    };
  }

  return {
    valid: true,
    message: 'Coupon applied successfully',
    discountAmount: coupon.discount_amount,
    discountType: coupon.discount_type,
    code: coupon.code,
  };
};

/**
 * Increment the usage count for a coupon
 * 
 * @param code - The coupon code to increment
 * @returns The new usage count, or 0 if there was an error
 */
export const incrementCouponUsage = async (code: string): Promise<number> => {
  try {
    // Call the custom function using rpc
    const { data, error } = await supabase.rpc(
      'increment_coupon_usage',
      { coupon_code_param: code }
    );

    if (error) {
      console.error('Error incrementing coupon usage:', error);
      return 0;
    }

    // The function returns the new usage count as a number
    return data as number;
  } catch (error) {
    console.error('Exception incrementing coupon usage:', error);
    return 0;
  }
};

/**
 * Get the current usage count for a coupon
 * 
 * @param code - The coupon code to check
 * @returns The current usage count, or 0 if there was an error
 */
export const getCurrentCouponUses = async (code: string): Promise<number> => {
  try {
    // Call the custom function using rpc
    const { data, error } = await supabase.rpc(
      'get_current_uses',
      { coupon_code_param: code }
    );

    if (error) {
      console.error('Error getting coupon usage:', error);
      return 0;
    }

    // The function returns the current usage count as a number
    return data as number;
  } catch (error) {
    console.error('Exception getting coupon usage:', error);
    return 0;
  }
};
