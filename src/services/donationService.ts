
import { supabase } from "@/integrations/supabase/client";
import { DonationFormData, DonationResponse, UpdateDonationStatusResponse } from "@/types/donation";

/**
 * Create a donation payment intent
 * 
 * Calls the Supabase Edge Function to create a Stripe payment intent
 * for a donation and store the donation record in the database
 */
export const createDonationPayment = async (
  donationData: DonationFormData
): Promise<DonationResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke<DonationResponse>(
      "create-donation-payment",
      {
        body: donationData,
      }
    );

    if (error) {
      console.error("Error creating donation payment:", error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("No data returned from payment service");
    }

    return data;
  } catch (error) {
    console.error("Failed to create donation payment:", error);
    throw error;
  }
};

/**
 * Update donation status
 * 
 * Calls the Supabase Edge Function to check payment status with Stripe
 * and update the donation record in the database
 */
export const updateDonationStatus = async (
  paymentIntentId: string
): Promise<UpdateDonationStatusResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke<UpdateDonationStatusResponse>(
      "update-donation-status",
      {
        body: { paymentIntentId },
      }
    );

    if (error) {
      console.error("Error updating donation status:", error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("No data returned from status update service");
    }

    return data;
  } catch (error) {
    console.error("Failed to update donation status:", error);
    throw error;
  }
};
