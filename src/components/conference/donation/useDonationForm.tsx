
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Define form schema with validation
const formSchema = z.object({
  amount: z.string().min(1, "Please select a donation amount"),
  customAmount: z.string().optional().refine(
    (val) => !val || parseFloat(val) >= 1, 
    { message: "Custom amount must be at least $1" }
  ),
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
  makeAnonymous: z.boolean().optional().default(false),
});

// Create type from schema and export it
export type DonationFormValues = z.infer<typeof formSchema>;

// Define the return values for submittedValues to ensure they're not optional
interface SubmittedValues {
  amount: string;
  customAmount?: string;
  fullName: string;
  email: string;
  message?: string;
  makeAnonymous?: boolean;
}

export const useDonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState("50");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<SubmittedValues | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Initialize form with react-hook-form
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "50",
      customAmount: "",
      fullName: "",
      email: "",
      message: "",
      makeAnonymous: false,
    },
  });
  
  // Handle amount selection to determine if custom amount field should be shown
  const handleAmountSelect = (value: string) => {
    setSelectedAmount(value);
    
    // If switching away from custom amount, clear the custom amount field
    if (value !== "custom") {
      form.setValue("customAmount", "");
    }
  };
  
  // Get formatted donation amount for display
  const getDonationAmount = () => {
    if (selectedAmount === "custom" && form.watch("customAmount")) {
      return `$${parseFloat(form.watch("customAmount")).toFixed(2)}`;
    }
    return `$${selectedAmount}`;
  };
  
  // Get numeric donation amount in cents for Stripe
  const getDonationAmountInCents = (): number => {
    if (selectedAmount === "custom" && form.watch("customAmount")) {
      return Math.round(parseFloat(form.watch("customAmount")) * 100);
    }
    return parseInt(selectedAmount) * 100;
  };
  
  // Form submission handler
  const onSubmit = async (values: DonationFormValues) => {
    setIsSubmitting(true);
    setPaymentError(null);
    
    try {
      // Calculate donation amount in cents for Stripe
      const amountInCents = getDonationAmountInCents();
      
      if (isNaN(amountInCents) || amountInCents < 100) {
        throw new Error("Invalid donation amount. Minimum donation is $1.");
      }
      
      // Call our Supabase edge function to create a payment intent
      const { data, error } = await supabase.functions.invoke('process-donation', {
        body: {
          amount: amountInCents,
          email: values.email,
          fullName: values.fullName,
          makeAnonymous: values.makeAnonymous,
          message: values.message || "",
        }
      });
      
      if (error) {
        console.error("Donation processing error:", error);
        throw new Error(error.message || "Failed to process donation");
      }
      
      if (!data || !data.clientSecret) {
        throw new Error("No payment details returned from server");
      }
      
      // Here you would normally redirect to Stripe for payment completion,
      // but for this demo we'll just simulate success
      
      // Store submitted values for confirmation page
      setSubmittedValues({
        amount: values.amount,
        customAmount: values.customAmount,
        fullName: values.fullName,
        email: values.email,
        message: values.message,
        makeAnonymous: values.makeAnonymous
      });
      
      // Show the confirmation page
      setShowConfirmation(true);
      
      // Show success toast
      toast({
        title: "Donation Successful",
        description: `Thank you for your donation of ${getDonationAmount()}!`,
        variant: "default",
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setPaymentError(errorMessage);
      console.error("Donation error:", error);
      
      // Show error toast
      toast({
        title: "Donation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset form to donate again
  const handleDonateAgain = () => {
    form.reset();
    setSelectedAmount("50");
    setShowConfirmation(false);
    setSubmittedValues(null);
    setPaymentError(null);
  };
  
  return {
    form,
    isSubmitting,
    showConfirmation,
    selectedAmount,
    submittedValues,
    paymentError,
    onSubmit,
    handleAmountSelect,
    getDonationAmount,
    handleDonateAgain,
    amounts: ["25", "50", "100", "250", "500", "1000"]
  };
};
