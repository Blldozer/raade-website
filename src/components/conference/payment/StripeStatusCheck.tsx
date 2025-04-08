
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, CheckCircle, Loader2, ExternalLink } from 'lucide-react';

/**
 * StripeStatusCheck Component
 * 
 * Verifies that Stripe payment processing is available
 * - Shows loading state while checking
 * - Displays connection status
 * - Provides a retry button if connection fails
 * - Shows troubleshooting information for common errors
 */
const StripeStatusCheck = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [checkCount, setCheckCount] = useState(0);
  const [browserInfo, setBrowserInfo] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for Content Security Policy issues
    const checkCSP = () => {
      try {
        // Check if we can detect CSP errors in console
        const scripts = document.querySelectorAll('script');
        let stripeScriptsFound = false;
        
        scripts.forEach(script => {
          if (script.src && script.src.includes('stripe')) {
            stripeScriptsFound = true;
          }
        });
        
        // Try to determine browser info
        const userAgent = navigator.userAgent;
        const browserName = userAgent.includes('Chrome') ? 'Chrome' : 
                            userAgent.includes('Firefox') ? 'Firefox' : 
                            userAgent.includes('Safari') ? 'Safari' : 
                            userAgent.includes('Edge') ? 'Edge' : 'Unknown';
        
        setBrowserInfo(`${browserName} - ${window.innerWidth}x${window.innerHeight}`);
        
        return stripeScriptsFound ? 'found' : 'missing';
      } catch (e) {
        console.error('Error checking CSP:', e);
        return 'error';
      }
    };
    
    // Check Stripe scripts
    const stripeScriptStatus = checkCSP();
    console.log('Stripe script status:', stripeScriptStatus);
  }, []);
  
  const checkStripeConnection = async () => {
    setIsChecking(true);
    setStatus('checking');
    setCheckCount(prev => prev + 1);
    
    try {
      console.log(`Checking Stripe connection (attempt ${checkCount + 1})`);
      
      // Call the create-payment-intent function with checkOnly flag
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { checkOnly: true }
      });
      
      if (error) {
        console.error('Stripe connection check failed:', error);
        setStatus('error');
        setErrorMessage(error.message || 'Could not connect to Stripe payment service');
      } else if (data?.success) {
        console.log('Stripe connection verified successfully');
        setStatus('connected');
        setErrorMessage(null);
      } else {
        console.error('Stripe connection check returned invalid response:', data);
        setStatus('error');
        setErrorMessage('Invalid response from payment service');
      }
    } catch (err) {
      console.error('Unexpected error checking Stripe connection:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsChecking(false);
    }
  };
  
  // Check connection status on component mount
  useEffect(() => {
    checkStripeConnection();
  }, []);
  
  // Don't show anything if connection is successful to avoid cluttering the UI
  if (status === 'connected' && !isChecking) {
    return null;
  }
  
  // If we've checked multiple times and still have an error, show more detailed help
  const showDetailedHelp = status === 'error' && checkCount > 1;
  
  return (
    <div className={`mb-4 p-3 rounded-md text-sm ${
      status === 'checking' ? 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
      status === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
      'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    }`}>
      <div className="flex items-center">
        {status === 'checking' && (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span>Checking payment system connection...</span>
          </>
        )}
        
        {status === 'error' && (
          <>
            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            <div className="flex-1">
              <span>Payment system unavailable: {errorMessage}</span>
              
              {showDetailedHelp && (
                <div className="mt-2 text-xs">
                  <p className="font-medium">Troubleshooting tips:</p>
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    <li>Check your network connection</li>
                    <li>Try disabling browser extensions</li>
                    <li>Clear browser cache and cookies</li>
                    <li>Try a different browser</li>
                    {browserInfo && <li>Browser info: {browserInfo}</li>}
                  </ul>
                </div>
              )}
              
              <div className="mt-2">
                <button 
                  onClick={checkStripeConnection}
                  disabled={isChecking}
                  className="mr-3 text-xs px-2 py-1 bg-white dark:bg-slate-700 border border-red-300 dark:border-red-700 rounded"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-1 inline animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>Retry Connection</>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
        
        {status === 'connected' && (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Payment system connected</span>
          </>
        )}
      </div>
    </div>
  );
};

export default StripeStatusCheck;
