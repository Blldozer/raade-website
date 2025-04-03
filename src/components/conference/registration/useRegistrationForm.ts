
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { registrationFormSchema, RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";

/**
 * Custom hook to manage the registration form state and logic
 * Improved with better validation handling and timeout recovery
 */
export const useRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [emailValidated, setEmailValidated] = useState(false);
  
  // Track validation timeout to allow manual override
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleEmailValidation = (result: { isValid: boolean; message?: string }) => {
    // Clear any pending timeouts
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
      validationTimeoutRef.current = null;
    }

    setEmailValidated(result.isValid);
    return result.isValid;
  };

  const handleInitialSubmit = async (data: RegistrationFormData) => {
    // For professional tickets, skip email validation
    const skipValidation = data.ticketType === TICKET_TYPES_ENUM.PROFESSIONAL;
    
    // If email hasn't been validated as valid yet and we're not skipping validation
    if (!skipValidation && !emailValidated) {
      // Set a timeout to allow manual override after 5 seconds
      // This fixes stuck validation by allowing user to proceed regardless
      validationTimeoutRef.current = setTimeout(() => {
        setEmailValidated(true);
        toast({
          title: "Email validation timeout",
          description: "We couldn't validate your email domain but you can proceed. Please ensure you've provided the correct email.",
          variant: "default",
        });
      }, 5000);
      
      toast({
        title: "Email validation required",
        description: "Please wait while we validate your email address for the selected ticket type.",
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
    
    // Clear any pending timeouts
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
      validationTimeoutRef.current = null;
    }
  };

  return {
    form,
    isSubmitting,
    showPayment,
    registrationData,
    emailValidated,
    watchTicketType,
    handleEmailValidation,
    handleInitialSubmit,
    setShowPayment,
    resetForm,
  };
};
