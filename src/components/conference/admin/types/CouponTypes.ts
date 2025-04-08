
/**
 * Types for the coupon management functionality
 */
export interface CouponCode {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed' | 'full';
  discount_amount: number;
  is_active: boolean;
  max_uses: number | null;
  current_uses: number;
  created_at: string;
  expires_at: string | null;
}

export interface NewCouponFormData {
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed' | 'full';
  discount_amount: number;
  max_uses: number | null;
  is_active: boolean;
  expires_at: string; // YYYY-MM-DD format
}

// Helper type for Supabase response mapping
export type RawCouponCodeData = {
  id: string;
  code: string;
  description: string | null;
  discount_type: string; // This is the difference - database returns string
  discount_amount: number;
  is_active: boolean;
  max_uses: number | null;
  current_uses: number;
  created_at: string;
  expires_at: string | null;
};

// Type guard to validate discount_type values
export function isValidDiscountType(type: string): type is 'percentage' | 'fixed' | 'full' {
  return ['percentage', 'fixed', 'full'].includes(type);
}
