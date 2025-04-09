
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
  if ((ticketType === "student" || ticketType === "student-group") && 
      !email.toLowerCase().endsWith('.edu')) {
    return { 
      isValid: false, 
      message: "Student tickets require an .edu email address" 
    };
  }

  return { isValid: true };
};
