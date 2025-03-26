
import { useEffect } from "react";
import StripeCheckoutButton from "./StripeCheckoutButton";
import { useCheckoutState } from "./useCheckoutState";
import { useCheckoutSubmission } from "./useCheckoutSubmission";

interface StripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: Array<string | { value: string } | null>;
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * StripeCheckout Component - Refactored Stripe Checkout Implementation
 * 
 * Creates a checkout session using Supabase Edge Function and redirects
 * to Stripe's hosted checkout page.
 * 
 * Enhanced with:
 * - Improved session isolation with unique request IDs
 * - Automatic session cleanup on navigation events
 * - Better error recovery and retry mechanism
 * - Conflict detection and resolution
 * - Event tracking for analytics
 */
const StripeCheckout = ({
  ticketType,
  email,
  fullName,
  groupSize,
  groupEmails = [],
  organization,
  role,
  specialRequests,
  referralSource,
  onSuccess,
  onError
}: StripeCheckoutProps) => {
  // Use custom hooks to manage checkout state and submission
  const {
    isLoading,
    setIsLoading,
    retryCount,
    setRetryCount,
    requestId,
    abortControllerRef,
    resetCheckoutState
  } = useCheckoutState();

  const { submitCheckout } = useCheckoutSubmission({
    retryCount,
    setRetryCount,
    requestId,
    setIsLoading,
    abortControllerRef,
    onSuccess,
    onError
  });

  // Handle checkout button click
  const handleCheckout = async () => {
    resetCheckoutState();
    
    await submitCheckout(
      ticketType,
      email,
      fullName,
      groupSize,
      groupEmails,
      organization,
      role,
      specialRequests,
      referralSource
    );
  };

  return (
    <StripeCheckoutButton
      isLoading={isLoading}
      onCheckout={handleCheckout}
    />
  );
};

export default StripeCheckout;
