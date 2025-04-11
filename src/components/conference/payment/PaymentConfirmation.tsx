
import React from "react";
import { CreditCard } from "lucide-react";
import { RegistrationFormData, getFullName } from "../RegistrationFormTypes";
import SubmissionConfirmation from "@/components/forms/SubmissionConfirmation";

interface PaymentConfirmationProps {
  registrationData: RegistrationFormData;
  sendingEmail: boolean;
  onSuccess: () => void;
}

/**
 * PaymentConfirmation Component
 * 
 * A stabilized payment confirmation screen that:
 * - Uses memo to prevent unnecessary re-renders
 * - Maintains visual stability during email sending state changes
 * - Leverages the improved SubmissionConfirmation component
 * - Formats payment details consistently
 */
const PaymentConfirmation: React.FC<PaymentConfirmationProps> = React.memo(({
  registrationData,
  sendingEmail,
  onSuccess
}) => {
  // Pre-compute payment details to avoid calculation during rendering
  const paymentDetails = React.useMemo(() => {
    const ticketTypeFormatted = registrationData.ticketType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const isGroupRegistration = registrationData.ticketType === "student-group";
    const groupSize = registrationData.groupSize || 0;
    const totalCost = isGroupRegistration ? 30 * groupSize : 0;
    
    // Get full name from first and last name
    const fullName = getFullName(registrationData.firstName, registrationData.lastName);

    return {
      ticketTypeFormatted,
      isGroupRegistration,
      groupSize,
      totalCost,
      fullName
    };
  }, [registrationData.ticketType, registrationData.groupSize, registrationData.firstName, registrationData.lastName]);
  
  // Generate payment confirmation display with stable rendering
  const paymentConfirmation = (
    <div className="text-white/80 font-lora text-left p-4 bg-[#1a1a1a] rounded-md mb-4">
      <h3 className="text-[#FBB03B] mb-2 font-simula">Payment Details:</h3>
      <p><span className="text-[#FBB03B]/80">Name:</span> {paymentDetails.fullName}</p>
      <p><span className="text-[#FBB03B]/80">Email:</span> {registrationData.email}</p>
      <p><span className="text-[#FBB03B]/80">Ticket Type:</span> {paymentDetails.ticketTypeFormatted}</p>
      
      {paymentDetails.isGroupRegistration && (
        <>
          <p><span className="text-[#FBB03B]/80">Group Size:</span> {paymentDetails.groupSize} people</p>
          <p><span className="text-[#FBB03B]/80">Total Cost:</span> ${paymentDetails.totalCost} (${30} per person)</p>
        </>
      )}
      
      {/* The email status is always shown but changes its text */}
      <p className="mt-2 text-green-400">
        {sendingEmail ? "Sending confirmation email..." : "Confirmation email will be sent shortly"}
      </p>
    </div>
  );
  
  return (
    <SubmissionConfirmation
      title="Payment Successful!"
      message="Thank you for registering for the RAADE Conference 2025. Your payment has been received."
      customMessage={paymentConfirmation}
      buttonText="Continue"
      icon={<CreditCard className="h-16 w-16 text-green-500" />}
      buttonAction={onSuccess}
    />
  );
});

// Add display name for better debugging
PaymentConfirmation.displayName = "PaymentConfirmation";

export default PaymentConfirmation;
