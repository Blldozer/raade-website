
import { RegistrationFormData, TicketType } from "../../RegistrationFormTypes";
import { supabase } from "@/integrations/supabase/client";

/**
 * Process registration data response interface
 */
export interface ProcessRegistrationResponse {
  success: boolean;
  message?: string;
}

/**
 * Processes registration data for API submission
 * 
 * Takes the form data and formats it for the backend API
 * - Ensures all required fields are present
 * - Processes group information correctly
 * - Performs email validation if needed
 * 
 * @param data The registration form data
 * @returns A clean, API-ready registration data object with success/error status
 */
export const processRegistrationData = async (data: RegistrationFormData): Promise<ProcessRegistrationResponse> => {
  // Ensure all required fields have values
  if (!data.fullName || !data.email || !data.organization || !data.role || !data.ticketType) {
    return {
      success: false,
      message: "Missing required fields in registration data"
    };
  }
  
  // Extract only the email strings from any group email objects
  let processedGroupEmails: string[] = [];
  
  if (data.ticketType === "student-group" && data.groupEmails) {
    processedGroupEmails = data.groupEmails
      .filter(emailObj => emailObj && (typeof emailObj === 'string' || (typeof emailObj === 'object' && emailObj !== null)))
      .map(emailObj => {
        if (typeof emailObj === 'string') return emailObj;
        if (typeof emailObj === 'object' && emailObj !== null) {
          if ('value' in emailObj) return String(emailObj.value || '');
          if ('email' in emailObj) return String(emailObj.email || '');
        }
        return '';
      })
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
  
  try {
    // Make API call or store data in database
    const { error } = await supabase.from('conference_registrations').insert({
      full_name: data.fullName,
      email: data.email,
      organization: data.organization,
      role: data.role,
      ticket_type: data.ticketType,
      special_requests: data.specialRequests,
      status: 'paid', // Since this is called after payment
      coupon_code: data.couponCode
    });
    
    if (error) {
      console.error("Error storing registration data:", error);
      return {
        success: false,
        message: "Failed to save your registration. Please contact support."
      };
    }
    
    // If it's a group registration, store the group members
    if (data.ticketType === "student-group" && processedGroupEmails.length > 0) {
      // First create the group
      const { data: groupData, error: groupError } = await supabase.from('group_registrations').insert({
        lead_name: data.fullName,
        lead_email: data.email,
        lead_organization: data.organization,
        group_size: data.groupSize || processedGroupEmails.length + 1,
        ticket_type: data.ticketType,
        payment_completed: true,
        completed: true
      }).select('id').single();
      
      if (groupError || !groupData) {
        console.error("Error creating group registration:", groupError);
        return {
          success: true, // Main registration succeeded, just the group tracking failed
          message: "Your registration was successful, but there was an issue saving group details."
        };
      }
      
      // Now insert all group members
      const groupMemberInserts = processedGroupEmails.map(email => ({
        email,
        group_id: groupData.id,
        email_verified: false, // They'll need to verify later
      }));
      
      const { error: membersError } = await supabase
        .from('group_registration_members')
        .insert(groupMemberInserts);
      
      if (membersError) {
        console.error("Error saving group members:", membersError);
        return {
          success: true, // Main registration succeeded
          message: "Registration successful, but there was an issue saving all group member details."
        };
      }
    }
    
    // Success
    return {
      success: true,
      message: "Registration completed successfully!"
    };
  } catch (error) {
    console.error("Registration processing error:", error);
    return {
      success: false,
      message: "An unexpected error occurred processing your registration."
    };
  }
};
