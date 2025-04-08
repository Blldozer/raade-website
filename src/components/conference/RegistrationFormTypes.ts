
/**
 * Registration Form Data Types
 * 
 * This file contains all type definitions related to the conference
 * registration form.
 */

// Ticket type options
export type TicketType = "student" | "professional" | "student-group";

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
