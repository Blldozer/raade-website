
import { supabase } from "@/integrations/supabase/client";
import { CouponCode, NewCouponFormData, RawCouponCodeData, isValidDiscountType } from "../types/CouponTypes";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Service for managing coupon codes
 * Handles fetching, creating, deleting, and toggling coupon codes
 */

// Fetch all coupon codes
export const fetchCoupons = async (): Promise<{ data: CouponCode[] | null; error: PostgrestError | null }> => {
  const response = await supabase
    .from('coupon_codes')
    .select('*')
    .order('created_at', { ascending: false });
    
  // Handle the type conversion from database to our CouponCode type
  if (response.error) {
    return { data: null, error: response.error };
  }
  
  // Map and validate the response data to ensure it matches our CouponCode type
  const coupons: CouponCode[] = response.data.map((item: RawCouponCodeData) => {
    // Validate the discount_type
    if (!isValidDiscountType(item.discount_type)) {
      console.warn(`Invalid discount_type "${item.discount_type}" for coupon ${item.code}`);
      // Default to 'fixed' if invalid type is encountered
      return { ...item, discount_type: 'fixed' as const };
    }
    
    // Type is valid, return the coupon with properly typed discount_type
    return { ...item, discount_type: item.discount_type as 'percentage' | 'fixed' | 'full' };
  });
  
  return { data: coupons, error: null };
};

// Create a new coupon code
export const createCoupon = async (couponData: {
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed' | 'full';
  discount_amount: number;
  max_uses: number | null;
  is_active: boolean;
  expires_at: string | null;
}): Promise<{ data: CouponCode | null; error: PostgrestError | null }> => {
  const response = await supabase
    .from('coupon_codes')
    .insert(couponData)
    .select()
    .single();
    
  if (response.error) {
    return { data: null, error: response.error };
  }
  
  // Ensure the returned data is properly typed
  const rawData = response.data as RawCouponCodeData;
  
  if (!isValidDiscountType(rawData.discount_type)) {
    console.warn(`Invalid discount_type "${rawData.discount_type}" for new coupon ${rawData.code}`);
    return { 
      data: { ...rawData, discount_type: 'fixed' as const }, 
      error: null 
    };
  }
  
  return { 
    data: { ...rawData, discount_type: rawData.discount_type as 'percentage' | 'fixed' | 'full' }, 
    error: null 
  };
};

// Delete a coupon code
export const deleteCoupon = async (id: string): Promise<{ error: PostgrestError | null }> => {
  return await supabase
    .from('coupon_codes')
    .delete()
    .eq('id', id);
};

// Toggle a coupon's active status
export const toggleCouponStatus = async (id: string, isActive: boolean): Promise<{ error: PostgrestError | null }> => {
  return await supabase
    .from('coupon_codes')
    .update({ is_active: !isActive })
    .eq('id', id);
};
