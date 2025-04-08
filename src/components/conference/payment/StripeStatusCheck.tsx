
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

/**
 * StripeStatusCheck Component
 * 
 * Verifies that Stripe payment processing is available
 * - Shows loading state while checking
 * - Displays connection status
 * - Provides a retry button if connection fails
 */
const StripeStatusCheck = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  
  const checkStripeConnection = async () => {
    setIsChecking(true);
    setStatus('checking');
    
    try {
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
            <AlertCircle className="h-4 w-4 mr-2" />
            <div className="flex-1">
              <span>Payment system unavailable: {errorMessage}</span>
              <button 
                onClick={checkStripeConnection}
                disabled={isChecking}
                className="ml-3 text-xs underline"
              >
                Retry
              </button>
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
