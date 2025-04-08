
import { RegistrationFormData } from "./RegistrationFormTypes";

interface RegistrationSummaryProps {
  registrationData: RegistrationFormData;
  couponDiscount?: number;
}

/**
 * RegistrationSummary Component
 * 
 * Displays a summary of the registration information:
 * - Shows personal and ticket details
 * - Calculates and displays pricing information
 * - Handles group registrations with multiple attendees
 * - Now supports coupon discount display
 */
const RegistrationSummary = ({ 
  registrationData,
  couponDiscount = 0
}: RegistrationSummaryProps) => {
  const isGroupRegistration = registrationData.ticketType === "student-group";
  
  // Calculate the base price based on registration data
  const getBasePrice = () => {
    const ticketPrice = 
      registrationData.ticketType === "student" ? 25 :
      registrationData.ticketType === "professional" ? 50 : 20;
    
    if (isGroupRegistration && registrationData.groupSize) {
      return ticketPrice * registrationData.groupSize;
    }
    
    return ticketPrice;
  };
  
  const basePrice = getBasePrice();
  
  // Calculate the discounted price if a coupon is applied
  const discountAmount = basePrice * (couponDiscount / 100);
  const finalPrice = Math.max(basePrice - discountAmount, 0);
  
  return (
    <div className="p-4 border border-gray-200 rounded-md mb-6 dark:border-gray-700">
      <h3 className="font-bold text-lg mb-4 font-simula">Registration Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Personal Information</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><span className="font-medium">Name:</span> {registrationData.fullName}</li>
            <li><span className="font-medium">Email:</span> {registrationData.email}</li>
            <li><span className="font-medium">Organization:</span> {registrationData.organization}</li>
            <li><span className="font-medium">Role:</span> {registrationData.role}</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Ticket Details</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <span className="font-medium">Ticket Type:</span> {
                registrationData.ticketType === "student" ? "Student" :
                registrationData.ticketType === "professional" ? "Professional" :
                "Student Group"
              }
            </li>
            {isGroupRegistration && registrationData.groupSize && (
              <li><span className="font-medium">Group Size:</span> {registrationData.groupSize} people</li>
            )}
            {registrationData.referralSource && (
              <li><span className="font-medium">Referred By:</span> {registrationData.referralSource}</li>
            )}
          </ul>
        </div>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-700 dark:text-gray-300">Payment Details</h4>
        <div className="mt-2 space-y-1 text-sm">
          <p><span className="font-medium">Base Price:</span> ${basePrice.toFixed(2)}</p>
          
          {couponDiscount > 0 && (
            <>
              <p className="text-green-600 dark:text-green-400">
                <span className="font-medium">Coupon Discount:</span> {couponDiscount}% (-${discountAmount.toFixed(2)})
              </p>
              <p className="font-bold">
                <span className="font-medium">Final Price:</span> ${finalPrice.toFixed(2)}
              </p>
            </>
          )}
          
          {couponDiscount === 100 && (
            <p className="text-green-600 dark:text-green-400 font-bold mt-2">
              Your registration is free with this coupon!
            </p>
          )}
        </div>
      </div>
      
      {registrationData.specialRequests && (
        <div className="border-t pt-4 mt-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Special Requests</h4>
          <p className="mt-2 text-sm">{registrationData.specialRequests}</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationSummary;
