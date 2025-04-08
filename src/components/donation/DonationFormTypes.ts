
import { z } from "zod";

// Define form schema for validation
export const donationFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  amount: z.number().min(1, "Amount must be at least $1"),
  message: z.string().optional(),
});

export type DonationFormValues = z.infer<typeof donationFormSchema>;
