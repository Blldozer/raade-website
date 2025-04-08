
import { z } from "zod";
import { addDays, format, isAfter, isBefore } from "date-fns";

// Define the ticket type enum for better type safety
export enum TICKET_TYPES_ENUM {
  STUDENT = "student",
  PROFESSIONAL = "professional",
  STUDENT_GROUP = "student-group"
}

// Define sale period
export const SALE_START_DATE = new Date("2025-01-15T00:00:00");
export const SALE_END_DATE = new Date("2025-02-15T23:59:59");

// Check if sale is currently active
export const isSaleActive = () => {
  const now = new Date();
  return isAfter(now, SALE_START_DATE) && isBefore(now, SALE_END_DATE);
};

// Define the base prices
const PRICING = {
  [TICKET_TYPES_ENUM.STUDENT]: {
    regular: 75,
    sale: 50
  },
  [TICKET_TYPES_ENUM.PROFESSIONAL]: {
    regular: 150,
    sale: 120
  },
  [TICKET_TYPES_ENUM.STUDENT_GROUP]: {
    regular: 60,
    sale: 40
  }
};

// Utility functions to get the current price based on sale state
export const getTicketPrice = (ticketType: TICKET_TYPES_ENUM): number => {
  const pricing = PRICING[ticketType];
  return isSaleActive() ? pricing.sale : pricing.regular;
};

export const getRegularTicketPrice = (ticketType: TICKET_TYPES_ENUM): number => {
  return PRICING[ticketType].regular;
};

// Define the possible referral sources
export type ReferralSource = 
  | "Friends" 
  | "University ASA" 
  | "LinkedIn" 
  | "Instagram" 
  | "No Bystanders" 
  | "RAADE Outreach Team"
  | "Other";

// Schema for registration form data
export const registrationFormSchema = z.object({
  role: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Full name is required"),
  organization: z.string().optional(),
  ticketType: z.enum(["student", "professional", "student-group"]),
  referralSource: z.enum([
    "Friends", 
    "University ASA", 
    "LinkedIn", 
    "Instagram", 
    "No Bystanders", 
    "RAADE Outreach Team",
    "Other"
  ]).optional(),
  otherReferralSource: z.string().optional(),
  isUniversityOrAffiliate: z.boolean().optional(),
  groupSize: z.number().min(3, "Group size must be at least 3").max(20, "Group size cannot exceed 20").optional(),
  groupEmails: z.array(
    z.object({
      value: z.string().email("Please enter a valid email address")
    })
  ).optional(),
  specialRequests: z.string().optional()
});

// Type for the form data
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

// Calculate the total price based on ticket type and group size
export const calculateTotalPrice = (data: RegistrationFormData): number => {
  const ticketType = data.ticketType as TICKET_TYPES_ENUM;
  
  if (ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP && data.groupSize) {
    return getTicketPrice(TICKET_TYPES_ENUM.STUDENT_GROUP) * data.groupSize;
  }
  
  return getTicketPrice(ticketType as TICKET_TYPES_ENUM);
};
