
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

/**
 * StripeStatusCheck Component
 * 
 * This component checks if the Stripe integration is working properly.
 * It shows a warning if there are issues connecting to Stripe.
 */
const StripeStatusCheck = () => {
  const [status, setStatus] = useState<'checking' | 'error' | 'success' | 'idle'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const checkStripeStatus = async () => {
    if (status === 'checking') return;
    
    setStatus('checking');
    setErrorMessage(null);
    
    try {
      console.log("Checking Stripe connection status...");
      
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          checkOnly: true
        }
      });
      
      if (error) {
        console.error("Stripe status check failed:", error);
        setStatus('error');
        setErrorMessage(error.message || "Unable to connect to Stripe payment service");
        setIsVisible(true);
      } else if (data?.success) {
        console.log("Stripe connection check successful");
        setStatus('success');
        setIsVisible(false);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        console.warn("Unexpected response from Stripe check:", data);
        setStatus('error');
        setErrorMessage("Received unexpected response from payment service");
        setIsVisible(true);
      }
    } catch (err) {
      console.error("Error checking Stripe status:", err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : "Unknown error checking payment status");
      setIsVisible(true);
    }
  };

  // Check status on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      checkStripeStatus();
    }, 500); // Small delay to avoid competing with page load
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  if (status === 'checking') {
    return (
      <div className="p-3 bg-blue-50 text-blue-700 rounded-md flex items-center space-x-2 mb-4 dark:bg-blue-900/20 dark:text-blue-300">
        <RefreshCw className="h-4 w-4 animate-spin" />
        <p className="text-sm">Checking payment system status...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-3 bg-amber-50 text-amber-700 rounded-md flex space-x-2 mb-4 dark:bg-amber-900/20 dark:text-amber-300">
        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-medium">Payment System Warning</p>
          <p className="text-xs">{errorMessage || "There might be issues with the payment system. You can continue, but you may encounter problems during checkout."}</p>
          <button 
            onClick={checkStripeStatus} 
            className="text-xs underline flex items-center space-x-1 mt-1"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Check Again</span>
          </button>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="p-3 bg-green-50 text-green-700 rounded-md flex items-center space-x-2 mb-4 dark:bg-green-900/20 dark:text-green-300">
        <CheckCircle className="h-4 w-4" />
        <p className="text-sm">Payment system connected and working properly.</p>
      </div>
    );
  }

  return null;
};

export default StripeStatusCheck;
