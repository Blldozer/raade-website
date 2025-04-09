
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { registrationFormSchema, RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const useRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [emailValidated, setEmailValidated] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<{ type: 'percentage' | 'fixed'; amount: number } | null>(null);
  const [isFullDiscount, setIsFullDiscount] = useState(false);
  const navigate = useNavigate();

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
      couponCode: "",
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
    try {
      // If this is a coupon code submission, add the coupon code to the registration data
      if (couponCode) {
        data.couponCode = couponCode;
      }
      
      // Store the registration data for payment processing or direct submission
      setRegistrationData(data);
      
      // For any discount coupon (partial or full), we show the payment section with summary
      if (couponCode) {
        if (isFullDiscount) {
          // For 100% discount, we still show the summary, but skip the actual payment
          setShowPayment(true);
        } else {
          // For partial discounts, show payment section with discounted price
          setShowPayment(true);
        }
      } else {
        // Regular flow without coupon
        setShowPayment(true);
      }
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

  // Direct registration function for 100% off coupons
  const handleDirectRegistration = async (data: RegistrationFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Processing free registration with coupon code:", couponCode);
      
      // Process group emails consistently
      let processedGroupEmails = [];
      if (data.groupEmails && Array.isArray(data.groupEmails)) {
        processedGroupEmails = data.groupEmails
          .filter(Boolean)
          .map(email => {
            if (typeof email === 'object' && email !== null && 'value' in email) {
              return typeof email.value === 'string' ? email.value : '';
            }
            return String(email || '');
          })
          .filter(email => email.length > 0);
      }
      
      // Submit registration data with coupon info to store-registration function
      const { data: responseData, error } = await supabase.functions.invoke('store-registration', {
        body: {
          fullName: data.fullName,
          email: data.email,
          organization: data.organization || "",
          role: data.role || "",
          ticketType: data.ticketType,
          groupSize: data.groupSize,
          groupEmails: processedGroupEmails,
          specialRequests: data.specialRequests || "",
          referralSource: data.referralSource || "",
          couponCode: couponCode,
          paymentComplete: true // Mark as paid since it's a 100% discount
        }
      });
      
      if (error) {
        console.error("Free registration edge function error:", error);
        throw new Error(`Registration failed: ${error.message || "Server error"}`);
      }
      
      // Store the email in sessionStorage for the success page
      sessionStorage.setItem("registrationEmail", data.email);
      
      // Reset form and show success message
      form.reset();
      setRegistrationData(null);
      setShowPayment(false);
      setCouponCode(null);
      setCouponDiscount(null);
      setIsFullDiscount(false);
      
      // Show success toast
      toast({
        title: "Registration Successful!",
        description: "Your free registration has been confirmed. You'll receive a confirmation email shortly.",
        variant: "default",
      });
      
      // Redirect to confirmation page
      setTimeout(() => {
        navigate("/conference/success");
      }, 100);
    } catch (error) {
      console.error("Free registration error:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Registration failed. Please try again later.";
      
      toast({
        title: "Registration failed",
        description: errorMessage,
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
    setCouponCode(null);
    setCouponDiscount(null);
    setIsFullDiscount(false);
    form.reset({
      ticketType: TICKET_TYPES_ENUM.STUDENT,
      fullName: "",
      email: "",
      organization: "",
      role: "",
      specialRequests: "",
      groupEmails: [],
      groupSize: undefined,
      couponCode: "",
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
    couponCode,
    couponDiscount,
    isFullDiscount,
    handleEmailValidation,
    handleInitialSubmit,
    handleDirectRegistration,
    setCouponCode,
    setCouponDiscount,
    setIsFullDiscount,
    setShowPayment,
    resetForm,
  };
};
