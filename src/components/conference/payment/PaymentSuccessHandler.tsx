
import { useRef } from "react";

/**
 * Helper component to manage payment success callbacks
 * 
 * Ensures that success callbacks are only called once
 * Prevents duplicate success operations
 */
interface PaymentSuccessHandlerProps {
  onSuccess: () => void;
  children: (handleSuccess: () => void) => React.ReactNode;
}

const PaymentSuccessHandler: React.FC<PaymentSuccessHandlerProps> = ({ 
  onSuccess,
  children
}) => {
  // Track if we're already in the process of a success callback
  const isSuccessCalledRef = useRef(false);
  
  // Handle success callback ensuring it's called only once
  const handleSuccess = () => {
    if (!isSuccessCalledRef.current) {
      isSuccessCalledRef.current = true;
      onSuccess();
    }
  };

  return <>{children(handleSuccess)}</>;
};

export default PaymentSuccessHandler;
