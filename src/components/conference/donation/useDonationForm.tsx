import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [showCardPayment, setShowCardPayment] = useState(false);
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
  
  // Get numeric donation amount value
  const getDonationAmountValue = (): number => {
    if (selectedAmount === "custom" && form.watch("customAmount")) {
      return parseFloat(form.watch("customAmount"));
    }
    return parseInt(selectedAmount);
  };
  
  // Initial form submission handler - validates form and shows card payment
  const onSubmit = async (values: DonationFormValues) => {
    console.log("Form submitted with values:", values);
    setPaymentError(null);
    setIsSubmitting(true);
    
    try {
      // Calculate donation amount
      const amountValue = selectedAmount === "custom" && values.customAmount 
        ? parseFloat(values.customAmount) 
        : parseInt(selectedAmount);
      
      if (isNaN(amountValue) || amountValue < 1) {
        throw new Error("Invalid donation amount. Minimum donation is $1.");
      }
      
      // Store submitted values for the payment form
      setSubmittedValues({
        amount: values.amount,
        customAmount: values.customAmount,
        fullName: values.fullName,
        email: values.email,
        message: values.message,
        makeAnonymous: values.makeAnonymous
      });
      
      console.log("Moving to payment step with amount:", amountValue);
      
      // Show the payment form
      setShowCardPayment(true);
      
      // Show success toast for form submission
      toast({
        title: "Information Submitted",
        description: "Please complete your donation by providing payment details.",
        variant: "default",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setPaymentError(errorMessage);
      console.error("Donation form error:", error);
      
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
  
  // Handle payment success - Records donation in Supabase after payment is processed
  const handlePaymentSuccess = async () => {
    setIsSubmitting(true);
    
    try {
      if (!submittedValues) {
        throw new Error("No donation information found");
      }
      
      // Calculate donation amount
      const amount = submittedValues.amount === "custom" && submittedValues.customAmount
        ? parseFloat(submittedValues.customAmount)
        : parseFloat(submittedValues.amount);
      
      // Store donation in Supabase
      const { error } = await supabase.from('donations').insert({
        donor_name: submittedValues.makeAnonymous ? null : submittedValues.fullName,
        donor_email: submittedValues.email,
        amount,
        message: submittedValues.message || null,
        is_anonymous: submittedValues.makeAnonymous || false,
        payment_status: 'succeeded',
        donation_type: 'conference-support'
      });
      
      if (error) {
        console.error("Error storing donation:", error);
        throw new Error("Failed to record your donation. Please try again.");
      }
      
      // Show success confirmation
      setShowConfirmation(true);
      setShowCardPayment(false);
      
      // Show success toast
      toast({
        title: "Donation Successful",
        description: `Thank you for your donation of ${getDonationAmount()}!`,
        variant: "default",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setPaymentError(errorMessage);
      
      // Show error toast
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle payment error
  const handlePaymentError = (errorMessage: string) => {
    setPaymentError(errorMessage);
    
    // Show error toast
    toast({
      title: "Payment Failed",
      description: errorMessage,
      variant: "destructive",
    });
  };
  
  // Reset form to donate again
  const handleDonateAgain = () => {
    form.reset();
    setSelectedAmount("50");
    setShowConfirmation(false);
    setShowCardPayment(false);
    setSubmittedValues(null);
    setPaymentError(null);
  };
  
  // Go back to form from payment screen
  const handleBackToForm = () => {
    setShowCardPayment(false);
    setPaymentError(null);
  };
  
  return {
    form,
    isSubmitting,
    showConfirmation,
    showCardPayment,
    selectedAmount,
    submittedValues,
    paymentError,
    onSubmit,
    handleAmountSelect,
    getDonationAmount,
    getDonationAmountValue,
    handleDonateAgain,
    handlePaymentSuccess,
    handlePaymentError,
    handleBackToForm,
    amounts: ["25", "50", "100", "250", "500", "1000"]
  };
};
