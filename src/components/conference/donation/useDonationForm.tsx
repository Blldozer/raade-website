
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createClient } from "@supabase/supabase-js";

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
 * - Stripe payment processing
 * - Form submission and error handling
 * - Confirmation state management
 */
export const useDonationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("25");
  const [submittedValues, setSubmittedValues] = useState<DonationFormValues | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  
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
  
  // Create Supabase client for edge function calls
  const supabase = createClient(
    "https://dermbucktbegnbkjzobs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcm1idWNrdGJlZ25ia2p6b2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5MjI5OTYsImV4cCI6MjAxMTQ5ODk5Nn0.QxlM0zc1SkJlnZzbI9-i9U0fYW0KAGRkBNF0OiGEEes"
  );
  
  // Calculate the actual donation amount based on form values
  const calculateDonationAmount = (): number => {
    const amount = form.watch("amount");
    const customAmount = form.watch("customAmount");
    
    if (amount === "custom" && customAmount) {
      return parseFloat(customAmount) * 100; // Convert to cents for Stripe
    }
    
    return parseInt(amount) * 100; // Convert to cents for Stripe
  };
  
  // Handle form submission
  const onSubmit = async (data: DonationFormValues) => {
    if (!stripe || !elements) {
      setPaymentError("Stripe has not initialized. Please refresh the page and try again.");
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setPaymentError("Card element not found. Please refresh the page and try again.");
      return;
    }
    
    setIsSubmitting(true);
    setPaymentError(null);
    
    try {
      // Step 1: Create a payment intent on the server
      const { data: paymentIntent, error: intentError } = await supabase.functions.invoke('process-donation', {
        body: {
          amount: calculateDonationAmount(),
          email: data.email,
          fullName: data.fullName,
          makeAnonymous: data.makeAnonymous || false,
          message: data.message || "",
        }
      });
      
      if (intentError || !paymentIntent || !paymentIntent.clientSecret) {
        throw new Error(intentError?.message || "Could not create payment intent");
      }
      
      // Step 2: Confirm the payment with Stripe.js
      const { error: stripeError } = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: data.fullName,
            email: data.email,
          },
        },
      });
      
      if (stripeError) {
        throw new Error(stripeError.message || "Payment failed");
      }
      
      // Step 3: Payment successful, update UI
      // Store the submitted values for the confirmation screen
      setSubmittedValues({
        amount: data.amount,
        fullName: data.fullName,
        email: data.email,
        customAmount: data.customAmount || "",
        message: data.message || "",
        makeAnonymous: data.makeAnonymous || false,
      });
      
      // Show success state
      setShowConfirmation(true);
      toast({
        title: "Donation Successful",
        description: "Thank you for your generous support!",
        variant: "default",
      });
      
    } catch (error) {
      console.error("Donation error:", error);
      setPaymentError(error instanceof Error ? error.message : "An unexpected error occurred");
      
      toast({
        title: "Donation failed",
        description: error instanceof Error ? error.message : "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
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
    setPaymentError(null);
  };
  
  return {
    form,
    isSubmitting,
    showConfirmation,
    selectedAmount,
    submittedValues,
    paymentError,
    onSubmit: form.handleSubmit(onSubmit),
    handleAmountSelect,
    getDonationAmount,
    handleDonateAgain,
  };
};
