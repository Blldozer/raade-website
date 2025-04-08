import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Define form schema for validation
const donationFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  amount: z.number().min(1, "Amount must be at least $1"),
  message: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

// Predefined donation amounts
const DONATION_AMOUNTS = [25, 50, 100, 250, 500, 1000];

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
 * - Updated with $1000 donation option
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
      <div className="mb-6">
        <Label htmlFor="amount" className="block mb-2 font-medium">
          Select Amount
        </Label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {DONATION_AMOUNTS.map((amount) => (
            <Button
              key={amount}
              type="button"
              variant={selectedAmount === amount && !isCustomAmount ? "default" : "outline"}
              className={`${
                selectedAmount === amount && !isCustomAmount
                  ? "bg-[#274675] hover:bg-[#274675]/90 text-white"
                  : "border-[#274675] text-[#274675] hover:bg-[#274675]/10"
              }`}
              onClick={() => handleAmountSelect(amount)}
            >
              ${amount}
            </Button>
          ))}
        </div>
        <Button
          type="button"
          variant={isCustomAmount ? "default" : "outline"}
          className={`w-full mt-2 ${
            isCustomAmount
              ? "bg-[#274675] hover:bg-[#274675]/90 text-white"
              : "border-[#274675] text-[#274675] hover:bg-[#274675]/10"
          }`}
          onClick={handleCustomAmount}
        >
          Custom Amount
        </Button>
        
        {isCustomAmount && (
          <div className="mt-3">
            <Label htmlFor="custom-amount" className="sr-only">
              Custom Amount
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <Input
                id="custom-amount"
                type="number"
                min="1"
                step="any"
                className="pl-7 pr-12"
                placeholder="Enter amount"
                {...register("amount", { valueAsNumber: true })}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setSelectedAmount(value);
                  } else {
                    setSelectedAmount(null);
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">USD</span>
              </div>
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Personal information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="block mb-2 font-medium">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="block mb-2 font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message" className="block mb-2 font-medium">
            Message (Optional)
          </Label>
          <Input
            id="message"
            type="text"
            {...register("message")}
            placeholder="What inspired your donation?"
          />
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button
          type="submit"
          className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white shadow-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            <>Donate ${selectedAmount || 0}</>
          )}
        </Button>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Your donation is secure. You'll be redirected to Stripe to complete your payment.
        </p>
      </div>
    </form>
  );
};

export default DonationForm;
