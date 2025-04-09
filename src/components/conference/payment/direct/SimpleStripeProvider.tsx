
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutButton from "./StripeCheckoutButton";
import { REFERRAL_SOURCES, TICKET_TYPES, calculateDiscountedPrice, calculateTotalPrice } from "../../RegistrationFormTypes";
import { supabase } from "@/integrations/supabase/client";

interface SimpleStripeProviderProps {
  ticketType: typeof TICKET_TYPES[number];
  fullName: string;
  email: string;
  organization: string;
  role: string;
  groupSize?: number;
  groupEmails?: string[];
  specialRequests?: string;
  referralSource?: typeof REFERRAL_SOURCES[number];
  couponCode?: string;
  couponDiscount?: { type: 'percentage' | 'fixed'; amount: number } | null;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * SimpleStripeProvider Component
 * 
 * Provides a simplified Stripe checkout experience:
 * - Handles both individual and group registrations
 * - Supports coupon code discounts
 * - Creates checkout session with appropriate metadata
 * - Handles success and error cases with callbacks
 */
const SimpleStripeProvider = ({
  ticketType,
  fullName,
  email,
  organization,
  role,
  groupSize,
  groupEmails = [],
  specialRequests,
  referralSource,
  couponCode,
  couponDiscount,
  onSuccess,
  onError
}: SimpleStripeProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  
  useEffect(() => {
    // Calculate the total price
    const originalPrice = calculateTotalPrice(
      ticketType, 
      ticketType === "student-group" ? groupSize : undefined
    );
    
    // Apply coupon discount if available
    const discountedPrice = calculateDiscountedPrice(originalPrice, couponDiscount);
    
    setAmount(discountedPrice);
  }, [ticketType, groupSize, couponDiscount]);

  const handleCreateCheckoutSession = async () => {
    setIsLoading(true);
    try {
      console.log("Creating checkout session for:", {
        ticketType,
        email,
        fullName,
        organization,
        role,
        groupSize,
        groupEmails: groupEmails.length
      });
      
      // Create the checkout session
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: {
          ticketType,
          email,
          fullName,
          organization,
          role,
          groupSize,
          groupEmails,
          specialRequests,
          referralSource,
          couponCode,
          customAmount: amount // Pass the calculated amount with discount
        }
      });
      
      if (error || !data?.sessionId) {
        console.error("Error creating checkout session:", error || "No session ID returned");
        const errorMessage = data?.error || error?.message || "Failed to create checkout session";
        onError(errorMessage);
        setIsLoading(false);
        return;
      }
      
      // Store the checkout session ID in session storage
      sessionStorage.setItem("checkoutSessionId", data.sessionId);
      sessionStorage.setItem("registrationEmail", email);
      
      // Redirect to the checkout page
      setSessionId(data.sessionId);
      
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }
      
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });
      
      if (redirectError) {
        console.error("Error redirecting to checkout:", redirectError);
        onError(redirectError.message);
      }
    } catch (err) {
      console.error("Error in checkout process:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <StripeCheckoutButton 
        onClick={handleCreateCheckoutSession} 
        isLoading={isLoading} 
        amount={amount}
      />
    </div>
  );
};

export default SimpleStripeProvider;
