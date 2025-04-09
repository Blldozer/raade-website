
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { registrationFormSchema, RegistrationFormData, TICKET_TYPES_ENUM } from "../RegistrationFormTypes";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

/**
 * useRegistrationForm Hook
 * 
 * Manages the conference registration form state and submission:
 * - Handles form validation with Zod schema
 * - Manages coupon code application and discounts
 * - Controls multi-step registration flow
 * - Processes both paid and free registrations
 * - Handles error recovery and retries
 * - Manages navigation after successful registration
 */
export const useRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);
  const [emailValidated, setEmailValidated] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<{ type: 'percentage' | 'fixed'; amount: number } | null>(null);
  const [isFullDiscount, setIsFullDiscount] = useState(false);
  const navigate = useNavigate();
  const freeRegistrationAttemptRef = useRef(0);
  const registrationInProgressRef = useRef(false);

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
    // Prevent multiple simultaneous registration attempts
    if (registrationInProgressRef.current) {
      console.log("Registration already in progress, ignoring duplicate request");
      return;
    }
    
    try {
      setIsSubmitting(true);
      registrationInProgressRef.current = true;
      freeRegistrationAttemptRef.current += 1;
      const currentAttempt = freeRegistrationAttemptRef.current;
      
      console.log(`Processing free registration with coupon code: ${couponCode} (Attempt #${currentAttempt})`);
      
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
      
      // Generate a unique request ID for tracking
      const requestId = `free-reg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      
      // Store the email in sessionStorage for the success page
      // Do this BEFORE the registration attempt to ensure it's available even if there's an error
      sessionStorage.setItem("registrationEmail", data.email);
      
      console.log(`[${requestId}] Starting store-registration function call...`);
      console.log(`[${requestId}] Registration data:`, {
        fullName: data.fullName,
        email: data.email,
        ticketType: data.ticketType,
        organization: data.organization || "",
        couponCode,
        requestId
      });
      
      // Submit registration data with coupon info to store-registration function
      const response = await supabase.functions.invoke('store-registration', {
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
          paymentComplete: true, // Mark as paid since it's a 100% discount
          requestId // Add for tracking
        }
      });
      
      // Check for errors in function response
      if (response.error) {
        console.error(`[${requestId}] Free registration edge function error:`, response.error);
        throw new Error(`Registration failed: ${response.error.message || "Server error"}`);
      }
      
      const responseData = response.data;
      
      // Log the response for debugging
      console.log(`[${requestId}] Free registration response:`, responseData);
      
      if (!responseData || !responseData.success) {
        console.error(`[${requestId}] Registration response indicates failure:`, responseData);
        throw new Error(responseData?.message || "Unknown server error");
      }
      
      // Reset form and state
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
      // Use setTimeout to ensure state updates before navigation
      console.log(`[${requestId}] Registration successful, navigating to success page in 500ms`);
      setTimeout(() => {
        if (currentAttempt === freeRegistrationAttemptRef.current) {
          console.log(`[${requestId}] Executing navigation to /conference/success`);
          navigate("/conference/success");
        } else {
          console.log(`[${requestId}] Navigation canceled - newer attempt in progress`);
        }
      }, 500); // A longer delay to ensure proper state management
      
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
      
      // Show diagnostic toast for user to provide more context about the error
      toast({
        title: "Technical details",
        description: "There was an error communicating with our registration service. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      
      // Delayed release of the in-progress flag to prevent race conditions
      setTimeout(() => {
        registrationInProgressRef.current = false;
      }, 1000);
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
    freeRegistrationAttemptRef.current = 0;
    registrationInProgressRef.current = false;
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
