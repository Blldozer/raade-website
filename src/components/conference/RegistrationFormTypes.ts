
import { z } from "zod";

// Ticket type constants
export const TICKET_TYPES = {
  STUDENT: "student",
  PROFESSIONAL: "professional",
  STUDENT_GROUP: "student-group"
};

// Email schema with domain validation helper
export const emailSchema = z.string().email("Please enter a valid email address");

// Group size validation schema
export const groupSizeSchema = z.number()
  .min(5, "Group registrations require at least 5 people")
  .max(10, "Group registrations are limited to 10 people")
  .int("Group size must be a whole number");

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
}).refine(data => {
  // If ticket type is student-group, groupSize is required and must be at least 5
  if (data.ticketType === TICKET_TYPES.STUDENT_GROUP) {
    return data.groupSize && data.groupSize >= 5;
  }
  return true;
}, {
  message: "Group size must be at least 5 people for group registrations",
  path: ["groupSize"]
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

/**
 * Helper functions for ticket pricing and validation
 * 
 * These functions provide consistent pricing information
 * across different components of the registration system.
 */
export const getTicketPriceText = (ticketType: string) => {
  switch (ticketType) {
    case TICKET_TYPES.STUDENT: return "($35)";
    case TICKET_TYPES.PROFESSIONAL: return "($60)";
    case TICKET_TYPES.STUDENT_GROUP: return "($30/person, min 5)";
    default: return "";
  }
};

export const getTicketPrice = (ticketType: string): number => {
  switch (ticketType) {
    case TICKET_TYPES.STUDENT: return 35;
    case TICKET_TYPES.PROFESSIONAL: return 60;
    case TICKET_TYPES.STUDENT_GROUP: return 30;
    default: return 0;
  }
};

/**
 * Calculates the total price for a ticket
 * 
 * @param ticketType - The type of ticket
 * @param groupSize - Optional group size for student-group tickets
 * @returns The total price in dollars
 */
export const calculateTotalPrice = (ticketType: string, groupSize?: number): number => {
  const unitPrice = getTicketPrice(ticketType);
  
  if (ticketType === TICKET_TYPES.STUDENT_GROUP && groupSize) {
    return unitPrice * groupSize;
  }
  
  return unitPrice;
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

  // Student and Student Group tickets require any .edu email
  if ((ticketType === TICKET_TYPES.STUDENT || ticketType === TICKET_TYPES.STUDENT_GROUP) && !validation.isEduEmail) {
    return { 
      isValid: false, 
      message: "Student tickets require an .edu email address" 
    };
  }

  // All other ticket types don't have domain restrictions
  return { isValid: true };
};
