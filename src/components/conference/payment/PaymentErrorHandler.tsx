
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { clearExistingSessionData, getPaymentAttemptCount } from "./services/sessionManagement";

interface PaymentErrorHandlerProps {
  error: string | null;
  onRetry: () => void;
  onReset: () => void;
  attemptCount?: number;
}

/**
 * PaymentErrorHandler Component
 * 
 * Displays payment errors with appropriate recovery actions:
 * - Shows detailed error information to the user
 * - Provides retry options for transient errors
 * - Offers reset option for persistent errors
 * - Prevents excessive retries by tracking attempts
 */
const PaymentErrorHandler = ({ 
  error, 
  onRetry, 
  onReset,
  attemptCount = getPaymentAttemptCount()
}: PaymentErrorHandlerProps) => {
  if (!error) return null;
  
  // Check if error is a critical one that requires form reset
  const isCriticalError = error.includes("Edge Function") || 
                          error.includes("Payment service") ||
                          error.includes("Bad Request") ||
                          error.includes("No response");
  
  // For excessive attempts or critical errors, show reset option
  const showResetOption = attemptCount >= 2 || isCriticalError;
  
  const handleReset = () => {
    clearExistingSessionData();
    onReset();
  };
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4 mt-1" />
      <div>
        <AlertTitle>Payment Failed</AlertTitle>
        <AlertDescription className="mt-1">
          {error}
        </AlertDescription>
        
        <div className="flex gap-2 mt-3">
          {!showResetOption && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry}
              className="border-white/20 hover:bg-white/10 text-white"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Retry Payment
            </Button>
          )}
          
          {showResetOption && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
              className="border-white/20 hover:bg-white/10 text-white"
            >
              Start Over
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default PaymentErrorHandler;
