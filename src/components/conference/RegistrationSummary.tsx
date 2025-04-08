
import { RegistrationFormData, calculateTotalPrice, getTicketPrice, TICKET_TYPES_ENUM, CouponData } from "./RegistrationFormTypes";

interface RegistrationSummaryProps {
  registrationData: RegistrationFormData;
  couponData?: CouponData | null;
}

/**
 * Registration Summary Component
 * 
 * Displays a summary of registration details before payment:
 * - Ticket type and pricing information
 * - Attendee details
 * - Group registration details if applicable
 * - Coupon discount information if applicable
 * 
 * @param registrationData - Form data from the registration form
 * @param couponData - Applied coupon code data (if any)
 */
const RegistrationSummary = ({ registrationData, couponData }: RegistrationSummaryProps) => {
  const { fullName, email, organization, role, ticketType, groupSize } = registrationData;
  
  // Calculate ticket pricing
  const basePrice = getTicketPrice(ticketType);
  const isGroupRegistration = ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP;
  const totalBeforeDiscount = isGroupRegistration && groupSize 
    ? basePrice * groupSize 
    : basePrice;
  
  // Calculate discounted price if coupon is applied
  const finalPrice = calculateTotalPrice(ticketType, groupSize, couponData);
  const discountAmount = totalBeforeDiscount - finalPrice;
  const hasDiscount = discountAmount > 0;
  
  // Determine if this is a free registration (100% discount)
  const isFreeRegistration = couponData?.discount_type === 'full' || finalPrice === 0;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white font-simula">Registration Summary</h3>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <div className="grid gap-2">
          <div className="grid grid-cols-2">
            <span className="text-gray-600 dark:text-gray-400">Name:</span>
            <span className="text-gray-900 dark:text-white font-medium">{fullName}</span>
          </div>
          
          <div className="grid grid-cols-2">
            <span className="text-gray-600 dark:text-gray-400">Email:</span>
            <span className="text-gray-900 dark:text-white font-medium">{email}</span>
          </div>
          
          <div className="grid grid-cols-2">
            <span className="text-gray-600 dark:text-gray-400">Organization:</span>
            <span className="text-gray-900 dark:text-white font-medium">{organization}</span>
          </div>
          
          <div className="grid grid-cols-2">
            <span className="text-gray-600 dark:text-gray-400">Role:</span>
            <span className="text-gray-900 dark:text-white font-medium">{role}</span>
          </div>
          
          <div className="grid grid-cols-2">
            <span className="text-gray-600 dark:text-gray-400">Ticket Type:</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {ticketType === TICKET_TYPES_ENUM.STUDENT && "Student"}
              {ticketType === TICKET_TYPES_ENUM.PROFESSIONAL && "Professional"}
              {ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP && "Student Group"}
            </span>
          </div>
          
          {isGroupRegistration && groupSize && (
            <div className="grid grid-cols-2">
              <span className="text-gray-600 dark:text-gray-400">Group Size:</span>
              <span className="text-gray-900 dark:text-white font-medium">{groupSize} students</span>
            </div>
          )}
          
          {/* Show coupon code if applied */}
          {couponData && (
            <div className="grid grid-cols-2">
              <span className="text-gray-600 dark:text-gray-400">Coupon Code:</span>
              <span className="text-green-600 dark:text-green-400 font-medium">{couponData.code}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Payment summary with pricing */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Payment Summary</h4>
        
        <div className="space-y-1">
          {/* Base price */}
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              {isGroupRegistration 
                ? `Group Registration (${groupSize} × $${basePrice})` 
                : `${ticketType === TICKET_TYPES_ENUM.STUDENT ? 'Student' : 'Professional'} Ticket`}
            </span>
            <span className="text-gray-900 dark:text-white">${totalBeforeDiscount}</span>
          </div>
          
          {/* Show discount if applied */}
          {hasDiscount && (
            <div className="flex justify-between">
              <span className="text-green-600 dark:text-green-400">
                Discount ({couponData?.discount_type === 'percentage' 
                  ? `${couponData.discount_amount}%` 
                  : couponData?.discount_type === 'full' 
                    ? '100%' 
                    : `$${couponData?.discount_amount}`})
              </span>
              <span className="text-green-600 dark:text-green-400">-${discountAmount}</span>
            </div>
          )}
          
          {/* Total */}
          <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 font-medium text-lg">
            <span className="text-gray-900 dark:text-white">Total</span>
            {isFreeRegistration ? (
              <span className="text-green-600 dark:text-green-400">FREE</span>
            ) : (
              <span className="text-gray-900 dark:text-white">${finalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSummary;
