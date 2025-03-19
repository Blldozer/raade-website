
// Calculate payment amount based on ticket type
export function calculatePaymentAmount(ticketType: string, groupSize?: number) {
  let amount = 0;
  let description = "";

  // Calculate amount based on ticket type - using the updated pricing
  switch (ticketType) {
    case "student":
      amount = 3500; // $35.00
      description = "Student Ticket - RAADE Conference 2025";
      break;
    case "professional":
      amount = 6000; // $60.00
      description = "Professional Ticket - RAADE Conference 2025";
      break;
    case "student-group":
      // Ensure minimum group size of 5
      const finalGroupSize = Math.max(groupSize || 5, 5);
      amount = 3000 * finalGroupSize; // $30.00 per person
      description = `Student Group (${finalGroupSize} members) - RAADE Conference 2025`;
      break;
    default:
      throw new Error(`Invalid ticket type: ${ticketType}`);
  }

  return { amount, description, isGroupRegistration: ticketType === "student-group" };
}
