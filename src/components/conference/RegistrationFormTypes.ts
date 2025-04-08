
import { z } from "zod";

// Define the allowed ticket types
export const TICKET_TYPES = ["student", "professional", "student-group"] as const;

// Define constants for easier reference (to avoid string literals)
export const TICKET_TYPES_ENUM = {
  STUDENT: "student",
  PROFESSIONAL: "professional",
  STUDENT_GROUP: "student-group"
} as const;

// Define the allowed referral sources
export const REFERRAL_SOURCES = [
  "Friends",
  "University ASA",
  "LinkedIn",
  "Instagram",
  "No Bystanders",
  "RAADE Outreach Team"
] as const;

// Define the sale end date (April 8, 2025, 4:00 PM CST)
export const SALE_END_DATE = new Date('2025-04-08T16:00:00-05:00');

// Function to check if the sale is still active
export const isSaleActive = (): boolean => {
  return new Date() < SALE_END_DATE;
};

// Coupon data type definition
export interface CouponData {
  code: string;
  discount_type: 'percentage' | 'fixed' | 'full';
  discount_amount: number;
  description?: string;
}

// Create a Zod schema for the registration form
export const registrationFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().min(2, "Organization is required"),
  role: z.string().min(2, "Role is required"),
  ticketType: z.enum(TICKET_TYPES),
  referralSource: z.enum(REFERRAL_SOURCES).optional(),
  isUniversityOrAffiliate: z.boolean().optional(),
  groupSize: z.number().optional(),
  groupEmails: z.array(
    z.object({
      value: z.string().email("Invalid email address")
    }).or(z.string().email("Invalid email address")).nullable()
  ).optional(),
  specialRequests: z.string().optional(),
  couponCode: z.string().optional()
});

// Alias for backward compatibility
export const registrationSchema = registrationFormSchema;

// Infer the TypeScript type from the Zod schema
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

// Export the default values for the form
export const defaultFormValues: RegistrationFormData = {
  fullName: "",
  email: "",
  organization: "",
  role: "",
  ticketType: TICKET_TYPES_ENUM.STUDENT,
  isUniversityOrAffiliate: false,
  groupSize: undefined,
  groupEmails: [],
  specialRequests: "",
  referralSource: undefined,
  couponCode: undefined
};

/**
 * Get the ticket price based on ticket type
 * Automatically accounts for whether the sale is active
 * @param ticketType The type of ticket
 * @returns The price of the ticket in USD
 */
export const getTicketPrice = (ticketType: typeof TICKET_TYPES[number]): number => {
  const saleActive = isSaleActive();
  
  switch (ticketType) {
    case TICKET_TYPES_ENUM.STUDENT:
      return saleActive ? 25 : 35; // Sale: $25, Regular: $35
    case TICKET_TYPES_ENUM.PROFESSIONAL:
      return saleActive ? 50 : 60; // Sale: $50, Regular: $60
    case TICKET_TYPES_ENUM.STUDENT_GROUP:
      return saleActive ? 20 : 30; // Sale: $20, Regular: $30 per person
    default:
      return saleActive ? 25 : 35; // Default to student price
  }
};

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

/**
 * Get the regular (non-sale) ticket price 
 * @param ticketType The type of ticket
 * @returns The regular price of the ticket in USD
 */
export const getRegularTicketPrice = (ticketType: typeof TICKET_TYPES[number]): number => {
  switch (ticketType) {
    case TICKET_TYPES_ENUM.STUDENT:
      return 35; // Regular price
    case TICKET_TYPES_ENUM.PROFESSIONAL:
      return 60; // Regular price
    case TICKET_TYPES_ENUM.STUDENT_GROUP:
      return 30; // Regular price per person
    default:
      return 35; // Default to student price
  }
};

/**
 * Get the ticket price as a formatted text
 * @param ticketType The type of ticket
 * @returns Formatted price text with dollar sign
 */
export const getTicketPriceText = (ticketType: typeof TICKET_TYPES[number]): string => {
  return `($${getTicketPrice(ticketType)})`;
};

/**
 * Calculate the total price based on ticket type and group size
 * @param ticketType The type of ticket
 * @param groupSize Optional group size for group tickets
 * @returns The total price in USD
 */
export const calculateTotalPrice = (
  ticketType: typeof TICKET_TYPES[number],
  groupSize?: number,
  coupon?: CouponData | null
): number => {
  const basePrice = getTicketPrice(ticketType);
  
  let totalPrice = basePrice;
  if (ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP && groupSize) {
    totalPrice = basePrice * groupSize;
  }
  
  // Apply coupon discount if available
  if (coupon) {
    return getDiscountedPrice(totalPrice, coupon);
  }
  
  return totalPrice;
};

/**
 * Validate if an email domain is appropriate for the selected ticket type
 * @param email The email address to validate
 * @param ticketType The selected ticket type
 * @returns Validation result object
 */
export const validateTicketEmailDomain = (
  email: string,
  ticketType: string
): { isValid: boolean; message?: string } => {
  if (!email || !email.includes('@')) {
    return { isValid: false, message: "Please enter a valid email address" };
  }

  // For student tickets, validate .edu domain
  if ((ticketType === TICKET_TYPES_ENUM.STUDENT || ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP) && 
      !email.toLowerCase().endsWith('.edu')) {
    return { 
      isValid: false, 
      message: "Student tickets require an .edu email address" 
    };
  }

  return { isValid: true };
};
