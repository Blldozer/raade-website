
/**
 * Calculate payment amount based on ticket type and group size
 * 
 * @param ticketType - Type of ticket (student, professional, student-group, trial)
 * @param groupSize - Size of group for group registrations
 * @returns Object with amount, description and group flag
 */
export function calculatePaymentAmount(
  ticketType: string, 
  groupSize?: number
): { amount: number; description: string; isGroupRegistration: boolean } {
  // Define base prices in cents
  const STUDENT_PRICE = 3500; // $35.00
  const PROFESSIONAL_PRICE = 6000; // $60.00
  const GROUP_PRICE_PER_PERSON = 3000; // $30.00 per person
  const TRIAL_PRICE = 100; // $1.00
  
  // Determine price based on ticket type
  switch (ticketType) {
    case "student":
      return {
        amount: STUDENT_PRICE,
        description: "RAADE Conference 2025 - Student Registration",
        isGroupRegistration: false
      };
    
    case "professional":
      return {
        amount: PROFESSIONAL_PRICE,
        description: "RAADE Conference 2025 - Professional Registration",
        isGroupRegistration: false
      };
    
    case "student-group":
      // Validate group size
      if (!groupSize || groupSize < 5) {
        throw new Error("Invalid ticket type: Group registrations require at least 5 participants");
      }
      
      // Calculate total price for the group
      const totalAmount = GROUP_PRICE_PER_PERSON * groupSize;
      
      return {
        amount: totalAmount,
        description: `RAADE Conference 2025 - Student Group Registration (${groupSize} attendees)`,
        isGroupRegistration: true
      };
      
    case "trial":
      return {
        amount: TRIAL_PRICE,
        description: "RAADE Conference 2025 - Trial Registration ($1)",
        isGroupRegistration: false
      };
    
    default:
      throw new Error(`Invalid ticket type: ${ticketType}`);
  }
}
