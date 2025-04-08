
import { RegistrationFormData, TicketType } from "../../RegistrationFormTypes";

/**
 * Processes registration data for API submission
 * 
 * Takes the form data and formats it for the backend API
 * - Ensures all required fields are present
 * - Processes group information correctly
 * - Performs email validation if needed
 * 
 * @param data The registration form data
 * @returns A clean, API-ready registration data object
 */
export const processRegistrationData = (data: RegistrationFormData) => {
  // Ensure all required fields have values
  if (!data.fullName || !data.email || !data.organization || !data.role || !data.ticketType) {
    throw new Error("Missing required fields in registration data");
  }
  
  // Extract only the email strings from any group email objects
  let processedGroupEmails: string[] = [];
  
  if (data.ticketType === "student-group" && data.groupEmails) {
    processedGroupEmails = data.groupEmails
      .filter(emailObj => emailObj && typeof emailObj === 'object' && 'email' in emailObj)
      .map(emailObj => emailObj.email)
      .filter(email => email && email.trim() !== '');
  }
  
  // Verify that we have the right number of valid emails for groups
  if (data.ticketType === "student-group" && data.groupSize) {
    const emailCount = Array.isArray(processedGroupEmails) ? processedGroupEmails.length : 0;
    
    // For group registrations, we should have emails matching the group size
    if (emailCount < data.groupSize - 1) { // -1 because the main registrant is included in the group
      console.warn(`Group size is ${data.groupSize} but only ${emailCount} additional emails were provided.`);
    }
  }
  
  // Format data for API submission
  return {
    fullName: data.fullName,
    email: data.email,
    organization: data.organization,
    role: data.role,
    ticketType: data.ticketType as TicketType,
    referralSource: data.referralSource,
    specialRequests: data.specialRequests,
    groupSize: data.ticketType === "student-group" ? data.groupSize : undefined,
    groupEmails: data.ticketType === "student-group" ? processedGroupEmails : undefined,
    couponCode: data.couponCode && data.couponCode.trim() !== "" ? data.couponCode : undefined
  };
};
