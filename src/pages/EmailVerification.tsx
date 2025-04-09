
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

/**
 * Email Verification Page
 * 
 * This page handles the email verification process:
 * - Extracts token from URL
 * - Verifies token with Supabase
 * - Shows appropriate success/error messages
 * - Provides navigation back to registration
 */
const EmailVerification = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Extract token from URL query params
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        if (!token) {
          setErrorMessage('Verification token is missing. Please check your email link.');
          setIsVerifying(false);
          return;
        }
        
        // Verify the token with Supabase
        const { data, error } = await supabase.functions.invoke('verify-email', {
          body: { token }
        });
        
        if (error || !data?.success) {
          console.error('Verification error:', error || data?.message);
          setErrorMessage(data?.message || 'Failed to verify your email. The token may be expired or invalid.');
          setIsVerifying(false);
          return;
        }
        
        // Token verification successful
        setIsSuccess(true);
        setIsVerifying(false);
      } catch (err) {
        console.error('Error during verification:', err);
        setErrorMessage('An unexpected error occurred. Please try again later.');
        setIsVerifying(false);
      }
    };
    
    verifyEmail();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation forceDarkMode={true} />
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mt-10">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Email Verification
          </h1>
          
          {isVerifying ? (
            <div className="flex flex-col items-center p-6">
              <Loader2 className="h-12 w-12 text-[#274675] animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Verifying your email address...
              </p>
            </div>
          ) : isSuccess ? (
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Verification Successful!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your email has been successfully verified. You can now proceed with your registration.
              </p>
              <Button 
                onClick={() => navigate('/conference/register')}
                className="bg-[#274675] hover:bg-[#274675]/90"
              >
                Return to Registration
              </Button>
            </div>
          ) : (
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Verification Failed
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {errorMessage}
              </p>
              <Button 
                onClick={() => navigate('/conference/register')}
                className="bg-[#274675] hover:bg-[#274675]/90"
              >
                Return to Registration
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
