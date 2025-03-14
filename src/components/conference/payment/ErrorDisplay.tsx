
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  title: string;
  details: string;
  onRetry: () => void;
}

/**
 * ErrorDisplay Component
 * 
 * Handles payment error presentation:
 * - Shows error details with consistent styling
 * - Provides a retry action button
 * - Clearly communicates payment issues to users
 * 
 * @param title - Error message title
 * @param details - Detailed error information
 * @param onRetry - Callback function for retry action
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, details, onRetry }) => {
  return (
    <div className="mt-4">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {details}
        </AlertDescription>
      </Alert>
      <Button 
        onClick={onRetry} 
        className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white"
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorDisplay;
