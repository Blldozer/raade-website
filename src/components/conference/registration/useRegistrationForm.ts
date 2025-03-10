
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { registrationSchema, RegistrationFormData } from "../RegistrationFormTypes";

export const useRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [emailValidationResult, setEmailValidationResult] = useState<{ isValid: boolean; message?: string } | null>(null);
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      ticketType: "",
      specialRequests: "",
      groupEmails: [],
    },
  });

  const handleInitialSubmit = async (data: RegistrationFormData) => {
    if (!emailValidationResult?.isValid) {
      toast({
        title: "Email validation error",
        description: emailValidationResult?.message || "Please provide a valid email for the selected ticket type.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
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
    emailValidationResult,
    setEmailValidationResult,
    handleInitialSubmit,
    setShowPayment,
  };
};
