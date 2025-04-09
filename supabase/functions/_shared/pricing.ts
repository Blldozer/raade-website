
/**
 * Calculate payment amount based on ticket type and group size
 * @param ticketType Type of ticket (student, professional, student-group)
 * @param groupSize Size of the group (for student-group tickets)
 * @returns Object with amount (in cents) and description
 */
export function calculatePaymentAmount(ticketType: string, groupSize?: number | undefined) {
  // Define base prices in dollars
  const STUDENT_PRICE = 35;
  const PROFESSIONAL_PRICE = 60;
  const STUDENT_GROUP_PRICE = 30;
  
  // Define sale prices (valid until April 8, 2025)
  const SALE_STUDENT_PRICE = 25;
  const SALE_PROFESSIONAL_PRICE = 50;
  const SALE_STUDENT_GROUP_PRICE = 20;
  
  // Check if sale is active (before April 8, 2025 at 4:00 PM CST)
  const saleEndDate = new Date('2025-04-08T16:00:00-05:00');
  const isSaleActive = new Date() < saleEndDate;
  
  let amount: number;
  let description: string;
  let isGroupRegistration = false;
  
  switch (ticketType) {
    case "student":
      amount = isSaleActive ? SALE_STUDENT_PRICE : STUDENT_PRICE;
      description = "Student Ticket";
      break;
    case "professional":
      amount = isSaleActive ? SALE_PROFESSIONAL_PRICE : PROFESSIONAL_PRICE;
      description = "Professional Ticket";
      break;
    case "student-group":
      if (!groupSize || groupSize < 3) {
        throw new Error("Group size must be at least 3 for group tickets");
      }
      
      amount = (isSaleActive ? SALE_STUDENT_GROUP_PRICE : STUDENT_GROUP_PRICE) * groupSize;
      description = `Student Group (${groupSize} attendees)`;
      isGroupRegistration = true;
      break;
    default:
      throw new Error("Invalid ticket type");
  }
  
  // Convert dollars to cents for Stripe
  return {
    amount: Math.round(amount * 100),
    description,
    isGroupRegistration
  };
}
