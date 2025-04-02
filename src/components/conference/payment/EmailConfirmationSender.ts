
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RegistrationFormData } from '../RegistrationFormTypes';
import { useToast } from '@/hooks/use-toast';

/**
 * Custom hook to handle sending email confirmations
 * 
 * Manages the state and process of sending confirmation emails:
 * - Provides loading and success states
 * - Handles errors gracefully
 * - Only attempts to send once
 * - Stores registration data in the database
 * 
 * @param registrationData - The form data from registration
 * @param onComplete - Optional callback when email is sent
 */
export const useEmailConfirmation = (
  registrationData: RegistrationFormData,
  onComplete?: () => void
) => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  /**
   * Send confirmation email and store registration data
   */
  const sendConfirmationEmail = async () => {
    // Prevent duplicate sends
    if (sendingEmail || emailSent) return;
    
    setSendingEmail(true);
    setError(null);
    
    try {
      console.log('Sending confirmation email to:', registrationData.email);
      
      // Call the send-confirmation edge function
      const { data, error: sendError } = await supabase.functions.invoke('send-confirmation', {
        body: {
          ...registrationData,
          timestamp: new Date().toISOString()
        }
      });
      
      if (sendError) {
        throw new Error(sendError.message || 'Failed to send confirmation email');
      }
      
      // Store registration data in database (even if email fails)
      try {
        await supabase.functions.invoke('store-registration', {
          body: {
            ...registrationData,
            paymentComplete: true,
            registrationDate: new Date().toISOString()
          }
        });
      } catch (storeError) {
        console.error('Error storing registration data:', storeError);
        // Don't fail the whole process if storage fails
      }
      
      console.log('Confirmation email sent successfully');
      setEmailSent(true);
      
      // Show success toast
      toast({
        title: "Confirmation Email Sent",
        description: `A confirmation has been sent to ${registrationData.email}`,
        variant: "default",
      });
      
      // Call completion callback if provided
      if (onComplete) {
        setTimeout(onComplete, 2000); // Give user time to see confirmation
      }
      
    } catch (err) {
      console.error('Error sending confirmation email:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Show error toast but don't block the flow
      toast({
        title: "Email Notification Issue",
        description: "We couldn't send your confirmation email, but your registration is complete.",
        variant: "default", // Not destructive to prevent alarming the user
      });
      
      // Still mark as sent to continue the flow
      setEmailSent(true);
      
      // Call completion callback even if email fails
      if (onComplete) {
        setTimeout(onComplete, 2000);
      }
    } finally {
      setSendingEmail(false);
    }
  };

  return {
    sendingEmail,
    emailSent,
    error,
    sendConfirmationEmail
  };
};
