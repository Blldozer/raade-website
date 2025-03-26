
import { z } from "zod";

// Define the allowed ticket types
export const TICKET_TYPES = ["student", "professional", "student-group"] as const;

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

// Infer the TypeScript type from the Zod schema
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

// Export the default values for the form
export const defaultFormValues: RegistrationFormData = {
  fullName: "",
  email: "",
  organization: "",
  role: "",
  ticketType: "student",
  isUniversityOrAffiliate: false,
  groupSize: undefined,
  groupEmails: [],
  specialRequests: "",
  referralSource: undefined
};
