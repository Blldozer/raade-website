
/**
 * Utility functions for coupon management
 */

// Format date in a friendly way
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Never';
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format coupon code (uppercase, trim)
export const formatCouponCode = (code: string): string => {
  return code.trim().toUpperCase();
};

// Get display text for discount type
export const getDiscountTypeDisplay = (type: 'full' | 'percentage' | 'fixed'): string => {
  switch (type) {
    case 'full': 
      return 'Full Discount';
    case 'percentage': 
      return 'Percentage';
    case 'fixed': 
      return 'Fixed Amount';
    default: 
      return '';
  }
};

// Get display text for discount value
export const getDiscountValueDisplay = (type: 'full' | 'percentage' | 'fixed', amount: number): string => {
  switch (type) {
    case 'full': 
      return '100% OFF';
    case 'percentage': 
      return `${amount}%`;
    case 'fixed': 
      return `$${amount}`;
    default: 
      return '';
  }
};
