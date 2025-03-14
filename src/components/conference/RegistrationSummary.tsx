
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
 * - All information is presented in an accessible, responsive layout
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
      <dl className="space-y-1">
        <div className="flex flex-wrap">
          <dt className="font-medium w-32 font-lora">Name:</dt>
          <dd className="font-lora">{registrationData.fullName}</dd>
        </div>
        <div className="flex flex-wrap">
          <dt className="font-medium w-32 font-lora">Email:</dt>
          <dd className="font-lora break-all">{registrationData.email}</dd>
        </div>
        <div className="flex flex-wrap">
          <dt className="font-medium w-32 font-lora">Organization:</dt>
          <dd className="font-lora">{registrationData.organization}</dd>
        </div>
        <div className="flex flex-wrap">
          <dt className="font-medium w-32 font-lora">Ticket Type:</dt>
          <dd className="font-lora">{registrationData.ticketType} {getTicketPriceText(registrationData.ticketType || "")}</dd>
        </div>
      </dl>
      
      {isStudentGroup && registrationData.groupSize && (
        <div className="mt-2 border-t pt-2">
          <div className="flex flex-wrap">
            <dt className="font-medium w-32 font-lora">Group Size:</dt>
            <dd className="font-lora">{registrationData.groupSize} people</dd>
          </div>
          {totalPrice && (
            <div className="flex flex-wrap">
              <dt className="font-medium w-32 font-lora">Total Price:</dt>
              <dd className="font-lora text-blue-700">{totalPrice}</dd>
            </div>
          )}
        </div>
      )}
      
      {registrationData.specialRequests && (
        <div className="mt-2 border-t pt-2">
          <dt className="font-medium font-lora">Special Requests:</dt>
          <dd className="font-lora mt-1 text-gray-700">{registrationData.specialRequests}</dd>
        </div>
      )}
    </div>
  );
};

export default RegistrationSummary;
