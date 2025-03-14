
import { RegistrationFormData, getTicketPriceText } from "./RegistrationFormTypes";

interface RegistrationSummaryProps {
  registrationData: RegistrationFormData;
}

const RegistrationSummary = ({ registrationData }: RegistrationSummaryProps) => {
  const isStudentGroup = registrationData.ticketType === "student-group";
  
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="font-medium mb-2 font-simula">Registration Summary</h3>
      <p className="font-lora"><strong>Name:</strong> {registrationData.fullName}</p>
      <p className="font-lora"><strong>Email:</strong> {registrationData.email}</p>
      <p className="font-lora"><strong>Organization:</strong> {registrationData.organization}</p>
      <p className="font-lora"><strong>Ticket Type:</strong> {registrationData.ticketType} {getTicketPriceText(registrationData.ticketType || "")}</p>
      
      {isStudentGroup && registrationData.groupSize && (
        <p className="font-lora"><strong>Group Size:</strong> {registrationData.groupSize} people</p>
      )}
    </div>
  );
};

export default RegistrationSummary;
