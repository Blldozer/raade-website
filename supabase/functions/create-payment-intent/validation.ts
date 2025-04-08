
/**
 * Validates Stripe API key format
 * 
 * @param key - The Stripe API key to validate
 * @param requestId - Request ID for tracking
 * @returns Error response or null if valid
 */
export const validateStripeKey = (key: string | undefined, requestId?: string) => {
  // Check if key is present
  if (!key) {
    console.error(`[${requestId}] Missing Stripe secret key in environment variables`);
    return createErrorResponse(
      "Server configuration error: Missing Stripe API key", 
      "The payment service is misconfigured. Please contact support.",
      500,
      requestId
    );
  }
  
  // Check key format (starts with sk_live_ or sk_test_)
  const keyPattern = /^sk_(live|test)_[a-zA-Z0-9]{24,}$/;
  if (!keyPattern.test(key)) {
    console.error(`[${requestId}] Invalid Stripe secret key format`);
    return createErrorResponse(
      "Server configuration error: Invalid Stripe API key format", 
      "The payment service is misconfigured. Please contact support.",
      500,
      requestId
    );
  }
  
  return null;
};

/**
 * Validates request data for payment intent creation
 * 
 * @param data - The request data to validate
 * @param requestId - Request ID for tracking
 * @returns Error response or null if valid
 */
export const validateRequestData = (data: any, requestId?: string) => {
  // Handle check-only mode separately
  if (data.checkOnly === true) {
    return null; // Skip validation for connection checks
  }
  
  // Check for required fields
  if (!data.ticketType) {
    console.error(`[${requestId}] Missing ticket type in request`);
    return createErrorResponse(
      "Missing required field: ticketType",
      "Please select a ticket type to continue.",
      400,
      requestId
    );
  }
  
  if (!data.email) {
    console.error(`[${requestId}] Missing email in request`);
    return createErrorResponse(
      "Missing required field: email",
      "Please provide your email address to continue.",
      400,
      requestId
    );
  }
  
  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    console.error(`[${requestId}] Invalid email format: ${data.email}`);
    return createErrorResponse(
      "Invalid email format",
      "Please provide a valid email address.",
      400,
      requestId
    );
  }
  
  // Validate ticket type
  const validTicketTypes = ["student", "professional", "student-group"];
  if (!validTicketTypes.includes(data.ticketType)) {
    console.error(`[${requestId}] Invalid ticket type: ${data.ticketType}`);
    return createErrorResponse(
      `Invalid ticket type: ${data.ticketType}`,
      "Please select a valid ticket type.",
      400,
      requestId
    );
  }
  
  // Group size validation for student-group
  if (data.ticketType === "student-group") {
    const groupSize = parseInt(data.groupSize);
    
    if (isNaN(groupSize) || groupSize < 3) {
      console.error(`[${requestId}] Invalid group size for student-group: ${data.groupSize}`);
      return createErrorResponse(
        "Invalid group size for student-group ticket",
        "Group registrations require at least 3 participants.",
        400,
        requestId
      );
    }
  }
  
  return null;
};

// Import and re-export createErrorResponse for usage
import { createErrorResponse } from "./utils.ts";
export { createErrorResponse };
