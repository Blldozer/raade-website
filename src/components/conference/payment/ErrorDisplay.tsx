
import React from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  title: string;
  details: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, details, onRetry }) => {
  return (
    <div className="mt-4">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-medium">{title}</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-2 whitespace-pre-wrap">{details}</p>
          <p className="text-sm opacity-80">
            Please try again or use a different payment method. If problems persist, contact us at 
            <a href="mailto:conference@raade.org" className="underline ml-1">conference@raade.org</a>
          </p>
        </AlertDescription>
      </Alert>
      <Button 
        onClick={onRetry} 
        className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white"
      >
        <RefreshCcw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
};

export default ErrorDisplay;
