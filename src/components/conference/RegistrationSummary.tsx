
import { RegistrationFormData, getTicketPriceText } from "./RegistrationFormTypes";

interface RegistrationSummaryProps {
  registrationData: RegistrationFormData;
}

/**
 * RegistrationSummary Component
 * 
 * Displays a summary of the user's registration information including:
 * - Personal details
 * - Ticket type and pricing
 * - Group size and total cost for group registrations
 * 
 * @param registrationData - The form data from the registration form
 */
const RegistrationSummary = ({ registrationData }: RegistrationSummaryProps) => {
  const isStudentGroup = registrationData.ticketType === "student-group";
  
  // Calculate total price for group registrations
  let totalPrice = "";
  if (isStudentGroup && registrationData.groupSize) {
    const perPersonPrice = 30;
    const totalAmount = perPersonPrice * registrationData.groupSize;
    totalPrice = `$${totalAmount} total ($${perPersonPrice}/person × ${registrationData.groupSize})`;
  }
  
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="font-medium mb-2 font-simula">Registration Summary</h3>
      <p className="font-lora"><strong>Name:</strong> {registrationData.fullName}</p>
      <p className="font-lora"><strong>Email:</strong> {registrationData.email}</p>
      <p className="font-lora"><strong>Organization:</strong> {registrationData.organization}</p>
      <p className="font-lora"><strong>Ticket Type:</strong> {registrationData.ticketType} {getTicketPriceText(registrationData.ticketType || "")}</p>
      
      {isStudentGroup && registrationData.groupSize && (
        <>
          <p className="font-lora"><strong>Group Size:</strong> {registrationData.groupSize} people</p>
          {totalPrice && <p className="font-lora"><strong>Total Price:</strong> {totalPrice}</p>}
        </>
      )}
      
      {registrationData.specialRequests && (
        <p className="font-lora mt-2"><strong>Special Requests:</strong> {registrationData.specialRequests}</p>
      )}
    </div>
  );
};

export default RegistrationSummary;
