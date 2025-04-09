
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { RegistrationFormData, calculateTotalPrice } from "./RegistrationFormTypes";
import { formatCurrency } from "@/lib/utils";

interface RegistrationSummaryProps {
  registrationData: RegistrationFormData;
  couponDiscount?: { type: 'percentage' | 'fixed'; amount: number } | null;
  totalPrice?: number;
}

/**
 * RegistrationSummary Component
 * 
 * Displays a summary of the registration information:
 * - Shows ticket type, name, email, and other registration details
 * - Displays original price and discount when a coupon is applied
 * - Calculates and shows per-person pricing for group registrations
 * 
 * @param registrationData Registration form data
 * @param couponDiscount Applied coupon discount information
 * @param totalPrice Total price after discounts
 */
const RegistrationSummary = ({ 
  registrationData, 
  couponDiscount,
  totalPrice 
}: RegistrationSummaryProps) => {
  const { ticketType, fullName, email, organization, groupSize } = registrationData;
  
  // Calculate the original price before discounts
  const originalPrice = calculateTotalPrice(
    ticketType, 
    ticketType === "student-group" ? groupSize : undefined
  );

  // Get the total price (with discount if available)
  const finalPrice = totalPrice !== undefined ? totalPrice : originalPrice;
  
  // Determine the discount percentage for display
  const discountPercentage = couponDiscount && couponDiscount.type === 'percentage' 
    ? couponDiscount.amount 
    : couponDiscount && originalPrice > 0 
      ? Math.round((couponDiscount.amount / originalPrice) * 100) 
      : 0;

  return (
    <Card className="bg-gray-50 dark:bg-gray-800 border-[#FBB03B]/20">
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-4 font-simula text-[#274675] dark:text-[#FBB03B]">
          Registration Summary
        </CardTitle>
        
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <div className="flex justify-between">
            <span className="font-medium">Ticket Type:</span>
            <span className="capitalize">{ticketType.replace('-', ' ')}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{fullName}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span className="break-all">{email}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Organization:</span>
            <span>{organization}</span>
          </div>
          
          {ticketType === "student-group" && groupSize && (
            <div className="flex justify-between">
              <span className="font-medium">Group Size:</span>
              <span>{groupSize} people</span>
            </div>
          )}
          
          {/* Price breakdown with discount */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
            {couponDiscount && originalPrice !== finalPrice ? (
              <>
                <div className="flex justify-between">
                  <span className="font-medium">Original Price:</span>
                  <span className="line-through">{formatCurrency(originalPrice)}</span>
                </div>
                
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span className="font-medium">Discount:</span>
                  <span>{discountPercentage}% off ({formatCurrency(originalPrice - finalPrice)})</span>
                </div>
                
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(finalPrice)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(finalPrice)}</span>
              </div>
            )}
            
            {ticketType === "student-group" && groupSize && (
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>Per Person:</span>
                <span>{formatCurrency(finalPrice / groupSize)}</span>
              </div>
            )}
          </div>
          
          {registrationData.couponCode && (
            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
              Coupon code applied: {registrationData.couponCode}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationSummary;
