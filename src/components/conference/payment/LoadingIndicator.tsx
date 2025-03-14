
import React from "react";
import { Loader2 } from "lucide-react";

/**
 * LoadingIndicator Component
 * 
 * Displays a consistent loading state visualization:
 * - Shows a spinner animation with text
 * - Used during payment initialization and processing
 * - Provides visual feedback to users during async operations
 * 
 * @param message - Optional custom loading message
 */
const LoadingIndicator: React.FC<{ message?: string }> = ({ message = "Preparing payment..." }) => {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-raade-navy" />
      <p className="ml-2">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
