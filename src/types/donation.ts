
export interface DonationFormData {
  amount: number;
  donorName?: string;
  donorEmail?: string;
  isAnonymous: boolean;
  donationType: DonationType;
  message?: string;
}

export type DonationType = 'general' | 'scholarship' | 'innovation-studios' | 'conference';

export interface DonationResponse {
  clientSecret: string;
  amount: number;
  paymentIntentId: string;
  donationId?: string;
}

export interface UpdateDonationStatusResponse {
  status: string;
  success: boolean;
}
