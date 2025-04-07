
/**
 * Calculate payment amount based on ticket type and group size
 * 
 * @param ticketType - Type of ticket (student, professional, student-group)
 * @param groupSize - Size of group for group registrations
 * @returns Object with amount, description and group flag
 */
export function calculatePaymentAmount(
  ticketType: string, 
  groupSize?: number
): { amount: number; description: string; isGroupRegistration: boolean } {
  // Define SALE prices in cents
  const STUDENT_PRICE = 2500; // $25.00 (was $35.00)
  const PROFESSIONAL_PRICE = 5000; // $50.00 (was $60.00)
  const GROUP_PRICE_PER_PERSON = 2000; // $20.00 per person (was $30.00)
  
  // Determine price based on ticket type
  switch (ticketType) {
    case "student":
      return {
        amount: STUDENT_PRICE,
        description: "RAADE Conference 2025 - Student Registration (SALE)",
        isGroupRegistration: false
      };
    
    case "professional":
      return {
        amount: PROFESSIONAL_PRICE,
        description: "RAADE Conference 2025 - Professional Registration (SALE)",
        isGroupRegistration: false
      };
    
    case "student-group":
      // Validate group size - now minimum 3 (was 5)
      if (!groupSize || groupSize < 3) {
        throw new Error("Invalid ticket type: Group registrations require at least 3 participants");
      }
      
      // Calculate total price for the group
      const totalAmount = GROUP_PRICE_PER_PERSON * groupSize;
      
      return {
        amount: totalAmount,
        description: `RAADE Conference 2025 - Student Group Registration (SALE - ${groupSize} attendees)`,
        isGroupRegistration: true
      };
    
    default:
      throw new Error(`Invalid ticket type: ${ticketType}`);
  }
}
