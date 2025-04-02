
import { z } from "zod";

// Define the available ticket types
export const TICKET_TYPES_ENUM = {
  STUDENT: "student",
  PROFESSIONAL: "professional",
  STUDENT_GROUP: "student-group"
} as const;

/**
 * Get price display text for each ticket type
 */
export function getTicketPriceText(ticketType: string) {
  switch(ticketType) {
    case TICKET_TYPES_ENUM.STUDENT:
      return "($35)";
    case TICKET_TYPES_ENUM.PROFESSIONAL:
      return "($60)";
    case TICKET_TYPES_ENUM.STUDENT_GROUP:
      return "($30 per person, min 5 people)";
    default:
      return "";
  }
}

/**
 * Get numeric price value for each ticket type (in dollars)
 */
export function getTicketPrice(ticketType: string): number {
  switch(ticketType) {
    case TICKET_TYPES_ENUM.STUDENT:
      return 35;
    case TICKET_TYPES_ENUM.PROFESSIONAL:
      return 60;
    case TICKET_TYPES_ENUM.STUDENT_GROUP:
      return 30;
    default:
      return 0;
  }
}

/**
 * Calculate the total price based on ticket type and group size
 */
export function calculateTotalPrice(ticketType: string, groupSize?: number): number {
  if (ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP && groupSize && groupSize >= 5) {
    return groupSize * getTicketPrice(TICKET_TYPES_ENUM.STUDENT_GROUP);
  }
  return getTicketPrice(ticketType);
}

// Define referral sources
export const REFERRAL_SOURCES = [
  "Rice University website",
  "Social media",
  "Friend or colleague",
  "Email",
  "Flyer or poster",
  "Professor or academic advisor",
  "Previous RAADE event",
  "Other"
] as const;

// Registration form schema definition
export const registrationFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  emailValid: z.boolean().optional(),
  organization: z.string().optional(),
  role: z.string().optional(),
  ticketType: z.enum([
    TICKET_TYPES_ENUM.STUDENT, 
    TICKET_TYPES_ENUM.PROFESSIONAL, 
    TICKET_TYPES_ENUM.STUDENT_GROUP
  ]),
  groupSize: z.number().min(5).optional()
    .refine(val => val === undefined || val >= 5, {
      message: "Group size must be at least 5",
    }),
  groupEmails: z.array(
    z.union([
      z.string().email("Invalid email"),
      z.object({ value: z.string().email("Invalid email") }),
      z.null()
    ])
  ).optional(),
  specialRequests: z.string().optional(),
  referralSource: z.string().optional(),
});

// Type for form data
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

// Validation function for student emails
export function validateStudentEmail(email: string): boolean {
  if (!email) return false;
  return email.trim().toLowerCase().endsWith('.edu');
}
