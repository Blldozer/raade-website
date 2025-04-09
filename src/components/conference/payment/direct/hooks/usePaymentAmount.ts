
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Custom hook to calculate payment amount
 * 
 * Fetches the payment amount from Supabase Edge Function
 * based on ticket type and group size
 * 
 * @param ticketType - Type of ticket (student, professional, group)
 * @param groupSize - Number of people in group registration
 * @returns Payment amount in cents and loading state
 */
export const usePaymentAmount = (ticketType: string, groupSize?: number) => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saleActive, setSaleActive] = useState(false);

  useEffect(() => {
    const calculateAmount = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase.functions.invoke("calculate-payment-amount", {
          body: { 
            ticketType,
            groupSize: groupSize || 0
          }
        });
        
        if (error) {
          console.error("Error calculating payment amount:", error);
          setError(error.message || "Failed to calculate payment amount");
          return;
        }
        
        if (data?.amount) {
          setPaymentAmount(data.amount);
          // If the response includes saleActive flag, save it
          if (data.hasOwnProperty('saleActive')) {
            setSaleActive(!!data.saleActive);
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("Failed to calculate payment amount:", err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    calculateAmount();
  }, [ticketType, groupSize]);

  return { paymentAmount, isLoading, error, saleActive };
};
