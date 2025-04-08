
/**
 * Main export file for registration form types
 * 
 * This file re-exports all types and utilities needed for the registration form
 * from their respective modular files
 */

// Re-export from ticket types
export { 
  TICKET_TYPES, 
  TICKET_TYPES_ENUM,
  getTicketPrice,
  getRegularTicketPrice,
  getTicketPriceText
} from './types/TicketTypes';

// Re-export from referral types
export { REFERRAL_SOURCES } from './types/ReferralTypes';

// Re-export from sale config
export { SALE_END_DATE, isSaleActive } from './types/SaleConfig';

// Re-export from coupon types
export type { CouponData } from './types/CouponTypes';
export { getDiscountedPrice } from './types/CouponTypes';

// Re-export from email validation
export { validateTicketEmailDomain } from './types/EmailValidation';

// Re-export from pricing calculation
export { calculateTotalPrice } from './types/PricingCalculation';

// Re-export from registration schema
export { 
  registrationFormSchema,
  defaultFormValues
} from './types/RegistrationSchema';
export type { RegistrationFormData } from './types/RegistrationSchema';

// Export registrationSchema directly from the source
export { registrationFormSchema as registrationSchema } from './types/RegistrationSchema';
