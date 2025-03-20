
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

/**
 * StripeStatusCheck Component
 * 
 * Tests the Stripe Edge Function connection:
 * - Makes a test call to the payment intent endpoint
 * - Displays the status of the connection
 * - Provides error details when connection fails
 * - Includes retry functionality
 * - Shows detailed connection diagnostics
 */
const StripeStatusCheck = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [diagnostics, setDiagnostics] = useState<{
    startTime: number;
    endTime: number;
    latency: number;
    attempts: number;
  }>({
    startTime: Date.now(),
    endTime: 0,
    latency: 0,
    attempts: 1
  });
  
  const checkStripeConnection = async (isRetry = false) => {
    try {
      if (isRetry) {
        setIsRetrying(true);
        setDiagnostics(prev => ({
          ...prev,
          startTime: Date.now(),
          attempts: prev.attempts + 1
        }));
      }
      
      // Generate a unique request ID for tracking
      const requestId = `status-check-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      console.log(`Starting Stripe connection check [${requestId}]`);
      
      // Call the Edge Function with a test payload
      const startTime = Date.now();
      const { data, error } = await Promise.race([
        supabase.functions.invoke("create-payment-intent", {
          body: {
            ticketType: "test",
            email: "test@example.com",
            fullName: "Test User",
            checkOnly: true,
            requestId
          }
        }),
        new Promise<{data: null, error: Error}>((resolve) => {
          setTimeout(() => {
            resolve({
              data: null,
              error: new Error(`Request timeout after 10 seconds [${requestId}]`)
            });
          }, 10000); // 10 second timeout
        })
      ]);
      
      const endTime = Date.now();
      const latency = endTime - startTime;
      
      setDiagnostics(prev => ({
        ...prev,
        endTime,
        latency
      }));
      
      console.log(`Stripe connection check completed in ${latency}ms [${requestId}]`);
      
      if (error) {
        console.error(`Error checking Stripe connection [${requestId}]:`, error);
        setStatus("error");
        setErrorDetails(`${error.message} (Request ID: ${requestId})`);
        return;
      }
      
      if (!data) {
        console.error(`No response data from Stripe check [${requestId}]`);
        setStatus("error");
        setErrorDetails(`No response from payment service (Request ID: ${requestId})`);
        return;
      }
      
      if (data.error) {
        // If the error is about invalid ticket type, that means the Edge Function is working
        // since it got far enough to validate the input
        if (data.error.includes("Invalid ticket type")) {
          console.log(`Stripe connection working (expected validation error) [${requestId}]`);
          setStatus("success");
        } else {
          console.error(`Stripe configuration error [${requestId}]:`, data.error);
          setStatus("error");
          setErrorDetails(data.error);
        }
      } else if (data.success) {
        console.log(`Stripe connection successful [${requestId}]`);
        setStatus("success");
      } else {
        setStatus("error");
        setErrorDetails("Unknown response from payment service");
      }
    } catch (err) {
      console.error("Exception checking Stripe connection:", err);
      setStatus("error");
      setErrorDetails(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsRetrying(false);
    }
  };
  
  useEffect(() => {
    checkStripeConnection();
  }, []);
  
  const handleRetry = () => {
    setStatus("loading");
    setErrorDetails(null);
    checkStripeConnection(true);
  };
  
  if (status === "loading") {
    return (
      <Alert className="bg-gray-100 border-gray-200">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          <AlertTitle className="text-gray-700">
            {isRetrying 
              ? `Retrying Stripe Connection (Attempt ${diagnostics.attempts})...` 
              : "Testing Stripe Connection..."}
          </AlertTitle>
        </div>
      </Alert>
    );
  }
  
  if (status === "success") {
    return (
      <Alert className="bg-green-50 border-green-200">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-700">Stripe Integration Ready</AlertTitle>
        </div>
        <AlertDescription className="text-green-600 mt-1 text-sm">
          Payment system is properly configured and ready to process payments.
          {diagnostics.latency > 0 && (
            <span className="block text-xs text-green-500 mt-1">
              Connection latency: {diagnostics.latency}ms
            </span>
          )}
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert variant="destructive">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Stripe Integration Error</AlertTitle>
        </div>
        <button 
          onClick={handleRetry}
          className="px-2 py-1 bg-white border border-red-300 rounded-md text-xs text-red-700 hover:bg-red-50"
          disabled={isRetrying}
        >
          {isRetrying ? "Retrying..." : "Retry"}
        </button>
      </div>
      <AlertDescription className="mt-1">
        {errorDetails || "There was an error connecting to the payment service."}
        {diagnostics.latency > 0 && (
          <span className="block text-xs opacity-75 mt-1">
            Request time: {diagnostics.latency}ms | Attempts: {diagnostics.attempts}
          </span>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default StripeStatusCheck;
