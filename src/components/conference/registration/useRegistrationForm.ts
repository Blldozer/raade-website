
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { registrationSchema, RegistrationFormData } from "../RegistrationFormTypes";

export const useRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const { toast } = useToast();

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
    if (!result.isValid) {
      toast({
        title: "Email validation error",
        description: result.message || "Please provide a valid email for the selected ticket type.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleInitialSubmit = async (data: RegistrationFormData) => {
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

  return {
    form,
    isSubmitting,
    showPayment,
    registrationData,
    handleEmailValidation,
    handleInitialSubmit,
    setShowPayment,
  };
};
