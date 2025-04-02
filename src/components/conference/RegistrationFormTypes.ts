
import { z } from "zod";

// Define the available ticket types
export const TICKET_TYPES_ENUM = {
  STUDENT: "student",
  PROFESSIONAL: "professional",
  STUDENT_GROUP: "student-group",
  SPECIAL_BONUS: "special-bonus"
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
    case TICKET_TYPES_ENUM.SPECIAL_BONUS:
      return "($5)";
    default:
      return "";
  }
}

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
    TICKET_TYPES_ENUM.STUDENT_GROUP,
    TICKET_TYPES_ENUM.SPECIAL_BONUS
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
