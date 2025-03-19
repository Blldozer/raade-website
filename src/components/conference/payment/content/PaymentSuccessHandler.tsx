
import { useCallback } from "react";

/**
 * PaymentSuccessHandler Component Props
 */
interface PaymentHandlerProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  children: (handlers: {
    handleSuccess: () => void;
    handleError: (error: string) => void;
  }) => React.ReactNode;
}

/**
 * PaymentSuccessHandler Component
 * 
 * Wraps payment components with consistent success/error handling:
 * - Provides callback functions to child components
 * - Uses render props pattern for flexibility
 * 
 * @param onSuccess - Callback when payment succeeds
 * @param onError - Callback when payment fails
 * @param children - Render prop function that receives handlers
 */
const PaymentHandler: React.FC<PaymentHandlerProps> = ({ 
  onSuccess, 
  onError, 
  children 
}) => {
  // Create memoized handler functions
  const handleSuccess = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

  const handleError = useCallback((error: string) => {
    onError(error);
  }, [onError]);

  // Provide handlers to children through render props
  return <>{children({ handleSuccess, handleError })}</>;
};

export default PaymentHandler;
