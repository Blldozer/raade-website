
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
    },
    mode: "onChange", // Validate on change for more responsive feedback
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
      const amount = parseFloat(form.watch("customAmount"));
      return isNaN(amount) ? "$0.00" : `$${amount.toFixed(2)}`;
    }
    return `$${selectedAmount}`;
  };
  
  // Form submission handler
  const onSubmit = async (values: DonationFormValues) => {
    setIsSubmitting(true);
    setPaymentError(null);
    
    try {
      // Simulate payment processing with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would integrate with actual payment processing
      // For now, we'll just simulate success
      
      // Ensure all required fields are set when updating submittedValues
      setSubmittedValues({
        amount: values.amount,
        customAmount: values.customAmount,
        fullName: values.fullName,
        email: values.email,
        message: values.message,
      });
      
      setShowConfirmation(true);
      console.log("Donation submitted successfully:", values);
    } catch (error) {
      setPaymentError("There was an error processing your donation. Please try again.");
      console.error("Donation error:", error);
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
    handleDonateAgain
  };
};
