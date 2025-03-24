
import { Card, CardContent } from "@/components/ui/card";
import { RegistrationFormData } from "./RegistrationFormTypes";
import { calculateTotalPrice } from "./RegistrationFormTypes";

interface RegistrationSummaryProps {
  registrationData: RegistrationFormData;
}

/**
 * RegistrationSummary Component
 * 
 * Displays a summary of the user's registration details:
 * - Shows key registration information
 * - Calculates and displays pricing
 * - Enhanced dark mode support for mobile devices
 * - Consistent color scheme that properly inverts in dark mode
 * - Improved contrast for better readability
 * 
 * @param registrationData - The form data to display in the summary
 */
const RegistrationSummary = ({ registrationData }: RegistrationSummaryProps) => {
  const { 
    fullName, 
    email, 
    organization, 
    role,
    ticketType, 
    groupSize, 
    specialRequests 
  } = registrationData;
  
  // Calculate total price
  const totalPrice = calculateTotalPrice(ticketType, groupSize);
  
  // Get formatted ticket type for display
  const getFormattedTicketType = () => {
    switch (ticketType) {
      case "student":
        return "Student";
      case "professional":
        return "Professional";
      case "student-group":
        return `Student Group (${groupSize} attendees)`;
      default:
        return ticketType;
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white transition-colors duration-200">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Registration Summary</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Name:</span>
            <span className="font-medium text-gray-900 dark:text-white">{fullName}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Email:</span>
            <span className="font-medium text-gray-900 dark:text-white">{email}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Organization:</span>
            <span className="font-medium text-gray-900 dark:text-white">{organization}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Role:</span>
            <span className="font-medium text-gray-900 dark:text-white">{role}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Ticket:</span>
            <span className="font-medium text-gray-900 dark:text-white">{getFormattedTicketType()}</span>
          </div>
          
          <div className="flex justify-between border-t pt-2 mt-2 border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300">Total:</span>
            <span className="font-bold text-[#274675] dark:text-[#FBB03B]">${totalPrice}.00</span>
          </div>
          
          {specialRequests && (
            <div className="border-t pt-2 mt-2 border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 block mb-1 dark:text-gray-300">Special Requests:</span>
              <p className="text-sm italic text-gray-700 dark:text-gray-200">{specialRequests}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationSummary;
