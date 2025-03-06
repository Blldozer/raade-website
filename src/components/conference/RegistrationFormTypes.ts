
import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(2, "Organization name is required"),
  role: z.string().min(2, "Your role is required"),
  ticketType: z.string().min(1, "Please select a ticket type"),
  specialRequests: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const getTicketPriceText = (ticketType: string) => {
  switch (ticketType) {
    case "early-bird": return "($199)";
    case "standard": return "($249)";
    case "student": return "($99)";
    case "speaker": return "(Free)";
    default: return "";
  }
};
