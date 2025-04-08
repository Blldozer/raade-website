
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { donationFormSchema, DonationFormValues } from "./DonationFormTypes";
import AmountSelection from "./AmountSelection";
import DonorInformation from "./DonorInformation";
import DonationButton from "./DonationButton";

interface DonationFormProps {
  selectedAmount: number | null;
  setSelectedAmount: (amount: number | null) => void;
}

/**
 * DonationForm Component
 * 
 * A form for collecting donation information:
 * - Allows selection of predefined amounts or custom amount
 * - Collects donor information
 * - Handles form validation and submission
 * - Processes payment via Stripe
 * 
 * @param selectedAmount - Currently selected donation amount
 * @param setSelectedAmount - Function to update the selected amount
 */
const DonationForm = ({ selectedAmount, setSelectedAmount }: DonationFormProps) => {
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  // Handle form submission
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-2xl font-simula mb-4 text-gray-900">Make a Donation</h3>

      {/* Donation amount selection */}
      <AmountSelection
        selectedAmount={selectedAmount}
        setSelectedAmount={setSelectedAmount}
        isCustomAmount={isCustomAmount}
        setIsCustomAmount={setIsCustomAmount}
        register={register}
        setValue={setValue}
        errors={errors}
      />

      {/* Personal information */}
      <DonorInformation register={register} errors={errors} />

      {/* Submit button */}
      <DonationButton isSubmitting={isSubmitting} selectedAmount={selectedAmount} />
    </form>
  );
};

export default DonationForm;
