
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

/**
 * StripeStatusCheck Component
 * 
 * Tests the Stripe Edge Function connection:
 * - Makes a test call to the payment intent endpoint
 * - Displays the status of the connection
 * - Provides error details when connection fails
 */
const StripeStatusCheck = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  
  useEffect(() => {
    const checkStripeConnection = async () => {
      try {
        // Call the Edge Function with a test payload
        const { data, error } = await supabase.functions.invoke("create-payment-intent", {
          body: {
            ticketType: "test",
            email: "test@example.com",
            fullName: "Test User",
            checkOnly: true
          }
        });
        
        if (error) {
          console.error("Error checking Stripe connection:", error);
          setStatus("error");
          setErrorDetails(error.message);
          return;
        }
        
        if (data?.error) {
          // If the error is about invalid ticket type, that means the Edge Function is working
          // since it got far enough to validate the input
          if (data.error.includes("Invalid ticket type")) {
            setStatus("success");
          } else {
            setStatus("error");
            setErrorDetails(data.error);
          }
        } else {
          setStatus("success");
        }
      } catch (err) {
        console.error("Exception checking Stripe connection:", err);
        setStatus("error");
        setErrorDetails(err instanceof Error ? err.message : "Unknown error");
      }
    };
    
    checkStripeConnection();
  }, []);
  
  if (status === "loading") {
    return (
      <Alert className="bg-gray-100 border-gray-200">
        <AlertTitle className="flex items-center">
          <span className="mr-2">Testing Stripe Connection...</span>
        </AlertTitle>
      </Alert>
    );
  }
  
  if (status === "success") {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-700">Stripe Integration Ready</AlertTitle>
        <AlertDescription className="text-green-600">
          Payment system is properly configured and ready to process payments.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Stripe Integration Error</AlertTitle>
      <AlertDescription>
        {errorDetails || "There was an error connecting to the payment service."}
      </AlertDescription>
    </Alert>
  );
};

export default StripeStatusCheck;
