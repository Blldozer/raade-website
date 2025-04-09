
import React from 'react';
import { RegistrationFormData } from '../../RegistrationFormTypes';
import SimpleStripeCheckout from './SimpleStripeCheckout';
import StripeCheckoutButton from '../checkout/StripeCheckoutButton';

interface SimpleStripeProviderProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: string[];
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
 * SimpleStripeProvider Component
 * 
 * Acts as a container for the direct Stripe payment flow:
 * - Handles passing registration data to payment components
 * - Manages the connection between registration and payment
 * - Provides success and error callbacks to payment system
 */
const SimpleStripeProvider: React.FC<SimpleStripeProviderProps> = ({
  ticketType,
  email,
  fullName,
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
}) => {
  return (
    <SimpleStripeCheckout
      ticketType={ticketType}
      email={email}
      fullName={fullName}
      groupSize={groupSize}
      groupEmails={groupEmails}
      organization={organization}
      role={role}
      specialRequests={specialRequests}
      referralSource={referralSource}
      couponCode={couponCode}
      couponDiscount={couponDiscount}
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

export default SimpleStripeProvider;
