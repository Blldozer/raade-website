/**
 * TypeScript types for the registration form
 */

export interface RegistrationFormData {
  fullName: string;
  email: string;
  organization?: string;
  role?: string;
  ticketType: string;
  specialRequests?: string;
  referralSource?: string;
  groupSize: number;
  groupEmails?: Array<string | { value: string }>;
  couponCode?: string;
}

export interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<RegistrationFormData>;
}

export type ReferralSourceOption = {
  value: string;
  label: string;
};

export interface CouponResponse {
  valid: boolean;
  code?: string;
  message?: string;
  discount?: {
    type: 'percentage' | 'fixed' | 'full';
    amount: number;
  };
}

export interface RegistrationErrorState {
  hasError: boolean;
  message?: string;
}

export type TicketTypeOption = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
};
