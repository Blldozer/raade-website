
import { z } from "zod";

/**
 * Ticket types enum
 */
export const TICKET_TYPES_ENUM = {
  STUDENT: "student",
  PROFESSIONAL: "professional",
  STUDENT_GROUP: "student-group"
} as const;

/**
 * Referral sources
 */
export const REFERRAL_SOURCES = [
  "Social Media",
  "Friend/Colleague",
  "Email",
  "Poster/Flyer",
  "Professor/Class",
  "Rice Website",
  "Other"
] as const;

export type ReferralSource = typeof REFERRAL_SOURCES[number];
export type TicketType = "student" | "professional" | "student-group";

/**
 * Group email interface
 */
export interface GroupEmail {
  email: string;
}

/**
 * Form data interface
 */
export interface RegistrationFormData {
  fullName: string;
  email: string;
  organization: string;
  role: string;
  ticketType: TicketType;
  referralSource?: ReferralSource;
  specialRequests?: string;
  groupSize?: number;
  groupEmails?: any[]; // Accept various formats for group emails
  couponCode?: string;
  otherReferralSource?: string; // Optional field for "Other" referral source
}

/**
 * Sale start and end dates
 */
export const SALE_START_DATE = new Date('2025-03-01T00:00:00Z');
export const SALE_END_DATE = new Date('2025-04-01T23:59:59Z');

/**
 * Check if the sale is currently active
 */
export const isSaleActive = (): boolean => {
  const now = new Date();
  return now >= SALE_START_DATE && now <= SALE_END_DATE;
};

/**
 * Get ticket price based on ticket type
 */
export const getTicketPrice = (ticketType: TicketType, groupSize?: number): number => {
  const isOnSale = isSaleActive();

  switch (ticketType) {
    case TICKET_TYPES_ENUM.STUDENT:
      return isOnSale ? 35 : 50;
    case TICKET_TYPES_ENUM.PROFESSIONAL:
      return isOnSale ? 60 : 80;
    case TICKET_TYPES_ENUM.STUDENT_GROUP:
      if (!groupSize || groupSize < 5) {
        return isOnSale ? 150 : 200; // Minimum 5 people
      }
      return isOnSale ? 30 * groupSize : 40 * groupSize;
    default:
      return 0;
  }
};

/**
 * Get the regular ticket price (without sale)
 */
export const getRegularTicketPrice = (ticketType: TicketType, groupSize?: number): number => {
  switch (ticketType) {
    case TICKET_TYPES_ENUM.STUDENT:
      return 50;
    case TICKET_TYPES_ENUM.PROFESSIONAL:
      return 80;
    case TICKET_TYPES_ENUM.STUDENT_GROUP:
      if (!groupSize || groupSize < 5) {
        return 200; // Minimum 5 people
      }
      return 40 * groupSize;
    default:
      return 0;
  }
};

/**
 * Calculate total price with discount
 */
export const calculateTotalPrice = (
  ticketType: TicketType, 
  groupSize?: number, 
  couponDiscount: number = 0
): number => {
  const basePrice = getTicketPrice(ticketType, groupSize);
  
  // Apply discount (as percentage)
  if (couponDiscount > 0) {
    if (couponDiscount >= 100) {
      return 0; // Free with 100% discount
    }
    return basePrice * (1 - couponDiscount / 100);
  }
  
  return basePrice;
};

/**
 * Form validation schema
 */
export const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  organization: z.string().min(2, { message: "Organization is required" }),
  role: z.string().min(2, { message: "Role is required" }),
  ticketType: z.enum([
    TICKET_TYPES_ENUM.STUDENT, 
    TICKET_TYPES_ENUM.PROFESSIONAL, 
    TICKET_TYPES_ENUM.STUDENT_GROUP
  ]),
  referralSource: z.enum(REFERRAL_SOURCES).optional(),
  specialRequests: z.string().optional(),
  groupSize: z.number().min(5).optional(),
  groupEmails: z.array(z.any()).optional(), // Make more flexible for various formats
  couponCode: z.string().optional(),
  otherReferralSource: z.string().optional()
});
