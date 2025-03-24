
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { registrationSchema, RegistrationFormData } from "../RegistrationFormTypes";

export const useRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [emailValidated, setEmailValidated] = useState(false);

  // Initialize form with zod schema validation
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      ticketType: "",
      fullName: "",
      email: "",
      organization: "",
      role: "",
      specialRequests: "",
      groupEmails: [],
      groupSize: undefined,
    },
    mode: "onChange", // Enable real-time validation
  });

  const handleEmailValidation = async (result: { isValid: boolean; message?: string }) => {
    setEmailValidated(result.isValid);
    return result.isValid;
  };

  const handleInitialSubmit = async (data: RegistrationFormData) => {
    // If email hasn't been validated as valid yet, show a friendly message
    if (!emailValidated && data.ticketType !== "professional") {
      toast({
        title: "Email validation required",
        description: "Please make sure your email address is valid for the selected ticket type.",
        variant: "default",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Store the registration data for payment processing
      setRegistrationData(data);
      setShowPayment(true);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to reset the form and payment state
  // This is useful when a user navigates back from Stripe checkout
  const resetForm = () => {
    setShowPayment(false);
    setRegistrationData(null);
    form.reset({
      ticketType: "",
      fullName: "",
      email: "",
      organization: "",
      role: "",
      specialRequests: "",
      groupEmails: [],
      groupSize: undefined,
    });
    setEmailValidated(false);
  };

  return {
    form,
    isSubmitting,
    showPayment,
    registrationData,
    emailValidated,
    handleEmailValidation,
    handleInitialSubmit,
    setShowPayment,
    resetForm,
  };
};
