
/**
 * Payment types
 * 
 * This file defines shared TypeScript types for payment-related operations:
 * - Supabase API responses for payment intents
 * - Stripe error and payment result types
 * - Payment status and state types
 */

import { PaymentIntent, StripeError } from "@stripe/stripe-js";

/**
 * Payment intent API response from Supabase Edge Function
 */
export interface PaymentIntentResponse {
  clientSecret?: string;
  amount?: number;
  currency?: string;
  isGroupRegistration?: boolean;
  error?: string;
  details?: string;
  freeTicket?: boolean;
  requestId?: string;
}

/**
 * Extended payment error with request tracking
 */
export interface PaymentError extends Error {
  type?: string;
  code?: string;
  requestId?: string | null;
}

/**
 * Payment result from Stripe operations
 */
export interface PaymentResult {
  success: boolean;
  reason?: string;
  paymentIntent?: PaymentIntent;
  error?: StripeError | Error;
}

/**
 * Message handler functions for payment results
 */
export interface PaymentMessageHandlers {
  handleSuccess: () => void;
  handleError: (error: StripeError | Error) => void;
  handlePaymentStatus: (status: string) => void;
}

/**
 * Payment intent state interface
 */
export interface PaymentIntentState {
  clientSecret: string;
  isLoading: boolean;
  amount: number;
  currency: string;
  isGroupRegistration: boolean;
  errorDetails: string | null;
  requestId: string | null;
  retryCount: number;
}
