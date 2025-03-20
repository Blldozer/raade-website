
import { useRef } from "react";

/**
 * Custom hook to manage payment confirmation state
 * 
 * Tracks important state references across the payment confirmation process:
 * - Component mount state to prevent updates after unmount
 * - Success callback tracking to prevent duplicate success calls
 * 
 * @returns References for tracking payment confirmation state
 */
export const usePaymentConfirmationState = () => {
  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef<boolean>(true);
  
  // Track if success callback has been called to prevent duplicates
  const successCalledRef = useRef<boolean>(false);
  
  // Reset success state
  const resetSuccessState = () => {
    successCalledRef.current = false;
  };
  
  return {
    isMountedRef,
    successCalledRef,
    resetSuccessState
  };
};
