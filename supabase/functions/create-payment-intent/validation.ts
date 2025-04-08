
import { createErrorResponse } from "./utils.ts";

// Validate Stripe API key format
export function validateStripeKey(stripeSecretKey: string | undefined, requestId: string) {
  if (!stripeSecretKey) {
    console.error(`[${requestId}] STRIPE_SECRET_KEY is not set in environment variables`);
    return createErrorResponse(
      "Server configuration error: Missing Stripe secret key",
      undefined,
      500,
      requestId
    );
  }

  // Validate the secret key format (should start with sk_)
  if (!stripeSecretKey.startsWith('sk_')) {
    console.error(`[${requestId}] Invalid STRIPE_SECRET_KEY format, should start with sk_`);
    return createErrorResponse(
      "Server configuration error: Invalid Stripe secret key format",
      undefined,
      500,
      requestId
    );
  }
  
  return null; // No error
}

// Validate required request fields
export function validateRequestData(requestData: any, requestId: string) {
  const { ticketType, email, fullName, groupSize } = requestData;
  
  // Validate input data
  if (!ticketType || !email || !fullName) {
    console.error(`[${requestId}] Missing required fields`);
    return createErrorResponse(
      "Missing required fields",
      "Ticket type, email, and full name are required",
      400,
      requestId
    );
  }
  
  // Validate group size for student-group tickets
  const isGroupRegistration = ticketType === "student-group";
  if (isGroupRegistration) {
    if (!groupSize || groupSize < 5) {
      console.error(`[${requestId}] Invalid group size: ${groupSize}`);
      return createErrorResponse(
        "Invalid group size",
        "Group registrations require a minimum of 5 people",
        400,
        requestId
      );
    }
  }
  
  return null; // No error
}
