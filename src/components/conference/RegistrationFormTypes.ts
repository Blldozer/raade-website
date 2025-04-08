
/**
 * Registration Form Data Types
 * 
 * This file contains all type definitions related to the conference
 * registration form.
 */

import { z } from "zod";
import { addDays } from "date-fns";

// Ticket type options
export type TicketType = "student" | "professional" | "student-group";

// Ticket types enum for consistent reference
export const TICKET_TYPES_ENUM = {
  STUDENT: "student" as const,
  PROFESSIONAL: "professional" as const,
  STUDENT_GROUP: "student-group" as const
};

// Sale end date (April 8, 2025 4:00 PM CST)
export const SALE_END_DATE = new Date('2025-04-08T16:00:00-05:00');

// Check if sale is currently active
export const isSaleActive = (): boolean => {
  const currentDate = new Date();
  return currentDate < SALE_END_DATE;
};

// Ticket pricing - regular prices
const REGULAR_PRICES = {
  [TICKET_TYPES_ENUM.STUDENT]: 35,
  [TICKET_TYPES_ENUM.PROFESSIONAL]: 60,
  [TICKET_TYPES_ENUM.STUDENT_GROUP]: 30
};

// Sale pricing (discounted)
const SALE_PRICES = {
  [TICKET_TYPES_ENUM.STUDENT]: 25,
  [TICKET_TYPES_ENUM.PROFESSIONAL]: 50,
  [TICKET_TYPES_ENUM.STUDENT_GROUP]: 20
};

// Get price based on ticket type and sale status
export const getTicketPrice = (ticketType: TicketType): number => {
  const isSale = isSaleActive();
  return isSale 
    ? SALE_PRICES[ticketType as keyof typeof SALE_PRICES] 
    : REGULAR_PRICES[ticketType as keyof typeof REGULAR_PRICES];
};

// Get regular (non-sale) price
export const getRegularTicketPrice = (ticketType: TicketType): number => {
  return REGULAR_PRICES[ticketType as keyof typeof REGULAR_PRICES];
};

// Calculate total price for registration
export const calculateTotalPrice = (ticketType: TicketType, groupSize?: number): number => {
  const basePrice = getTicketPrice(ticketType);
  
  if (ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP && groupSize && groupSize >= 3) {
    return basePrice * groupSize;
  }
  
  return basePrice;
};

// Referral source options
export const REFERRAL_SOURCES = [
  "Friends",
  "University ASA",
  "LinkedIn",
  "Instagram",
  "No Bystanders",
  "RAADE Outreach Team",
  "Other"
] as const;

export type ReferralSource = typeof REFERRAL_SOURCES[number];

// Group member email type
export interface GroupEmail {
  email: string;
}

// Main form data structure
export interface RegistrationFormData {
  fullName?: string;
  email?: string;
  organization?: string;
  role?: string;
  ticketType?: TicketType;
  referralSource?: ReferralSource;
  specialRequests?: string;
  groupSize?: number;
  groupEmails?: GroupEmail[];
  couponCode?: string;
}

// Registration form validation schema
export const registrationFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(2, "Organization is required"),
  role: z.string().min(2, "Role or major is required"),
  ticketType: z.enum(["student", "professional", "student-group"]),
  referralSource: z.enum(REFERRAL_SOURCES).optional(),
  specialRequests: z.string().optional(),
  groupSize: z.number().min(3).optional().nullable(),
  groupEmails: z.array(z.object({ email: z.string().email("Please enter a valid email") })).optional(),
  couponCode: z.string().optional()
});

// Registration step type
export enum RegistrationStep {
  BASIC_INFO = 0,
  PAYMENT = 1,
  CONFIRMATION = 2,
}

// Coupon code validation result
export interface CouponValidationResult {
  isValid: boolean;
  message: string;
  discountAmount?: number;
  discountType?: 'percentage' | 'fixed';
}

// Registration data to send to server
export interface RegistrationData {
  fullName: string;
  email: string;
  organization: string;
  role: string;
  ticketType: TicketType;
  referralSource?: ReferralSource;
  specialRequests?: string;
  groupSize?: number;
  groupEmails?: GroupEmail[];
  couponCode?: string;
}
