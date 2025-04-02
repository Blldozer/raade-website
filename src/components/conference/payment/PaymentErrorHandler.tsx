
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PaymentErrorHandlerProps {
  error: string;
  onRetry: () => void;
  onReset?: () => void;
  attemptCount: number;
}

/**
 * PaymentErrorHandler Component
 * 
 * Displays payment errors with appropriate actions:
 * - Shows descriptive error messages
 * - Provides retry button for recoverable errors
 * - Offers reset button for critical errors
 * - Shows remaining attempt count
 * 
 * @param error - The error message to display
 * @param onRetry - Function to call when retry is clicked
 * @param onReset - Optional function to call when reset is clicked
 * @param attemptCount - Current number of payment attempts
 */
const PaymentErrorHandler: React.FC<PaymentErrorHandlerProps> = ({
  error,
  onRetry,
  onReset,
  attemptCount
}) => {
  // Determine if this is a critical error that requires reset
  const isCriticalError = error.includes("Edge Function") || 
    error.includes("Payment service") ||
    error.includes("Bad Request") ||
    error.includes("No response");

  return (
    <Card className="mb-6 p-4 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
      <div className="flex items-start space-x-2">
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-red-700 dark:text-red-300 mb-1">
            Payment Error
          </h4>
          <p className="text-sm text-red-600 dark:text-red-200 mb-3">
            {error}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {!isCriticalError && (
                <Button 
                  size="sm" 
                  onClick={onRetry}
                  variant="outline"
                  className="border-red-300 hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-800/50"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Try Again
                </Button>
              )}
              
              {(isCriticalError || onReset) && (
                <Button 
                  size="sm" 
                  onClick={onReset}
                  variant="outline"
                  className="border-red-300 hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-800/50"
                >
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                  Start Over
                </Button>
              )}
            </div>
            
            <p className="text-xs text-red-500 dark:text-red-300">
              Attempt {attemptCount}/3
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentErrorHandler;
