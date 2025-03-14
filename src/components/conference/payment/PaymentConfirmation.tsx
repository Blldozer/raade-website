
import React from "react";
import { CreditCard } from "lucide-react";
import { RegistrationFormData } from "../RegistrationFormTypes";
import SubmissionConfirmation from "@/components/forms/SubmissionConfirmation";

interface PaymentConfirmationProps {
  registrationData: RegistrationFormData;
  sendingEmail: boolean;
  onSuccess: () => void;
}

/**
 * PaymentConfirmation Component
 * 
 * Displays payment success information:
 * - Shows registration and payment details
 * - Informs user about confirmation email status
 * - Provides continuation button with proper action
 * 
 * @param registrationData - Customer registration data
 * @param sendingEmail - Whether confirmation email is being sent
 * @param onSuccess - Callback function for continuation
 */
const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  registrationData,
  sendingEmail,
  onSuccess
}) => {
  // Generate payment confirmation display
  const paymentConfirmation = (
    <div className="text-white/80 font-lora text-left p-4 bg-[#1a1a1a] rounded-md mb-4">
      <h3 className="text-[#FBB03B] mb-2 font-simula">Payment Details:</h3>
      <p><span className="text-[#FBB03B]/80">Name:</span> {registrationData.fullName}</p>
      <p><span className="text-[#FBB03B]/80">Email:</span> {registrationData.email}</p>
      <p><span className="text-[#FBB03B]/80">Ticket Type:</span> {registrationData.ticketType}</p>
      {registrationData.ticketType === "student-group" && registrationData.groupSize && (
        <>
          <p><span className="text-[#FBB03B]/80">Group Size:</span> {registrationData.groupSize} people</p>
          <p><span className="text-[#FBB03B]/80">Total Cost:</span> ${30 * registrationData.groupSize} (${30} per person)</p>
        </>
      )}
      {sendingEmail && <p className="text-green-400 mt-2">Sending confirmation email...</p>}
    </div>
  );
  
  return (
    <SubmissionConfirmation
      title="Payment Successful!"
      message="Thank you for registering for the RAADE Conference 2025. Your payment has been received and a confirmation email has been sent."
      customMessage={paymentConfirmation}
      buttonText="Continue"
      icon={<CreditCard className="h-16 w-16 text-green-500" />}
      buttonAction={onSuccess}
    />
  );
};

export default PaymentConfirmation;
