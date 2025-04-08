
import { supabase } from "@/integrations/supabase/client";
import { CouponCode, NewCouponFormData } from "../types/CouponTypes";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Service for managing coupon codes
 * Handles fetching, creating, deleting, and toggling coupon codes
 */

// Fetch all coupon codes
export const fetchCoupons = async (): Promise<{ data: CouponCode[] | null; error: PostgrestError | null }> => {
  return await supabase
    .from('coupon_codes')
    .select('*')
    .order('created_at', { ascending: false });
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
  return await supabase
    .from('coupon_codes')
    .insert(couponData)
    .select()
    .single();
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
