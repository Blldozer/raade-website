
import React from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface PaymentErrorProps {
  message: string;
  onRetry: () => void;
}

/**
 * PaymentError Component
 * 
 * Displays payment error information with retry option:
 * - Clearly communicates error details to the user
 * - Provides a prominent retry button
 * - Uses consistent styling with the rest of the payment flow
 * - Mobile responsive design for all screen sizes
 * 
 * @param message - Error message to display
 * @param onRetry - Callback function when user clicks retry
 */
const PaymentError: React.FC<PaymentErrorProps> = ({ message, onRetry }) => {
  // Format the error details to make request IDs more accessible
  const formatErrorMessage = () => {
    if (!message) return null;
    
    // Check if the error contains a request ID
    const requestIdMatch = message.match(/Request ID: ([a-zA-Z0-9-]+)/);
    const requestId = requestIdMatch ? requestIdMatch[1] : null;
    
    // If we have a request ID, format it separately
    if (requestId) {
      // Remove the request ID from the main message
      const mainMessage = message.replace(/\(Request ID: [a-zA-Z0-9-]+\)/, '').trim();
      
      return (
        <>
          <p className="mb-2">{mainMessage}</p>
          <p className="text-xs text-gray-400">Reference: {requestId}</p>
        </>
      );
    }
    
    // No request ID, just return the message as is
    return message;
  };

  return (
    <div className="mt-4">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Payment Error</AlertTitle>
        <AlertDescription>
          {formatErrorMessage()}
        </AlertDescription>
      </Alert>
      <Button 
        onClick={onRetry} 
        className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
      <p className="mt-3 text-sm text-gray-500 text-center">
        If the problem persists, please refresh the page or try a different payment method.
      </p>
    </div>
  );
};

export default PaymentError;
