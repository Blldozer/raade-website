
/**
 * Calculate payment amount based on ticket type, group size, and whether the sale is active
 * 
 * Sale period: April 7, 2025 4:00 PM CST to April 8, 2025 4:00 PM CST
 * 
 * @param ticketType - Type of ticket (student, professional, student-group)
 * @param groupSize - Size of group for group registrations
 * @returns Object with amount, description and group flag
 */
export function calculatePaymentAmount(
  ticketType: string, 
  groupSize?: number
): { amount: number; description: string; isGroupRegistration: boolean } {
  // Check if the sale is still active
  const currentDate = new Date();
  const saleEndDate = new Date('2025-04-08T16:00:00-05:00'); // CST is UTC-5
  const isSaleActive = currentDate < saleEndDate;
  
  // Define prices in cents based on whether the sale is active
  const STUDENT_PRICE = isSaleActive ? 2500 : 3500; // $25.00 (sale) / $35.00 (regular)
  const PROFESSIONAL_PRICE = isSaleActive ? 5000 : 6000; // $50.00 (sale) / $60.00 (regular)
  const GROUP_PRICE_PER_PERSON = isSaleActive ? 2000 : 3000; // $20.00 (sale) / $30.00 (regular) per person
  
  const saleSuffix = isSaleActive ? " (SALE)" : "";
  
  // Determine price based on ticket type
  switch (ticketType) {
    case "student":
      return {
        amount: STUDENT_PRICE,
        description: `RAADE Conference 2025 - Student Registration${saleSuffix}`,
        isGroupRegistration: false
      };
    
    case "professional":
      return {
        amount: PROFESSIONAL_PRICE,
        description: `RAADE Conference 2025 - Professional Registration${saleSuffix}`,
        isGroupRegistration: false
      };
    
    case "student-group":
      // Validate group size - minimum 3 for sale pricing
      if (!groupSize || groupSize < 3) {
        throw new Error("Invalid ticket type: Group registrations require at least 3 participants");
      }
      
      // Calculate total price for the group
      const totalAmount = GROUP_PRICE_PER_PERSON * groupSize;
      
      return {
        amount: totalAmount,
        description: `RAADE Conference 2025 - Student Group Registration${saleSuffix} (${groupSize} attendees)`,
        isGroupRegistration: true
      };
    
    default:
      throw new Error(`Invalid ticket type: ${ticketType}`);
  }
}
