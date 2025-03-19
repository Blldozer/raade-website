
import { createContext, useContext } from "react";

/**
 * Payment Context Type Definition
 * 
 * Defines the shape of data shared between payment components
 */
interface PaymentContextType {
  email: string;
  amount: number;
  currency: string;
  isGroupRegistration: boolean;
  groupSize?: number;
  requestId: string | null;
}

// Create the context with a default undefined value
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

/**
 * Payment Context Provider Component
 * 
 * Provides payment data to child components through React Context
 */
export const PaymentProvider = ({ 
  children, 
  value 
}: { 
  children: React.ReactNode; 
  value: PaymentContextType;
}) => {
  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

/**
 * usePaymentContext Hook
 * 
 * Provides access to payment context data in child components
 */
export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  
  if (context === undefined) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  
  return context;
};
