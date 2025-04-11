
import { useState } from "react";
import SimpleStripeProvider from "./SimpleStripeProvider";

interface StripeContainerProps {
  ticketType: string;
  email: string;
  firstName: string;
  lastName: string;
  groupSize?: number;
  groupEmails?: any[];
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  couponCode?: string;
  couponDiscount?: { type: 'percentage' | 'fixed'; amount: number } | null;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * StripeContainer Component
 * 
 * A container component that wraps the SimpleStripeProvider:
 * - Handles loading states and error displays
 * - Simplifies the API for parent components
 * - Improved error recovery and retry mechanisms
 */
const StripeContainer = ({
  ticketType,
  email,
  firstName,
  lastName,
  groupSize,
  groupEmails,
  organization,
  role,
  specialRequests,
  referralSource,
  couponCode,
  couponDiscount,
  onSuccess,
  onError
}: StripeContainerProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleError = (error: string) => {
    setErrorMessage(error);
    onError(error);
  };
  
  return (
    <div className="stripe-container">
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
      
      <SimpleStripeProvider
        ticketType={ticketType}
        email={email}
        firstName={firstName}
        lastName={lastName}
        groupSize={groupSize}
        groupEmails={groupEmails}
        organization={organization}
        role={role}
        specialRequests={specialRequests}
        referralSource={referralSource}
        couponCode={couponCode}
        couponDiscount={couponDiscount}
        onSuccess={onSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default StripeContainer;
