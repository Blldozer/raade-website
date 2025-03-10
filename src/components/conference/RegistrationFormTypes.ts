
import { z } from "zod";

// Ticket type constants
export const TICKET_TYPES = {
  RICE_STUDENT: "rice-student",
  NON_RICE_STUDENT: "non-rice-student",
  YOUNG_PROFESSIONAL: "professional",
  STUDENT_GROUP: "student-group"
};

// Email schema with domain validation helper
export const emailSchema = z.string().email("Please enter a valid email address");

// Registration schema
export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: emailSchema,
  organization: z.string().min(2, "Organization name is required"),
  role: z.string().min(2, "Your role is required"),
  ticketType: z.string().min(1, "Please select a ticket type"),
  specialRequests: z.string().optional(),
  groupSize: z.number().optional(),
  // Define group emails as an array of objects with a value property
  groupEmails: z.array(
    z.object({
      value: z.string().email("Please enter valid email addresses")
    })
  ).optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Helper functions for ticket pricing and validation
export const getTicketPriceText = (ticketType: string) => {
  switch (ticketType) {
    case TICKET_TYPES.RICE_STUDENT: return "($50)";
    case TICKET_TYPES.NON_RICE_STUDENT: return "($65)";
    case TICKET_TYPES.YOUNG_PROFESSIONAL: return "($85)";
    case TICKET_TYPES.STUDENT_GROUP: return "($50/person, min 5)";
    default: return "";
  }
};

export const getTicketPrice = (ticketType: string): number => {
  switch (ticketType) {
    case TICKET_TYPES.RICE_STUDENT: return 50;
    case TICKET_TYPES.NON_RICE_STUDENT: return 65;
    case TICKET_TYPES.YOUNG_PROFESSIONAL: return 85;
    case TICKET_TYPES.STUDENT_GROUP: return 50; // Per person
    default: return 0;
  }
};

export interface EmailValidationResult {
  isValid: boolean;
  isRiceEmail: boolean;
  isEduEmail: boolean;
  isKnownInstitution: boolean;
  domain: string;
}

// Email domain validation functions
export const validateEmailDomain = (email: string): EmailValidationResult => {
  const domain = email.split('@')[1]?.toLowerCase();
  
  if (!domain) {
    return {
      isValid: false,
      isRiceEmail: false,
      isEduEmail: false,
      isKnownInstitution: false,
      domain: ""
    };
  }

  const isRiceEmail = domain === "rice.edu";
  const isEduEmail = domain.endsWith('.edu');
  
  return {
    isValid: true,
    isRiceEmail,
    isEduEmail,
    isKnownInstitution: false, // Will be set by the server after checking the database
    domain
  };
};

export const validateTicketEmailDomain = (email: string, ticketType: string): { isValid: boolean; message?: string } => {
  const validation = validateEmailDomain(email);
  
  if (!validation.isValid) {
    return { isValid: false, message: "Invalid email format" };
  }

  // Rice Student tickets must use rice.edu email
  if (ticketType === TICKET_TYPES.RICE_STUDENT && !validation.isRiceEmail) {
    return { 
      isValid: false, 
      message: "Rice Student tickets require a rice.edu email address" 
    };
  }
  
  // Non-Rice Student and Student Group tickets require any .edu email
  if ((ticketType === TICKET_TYPES.NON_RICE_STUDENT || ticketType === TICKET_TYPES.STUDENT_GROUP) && !validation.isEduEmail) {
    return { 
      isValid: false, 
      message: "Student tickets require an .edu email address" 
    };
  }

  // All other ticket types don't have domain restrictions
  return { isValid: true };
};
