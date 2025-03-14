
import React from "react";

interface PaymentStatusProps {
  message: string | null;
}

/**
 * PaymentStatus Component
 * 
 * Displays payment status messages:
 * - Shows errors during payment processing
 * - Provides feedback about payment status
 * - Only renders when there's a message to display
 * 
 * @param message - The status message to display
 */
const PaymentStatus: React.FC<PaymentStatusProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="text-center mt-4 text-red-500">{message}</div>
  );
};

export default PaymentStatus;
