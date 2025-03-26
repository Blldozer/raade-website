
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
  specialRequests: z.string().optional()
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
  referralSource: undefined
};

/**
 * Get the ticket price based on ticket type
 * @param ticketType The type of ticket
 * @returns The price of the ticket in USD
 */
export const getTicketPrice = (ticketType: typeof TICKET_TYPES[number]): number => {
  switch (ticketType) {
    case TICKET_TYPES_ENUM.STUDENT:
      return 50;
    case TICKET_TYPES_ENUM.PROFESSIONAL:
      return 100;
    case TICKET_TYPES_ENUM.STUDENT_GROUP:
      return 30; // Per person in group
    default:
      return 50; // Default to student price
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
  groupSize?: number
): number => {
  const basePrice = getTicketPrice(ticketType);
  
  if (ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP && groupSize) {
    return basePrice * groupSize;
  }
  
  return basePrice;
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
