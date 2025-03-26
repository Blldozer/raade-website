
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { clearExistingSessionData } from "./services/sessionManagement";
import { Button } from "@/components/ui/button";

/**
 * StripeStatusCheck Component
 * 
 * Checks for Stripe checkout sessions or payment intents in URL
 * and shows appropriate status messages.
 * 
 * - Handles redirects from Stripe
 * - Shows success/failure messages
 * - Gracefully handles back navigation
 * - Provides recovery options for errors
 */
const StripeStatusCheck = () => {
  const [status, setStatus] = useState<"success" | "error" | "warning" | "none">("none");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle retry action when an error occurs
  const handleRetry = () => {
    // Clear any existing session data first
    clearExistingSessionData();
    // Reload the page without query parameters to start fresh
    navigate(location.pathname, { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    const checkStripeStatus = async () => {
      // Parse query parameters from URL
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");
      const paymentIntent = params.get("payment_intent");
      const paymentStatus = params.get("redirect_status");
      
      // If no Stripe-related parameters, return early
      if (!sessionId && !paymentIntent) {
        return;
      }
      
      setIsLoading(true);
      
      try {
        console.log("Checking Stripe status with params:", { 
          sessionId, 
          paymentIntent, 
          paymentStatus,
          storedSessionId: sessionStorage.getItem("checkoutSessionId") 
        });
        
        if (sessionId) {
          // This is a redirect from a Checkout Session
          const storedSessionId = sessionStorage.getItem("checkoutSessionId");
          
          if (storedSessionId === sessionId) {
            // Session ID matches what we expected
            setStatus("success");
            setMessage("Your payment was successfully processed. You'll receive a confirmation email shortly.");
            
            // Clear the stored session data now that it's confirmed
            clearExistingSessionData();
          } else {
            console.log("Session ID mismatch:", {
              expected: storedSessionId,
              received: sessionId
            });
            
            if (!storedSessionId) {
              // No stored session ID found, could be browser storage issues
              setStatus("warning");
              setMessage("Your payment may have been processed, but we couldn't verify it. If you've completed payment, please check your email for confirmation.");
            } else {
              // Could be a reused link or old/invalid session
              setStatus("warning");
              setMessage("We detected a previous payment session. If you've already completed payment, please disregard.");
            }
            
            // Clear any stored session data to prevent conflicts
            clearExistingSessionData();
          }
        } else if (paymentIntent && paymentStatus) {
          // This is a redirect from a Payment Element
          if (paymentStatus === "succeeded") {
            setStatus("success");
            setMessage("Your payment was successfully processed. You'll receive a confirmation email shortly.");
          } else if (paymentStatus === "processing") {
            setStatus("warning");
            setMessage("Your payment is processing. We'll send you a confirmation email once it's complete.");
          } else {
            setStatus("error");
            setMessage("Your payment could not be processed. Please try again or contact support.");
          }
          
          // Clear any stored session data to prevent conflicts
          clearExistingSessionData();
        }
      } catch (error) {
        console.error("Error checking Stripe status:", error);
        setStatus("error");
        setMessage("There was an error verifying your payment status. Please try again or contact support if needed.");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkStripeStatus();
  }, [location.search, navigate]);

  // If no status to show, return null
  if (status === "none" || !message) {
    return null;
  }

  return (
    <Alert variant={status === "success" ? "default" : status === "warning" ? "warning" : "destructive"} 
      className={`mb-6 ${status === "success" ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700" : ""}`}>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : status === "success" ? (
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      ) : status === "warning" ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertTitle className={status === "success" ? "text-green-800 dark:text-green-300" : ""}>
        {status === "success" ? "Payment Successful" : 
         status === "warning" ? "Payment Status" : 
         "Payment Issue"}
      </AlertTitle>
      <AlertDescription className={status === "success" ? "text-green-700 dark:text-green-400" : ""}>
        {message}
        
        {status === "error" && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRetry}
              className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Try Again
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default StripeStatusCheck;
