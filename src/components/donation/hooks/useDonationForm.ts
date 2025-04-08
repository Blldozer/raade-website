
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { donationFormSchema, DonationFormValues } from "../DonationFormTypes";

/**
 * useDonationForm - Custom hook for donation form state and logic
 * 
 * This hook encapsulates:
 * - Form validation and submission logic
 * - Custom amount state management
 * - Error handling and toast notifications
 * - Stripe checkout redirection
 * 
 * @param initialAmount - Optional initial donation amount
 * @returns Form controls, state, and submission handler
 */
export const useDonationForm = (initialAmount: number | null = null) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(initialAmount);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: selectedAmount || undefined,
    },
  });

  // Form submission handler that processes donation via Stripe
  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);

    try {
      // Call the Edge Function to create a Stripe checkout session
      const { data: sessionData, error } = await supabase.functions.invoke("create-donation-session", {
        body: {
          amount: data.amount,
          fullName: data.fullName,
          email: data.email,
          message: data.message || "",
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!sessionData?.url) {
        throw new Error("Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      window.location.href = sessionData.url;
    } catch (error) {
      console.error("Donation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to handle amount selection
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setValue("amount", amount);
    setIsCustomAmount(false);
  };

  // Helper function to toggle custom amount input
  const handleCustomAmount = () => {
    setIsCustomAmount(true);
    setValue("amount", undefined);
    setSelectedAmount(null);
  };

  return {
    // Form state
    selectedAmount,
    setSelectedAmount,
    isCustomAmount,
    setIsCustomAmount,
    isSubmitting,
    
    // Form controls
    register,
    handleSubmit,
    setValue,
    errors,
    
    // Form submission
    onSubmit,
    
    // Helper functions
    handleAmountSelect,
    handleCustomAmount,
  };
};
