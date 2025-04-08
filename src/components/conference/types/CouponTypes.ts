
// Coupon data type definition
export interface CouponData {
  code: string;
  discount_type: 'percentage' | 'fixed' | 'full';
  discount_amount: number;
  description?: string;
}

/**
 * Calculate the price after applying a coupon discount
 * 
 * @param basePrice Original price before discount
 * @param coupon Coupon data with discount information
 * @returns The discounted price (0 for full discount)
 */
export const getDiscountedPrice = (basePrice: number, coupon: CouponData | null): number => {
  if (!coupon) return basePrice;
  
  switch (coupon.discount_type) {
    case 'full':
      return 0; // Free ticket
    case 'percentage':
      const discountAmount = (basePrice * coupon.discount_amount) / 100;
      return Math.max(0, basePrice - discountAmount);
    case 'fixed':
      return Math.max(0, basePrice - coupon.discount_amount);
    default:
      return basePrice;
  }
};
