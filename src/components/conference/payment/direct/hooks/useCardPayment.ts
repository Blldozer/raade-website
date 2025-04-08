
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useRegistrationStorage } from "./useRegistrationStorage";

interface PaymentData {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: Array<string | { value: string } | null>;
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  couponCode?: string;
  couponDiscount?: number;
}

/**
 * Custom hook to handle Stripe card payment
 * 
 * Manages the payment process including:
 * - Creating payment intent
 * - Confirming card payment
 * - Storing registration data
 * - Error handling
 * - Now supports coupon code discounts
 */
export const useCardPayment = (
  paymentData: PaymentData,
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successState, setSuccessState] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { storeRegistrationData } = useRegistrationStorage();
  
  // Process emails to handle array of objects or strings
  const processGroupEmails = (emails: Array<string | { value: string } | null> = []): string[] => {
    return Array.isArray(emails) 
      ? emails
          .filter(Boolean) // Remove nullish values
          .map(email => {
            if (typeof email === 'object' && email !== null && 'value' in email) {
              return typeof email.value === 'string' ? email.value : '';
            }
            return String(email || '');
          })
          .filter(email => email.length > 0) // Remove empty strings
      : [];
  };

  /**
   * Handle payment form submission
   * 
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      try {
        toast({
          title: "Payment system not ready",
          description: "Please try again in a moment",
          variant: "destructive",
        });
      } catch (toastError) {
        console.error("Toast error:", toastError);
        // Fallback alert if toast fails
        alert("Payment system not ready. Please try again in a moment.");
      }
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      try {
        toast({
          title: "Card input not found",
          description: "Please refresh the page and try again",
          variant: "destructive",
        });
      } catch (toastError) {
        console.error("Toast error:", toastError);
        // Fallback alert if toast fails
        alert("Card input not found. Please refresh the page and try again.");
      }
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Process emails for consistency
      const processedGroupEmails = processGroupEmails(paymentData.groupEmails);
      
      // Generate a unique tracking ID for this payment
      const paymentTrackingId = `pay-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      console.log(`Payment process started: ${paymentTrackingId}`);
      
      // Step 1: Create payment intent
      const { data: intentData, error: intentError } = await supabase.functions.invoke("create-direct-payment-intent", {
        body: {
          ...paymentData,
          groupEmails: processedGroupEmails,
          trackingId: paymentTrackingId
        }
      });
      
      if (intentError || !intentData?.clientSecret) {
        console.error(`Payment intent creation error (${paymentTrackingId}):`, intentError);
        throw new Error(intentError?.message || "Failed to create payment intent");
      }
      
      console.log(`Payment intent created (${paymentTrackingId})`);
      
      // Step 2: Confirm card payment with proper error handling
      const confirmResult = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: paymentData.fullName,
            email: paymentData.email,
          },
        },
      }).catch(err => {
        console.error(`Stripe confirmation error (${paymentTrackingId}):`, err);
        throw new Error(err.message || "Payment confirmation failed");
      });
      
      if (confirmResult.error) {
        console.error(`Payment confirmation error (${paymentTrackingId}):`, confirmResult.error);
        throw new Error(confirmResult.error.message || "Payment failed");
      }
      
      // Verify payment intent status
      if (confirmResult.paymentIntent?.status !== 'succeeded') {
        console.error(`Payment unsuccessful status (${paymentTrackingId}): ${confirmResult.paymentIntent?.status}`);
        throw new Error(`Payment status: ${confirmResult.paymentIntent?.status || 'unknown'}`);
      }
      
      console.log(`Payment confirmed successfully (${paymentTrackingId})`);
      
      // Payment is successful at this point
      // Mark success state first before any other operations
      setSuccessState(true);
      
      // Step 3: Store registration data in Supabase
      console.log(`Storing registration data (${paymentTrackingId})`);
      
      try {
        const registrationSuccess = await storeRegistrationData({
          fullName: paymentData.fullName,
          email: paymentData.email,
          organization: paymentData.organization,
          role: paymentData.role,
          ticketType: paymentData.ticketType,
          specialRequests: paymentData.specialRequests,
          referralSource: paymentData.referralSource,
          groupSize: paymentData.groupSize,
          groupEmails: processedGroupEmails,
          couponCode: paymentData.couponCode,
          couponDiscount: paymentData.couponDiscount,
          paymentComplete: true
        });
        
        if (registrationSuccess) {
          console.log(`Registration stored successfully (${paymentTrackingId})`);
        } else {
          console.error(`Registration storage failed (${paymentTrackingId})`);
          // Continue to success flow even if registration storage fails
          // We'll rely on the payment record instead
        }
      } catch (registrationError) {
        console.error(`Registration storage error (${paymentTrackingId}):`, registrationError);
        // Continue to success flow even if registration storage fails
      }
      
      // Success notification with error handling
      try {
        toast({
          title: "Payment successful!",
          description: "Your registration is complete",
        });
      } catch (toastError) {
        console.error(`Toast notification error (${paymentTrackingId}):`, toastError);
        // Fallback if toast fails - registration is still successful
      }
      
      // Call the success callback after a small delay to ensure state updates
      setTimeout(() => {
        onSuccess();
        console.log(`Payment process completed successfully (${paymentTrackingId})`);
      }, 100);
      
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      
      try {
        toast({
          title: "Payment failed",
          description: errorMessage,
          variant: "destructive",
        });
      } catch (toastError) {
        console.error("Toast error handling payment failure:", toastError);
        // Fallback alert if toast fails
        alert(`Payment failed: ${errorMessage}`);
      }
      
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    successState,
    handleSubmit
  };
};
