
import { StripeError, PaymentIntent } from "@stripe/stripe-js";

export interface PaymentIntentResponse {
  clientSecret?: string;
  amount?: number;
  currency?: string;
  isGroupRegistration?: boolean;
  groupSize?: number;
  error?: string;
  details?: string;
  requestId?: string;
  freeTicket?: boolean;
}

export interface PaymentError {
  message: string;
  code?: string;
  type?: string;
}

export type PaymentIntentState = {
  clientSecret: string;
  isLoading: boolean;
  amount: number;
  currency: string;
  isGroupRegistration: boolean;
  errorDetails: string | null;
  requestId: string | null;
};

export interface PaymentMessageHandlers {
  handleSuccess: () => void;
  handleError: (error: StripeError | Error) => void;
  handlePaymentStatus: (status: string) => void;
}

export interface PaymentResult {
  paymentIntent?: PaymentIntent;
  error?: StripeError | Error;
}
