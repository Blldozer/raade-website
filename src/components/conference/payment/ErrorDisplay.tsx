
import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
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
 * - Enhanced error formatting and technical details handling
 * 
 * @param title - Error message title
 * @param details - Detailed error information
 * @param onRetry - Callback function for retry action
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, details, onRetry }) => {
  // Format the error details to make request IDs more accessible
  const formatErrorDetails = () => {
    if (!details) return null;
    
    // Check if the error contains a request ID
    const requestIdMatch = details.match(/Request ID: ([a-zA-Z0-9-]+)/);
    const requestId = requestIdMatch ? requestIdMatch[1] : null;
    
    // If we have a request ID, format it separately
    if (requestId) {
      // Remove the request ID from the main message
      const mainMessage = details.replace(/\(Request ID: [a-zA-Z0-9-]+\)/, '').trim();
      
      return (
        <>
          <p className="mb-2">{mainMessage}</p>
          <p className="text-xs text-gray-400">Reference: {requestId}</p>
        </>
      );
    }
    
    // No request ID, just return the details as is
    return details;
  };

  return (
    <div className="mt-4">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {formatErrorDetails()}
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

export default ErrorDisplay;
