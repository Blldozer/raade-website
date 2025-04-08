
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { 
  registrationFormSchema, 
  RegistrationFormData, 
  TICKET_TYPES_ENUM 
} from "../RegistrationFormTypes";

export const useRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [emailValidated, setEmailValidated] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  // Initialize form with zod schema validation
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      ticketType: TICKET_TYPES_ENUM.STUDENT,
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

  // Watch ticket type for dependency tracking
  const watchTicketType = form.watch("ticketType");

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
    setSubmitAttempts(prev => prev + 1);
    
    try {
      console.log(`Form submitted (attempt ${submitAttempts + 1})`, data);
      
      // Store the registration data for payment processing
      setRegistrationData(data);
      setShowPayment(true);
      
      // Record form submission time for debugging
      const timestamp = new Date().toISOString();
      console.log(`Form submission successful at ${timestamp}`);
      
      // Force clear existing checkout session data
      if (sessionStorage.getItem("checkoutSessionId")) {
        console.log("Clearing existing checkout session before payment");
        sessionStorage.removeItem("checkoutSessionId");
        sessionStorage.removeItem("registrationEmail");
      }
      
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
      
      // Reset the form
      setShowPayment(false);
      setRegistrationData(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to reset the form and payment state
  // This is useful when a user navigates back from Stripe checkout
  const resetForm = () => {
    setShowPayment(false);
    setRegistrationData(null);
    setSubmitAttempts(0);
    form.reset({
      ticketType: TICKET_TYPES_ENUM.STUDENT,
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
    watchTicketType,
    submitAttempts,
    handleEmailValidation,
    handleInitialSubmit,
    setShowPayment,
    resetForm,
  };
};
