
import { supabase } from "@/integrations/supabase/client";
import { RegistrationFormData } from "../../RegistrationFormTypes";

/**
 * Registration Data Storage Service
 * 
 * Handles storing conference registration data in Supabase:
 * - Processes group emails to ensure proper format
 * - Implements retry logic with exponential backoff
 * - Handles timeouts and network errors gracefully
 * - Ensures coupon codes are properly stored with registrations
 */
export const storeRegistrationData = async (
  registrationData: RegistrationFormData,
  maxRetries = 3
): Promise<boolean> => {
  let retryCount = 0;
  
  const attemptStoreData = async (): Promise<boolean> => {
    try {
      // Process group emails to a clean format
      let processedGroupEmails = [];
      if (registrationData.groupEmails && Array.isArray(registrationData.groupEmails)) {
        processedGroupEmails = registrationData.groupEmails
          .filter(Boolean)
          .map(email => {
            if (typeof email === 'object' && email !== null && 'value' in email) {
              return email.value;
            }
            return String(email || '');
          })
          .filter(email => email.length > 0);
      }
      
      // Build request data
      const requestData = {
        fullName: registrationData.fullName,
        email: registrationData.email,
        organization: registrationData.organization || "",
        role: registrationData.role || "",
        ticketType: registrationData.ticketType,
        specialRequests: registrationData.specialRequests || "",
        referralSource: registrationData.referralSource || "",
        groupSize: registrationData.groupSize,
        groupEmails: processedGroupEmails,
        // Make sure coupon code is included for free registrations
        couponCode: registrationData.couponCode || "",
        paymentComplete: true // Registration is being stored after successful payment or free coupon
      };
      
      console.log("Storing registration data in Supabase:", requestData);
      
      // Store the registrant email for the success page
      sessionStorage.setItem("registrationEmail", registrationData.email);
      
      // Set a timeout for the data storage request
      const STORAGE_TIMEOUT = 15000; // 15 seconds (increased from 10)
      
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Registration storage timed out after ${STORAGE_TIMEOUT}ms`));
        }, STORAGE_TIMEOUT);
      });
      
      // Create the storage request promise
      const storagePromise = supabase.functions.invoke('store-registration', {
        body: requestData
      });
      
      // Race the timeout against the actual request
      const { data, error } = await Promise.race([
        storagePromise,
        timeoutPromise
      ]);
      
      if (error) {
        console.error("Error storing registration data:", error);
        
        if (retryCount < maxRetries) {
          const backoffTime = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
          console.log(`Will retry storing data in ${backoffTime}ms`);
          
          await new Promise(resolve => setTimeout(resolve, backoffTime));
          
          retryCount++;
          return attemptStoreData();
        }
        
        return false;
      } else {
        if (data?.success) {
          console.log("Registration data stored successfully:", data);
          return true;
        } else {
          console.error("Registration storage returned an error:", data);
          
          if (retryCount < maxRetries) {
            const backoffTime = Math.pow(2, retryCount) * 1000;
            await new Promise(resolve => setTimeout(resolve, backoffTime));
            
            retryCount++;
            return attemptStoreData();
          }
          
          return false;
        }
      }
    } catch (error) {
      console.error("Error invoking store-registration function:", error);
      
      // If we have retries left and it's a timeout or network error
      const typedError = error as Error;
      const isRetryableError = 
        typedError.message?.includes('timeout') || 
        typedError.message?.includes('network') ||
        (error as { code?: string }).code === 'AbortError';
        
      if (isRetryableError && retryCount < maxRetries) {
        const backoffTime = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        console.log(`Will retry storing data in ${backoffTime}ms due to: ${typedError.message}`);
        
        await new Promise(resolve => setTimeout(resolve, backoffTime));
        
        retryCount++;
        return attemptStoreData();
      }
      
      return false;
    }
  };
  
  return attemptStoreData();
};
