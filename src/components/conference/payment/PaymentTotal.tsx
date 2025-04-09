
import React from "react";
import { Card } from "@/components/ui/card";

interface PaymentTotalProps {
  amount: number;
  currency: string;
  isGroupRegistration?: boolean;
  groupSize?: number;
  saleActive?: boolean;
}

/**
 * PaymentTotal Component
 * 
 * Displays payment pricing information with:
 * - Per-person cost for group registrations
 * - Group size information when applicable
 * - Total cost calculation with clear visual emphasis
 * - Formatted currency display
 * - Sale status indicator when applicable
 * 
 * @param amount - Per-person payment amount
 * @param currency - Payment currency code
 * @param isGroupRegistration - Whether this is a group registration
 * @param groupSize - Number of people in the group
 * @param saleActive - Whether the sale period is active
 */
const PaymentTotal: React.FC<PaymentTotalProps> = ({ 
  amount, 
  currency,
  isGroupRegistration,
  groupSize,
  saleActive
}) => {
  // Calculate the total amount for group registrations
  const totalAmount = isGroupRegistration && groupSize ? amount * groupSize : amount;
  
  // Format amount properly for display
  const displayAmount = isGroupRegistration && groupSize
    ? `${amount.toFixed(2)} ${currency} per person (${groupSize} people)`
    : `${amount.toFixed(2)} ${currency}`;

  return (
    <div className="text-center mb-4">
      <h3 className="text-lg font-medium">Payment Details</h3>
      {saleActive && (
        <div className="text-xs text-red-500 font-semibold mb-1">SALE PRICING APPLIED!</div>
      )}
      <p className="text-gray-500 text-sm">
        {isGroupRegistration && groupSize ? 
          <>Price: {displayAmount}</> : 
          <>Total: {displayAmount}</>
        }
      </p>
      {isGroupRegistration && groupSize && (
        <>
          <p className="text-gray-500 text-sm mt-1">
            Group registration for {groupSize} people
          </p>
          <p className="text-blue-700 font-medium text-sm mt-1">
            Total: ${totalAmount.toFixed(2)} {currency}
          </p>
        </>
      )}
    </div>
  );
};

export default PaymentTotal;
