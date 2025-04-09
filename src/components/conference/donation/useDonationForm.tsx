
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

/**
 * DonationForm schema with validation
 */
export const donationFormSchema = z.object({
  amount: z.string().min(1, "Please select or enter an amount"),
  customAmount: z.string().optional(),
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
  makeAnonymous: z.boolean().optional(),
});

export type DonationFormValues = z.infer<typeof donationFormSchema>;

/**
 * Custom hook to manage donation form state and submission logic
 * 
 * Handles:
 * - Form validation with zod
 * - Amount selection state
 * - Form submission and error handling
 * - Confirmation state management
 */
export const useDonationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("25");
  const [submittedValues, setSubmittedValues] = useState<DonationFormValues | null>(null);
  
  // Initialize form with zod schema validation and proper default values
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: "25", // This ensures amount is not optional but has a default value
      customAmount: "",
      fullName: "",
      email: "",
      message: "",
      makeAnonymous: false,
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to process the donation
      // For now, we'll simulate a successful donation
      
      console.log("Donation submitted:", data);
      
      // Store the submitted values for the confirmation screen
      // Ensure all required fields are explicitly set to satisfy TypeScript
      setSubmittedValues({
        amount: data.amount,
        fullName: data.fullName,
        email: data.email,
        customAmount: data.customAmount,
        message: data.message,
        makeAnonymous: data.makeAnonymous,
      });
      
      // Show success state after a short delay to simulate processing
      setTimeout(() => {
        setShowConfirmation(true);
        setIsSubmitting(false);
      }, 1500);
      
    } catch (error) {
      console.error("Donation error:", error);
      toast({
        title: "Donation failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  // Handle amount selection
  const handleAmountSelect = (value: string) => {
    setSelectedAmount(value);
    form.setValue("amount", value);
    
    // If selecting a preset amount, clear any custom amount
    if (value !== "custom") {
      form.setValue("customAmount", "");
    }
  };
  
  // Calculate the final donation amount for display
  const getDonationAmount = () => {
    const amount = form.watch("amount");
    const customAmount = form.watch("customAmount");
    
    if (amount === "custom" && customAmount) {
      return `$${parseFloat(customAmount).toFixed(2)}`;
    }
    
    return `$${amount}`;
  };
  
  // Reset form and confirmation state
  const handleDonateAgain = () => {
    form.reset({
      amount: "25",
      customAmount: "",
      fullName: "",
      email: "",
      message: "",
      makeAnonymous: false,
    });
    setShowConfirmation(false);
    setSelectedAmount("25");
  };
  
  return {
    form,
    isSubmitting,
    showConfirmation,
    selectedAmount,
    submittedValues,
    onSubmit: form.handleSubmit(onSubmit),
    handleAmountSelect,
    getDonationAmount,
    handleDonateAgain,
  };
};
