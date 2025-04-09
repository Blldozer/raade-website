
import { z } from "zod";

// Define the allowed ticket types
export const TICKET_TYPES = ["student", "professional", "student-group"] as const;

// Define constants for easier reference (to avoid string literals)
export const TICKET_TYPES_ENUM = {
  STUDENT: "student",
  PROFESSIONAL: "professional",
  STUDENT_GROUP: "student-group"
} as const;

/**
 * Get the ticket price based on ticket type
 * Automatically accounts for whether the sale is active
 * @param ticketType The type of ticket
 * @returns The price of the ticket in USD
 */
export const getTicketPrice = (ticketType: typeof TICKET_TYPES[number]): number => {
  const saleActive = isSaleActive();
  
  switch (ticketType) {
    case TICKET_TYPES_ENUM.STUDENT:
      return saleActive ? 25 : 35; // Sale: $25, Regular: $35
    case TICKET_TYPES_ENUM.PROFESSIONAL:
      return saleActive ? 50 : 60; // Sale: $50, Regular: $60
    case TICKET_TYPES_ENUM.STUDENT_GROUP:
      return saleActive ? 20 : 30; // Sale: $20, Regular: $30 per person
    default:
      return saleActive ? 25 : 35; // Default to student price
  }
};

/**
 * Get the regular (non-sale) ticket price 
 * @param ticketType The type of ticket
 * @returns The regular price of the ticket in USD
 */
export const getRegularTicketPrice = (ticketType: typeof TICKET_TYPES[number]): number => {
  switch (ticketType) {
    case TICKET_TYPES_ENUM.STUDENT:
      return 35; // Regular price
    case TICKET_TYPES_ENUM.PROFESSIONAL:
      return 60; // Regular price
    case TICKET_TYPES_ENUM.STUDENT_GROUP:
      return 30; // Regular price per person
    default:
      return 35; // Default to student price
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

// Import this from SaleConfig to avoid circular dependency
import { isSaleActive } from "./SaleConfig";
