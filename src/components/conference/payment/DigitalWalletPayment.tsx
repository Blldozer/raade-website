
import React, { useEffect, useState } from "react";
import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { PaymentRequest, Stripe } from "@stripe/stripe-js";
import { Separator } from "@/components/ui/separator";

interface DigitalWalletPaymentProps {
  stripe: Stripe | null;
  amount: number;
  currency: string;
  clientSecret: string | null;
  isGroupRegistration?: boolean;
  groupSize?: number;
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * DigitalWalletPayment Component
 * 
 * Handles Apple Pay and Google Pay functionality:
 * - Creates and configures payment request
 * - Displays appropriate wallet buttons when available
 * - Processes payments through wallet APIs
 * - Handles success and error states
 */
const DigitalWalletPayment: React.FC<DigitalWalletPaymentProps> = ({
  stripe,
  amount,
  currency,
  clientSecret,
  isGroupRegistration,
  groupSize,
  email,
  onSuccess,
  onError
}) => {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [isWalletLoading, setIsWalletLoading] = useState(true);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Convert dollars to cents for Stripe
    const amountInCents = Math.round(amount * 100);
    
    const pr = stripe.paymentRequest({
      country: 'US',
      currency: currency.toLowerCase(),
      total: {
        label: isGroupRegistration 
          ? `RAADE Conference 2025 - Group (${groupSize} members)`
          : 'RAADE Conference 2025 - Registration',
        amount: amountInCents,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestShipping: false,
    });

    // Check if the Payment Request is supported
    pr.canMakePayment().then(result => {
      setIsWalletLoading(false);
      if (result) {
        setPaymentRequest(pr);
        console.log("Digital wallet payment methods available:", result);
      } else {
        console.log("No digital wallet payment methods available");
      }
    })
    .catch(err => {
      console.error("Error checking for wallet payment methods:", err);
      setIsWalletLoading(false);
    });

    // Handle successful payments through wallets
    if (pr) {
      pr.on('paymentmethod', async (e) => {
        if (!clientSecret) {
          console.error("No client secret available for payment confirmation");
          e.complete('fail');
          onError("Payment failed: No client secret available");
          return;
        }
        
        try {
          // Confirm the PaymentIntent with the payment method ID from the wallet
          const {error: confirmError, paymentIntent} = await stripe.confirmCardPayment(
            clientSecret,
            {payment_method: e.paymentMethod.id},
            {handleActions: false}
          );

          if (confirmError) {
            // Report to the browser that the payment failed
            e.complete('fail');
            onError(confirmError.message || "Payment failed. Please try again.");
            return;
          }
          
          // Report to the browser that the confirmation was successful
          e.complete('success');
          
          // Check if further actions are needed (like 3D Secure)
          if (paymentIntent.status === 'requires_action') {
            // Use Stripe.js to handle required card action
            const {error} = await stripe.confirmCardPayment(clientSecret);
            if (error) {
              onError(error.message || "Payment failed. Please try again.");
            } else {
              // Payment succeeded
              onSuccess();
            }
          } else {
            // Payment succeeded
            onSuccess();
          }
        } catch (err) {
          console.error("Error processing wallet payment:", err);
          e.complete('fail');
          onError("Payment failed. Please try again.");
        }
      });
    }
  }, [stripe, amount, currency, isGroupRegistration, groupSize, onSuccess, onError, clientSecret, email]);

  if (isWalletLoading) {
    return (
      <div className="py-4 text-center text-sm text-gray-500">
        Checking for digital wallet payment options...
      </div>
    );
  }

  if (!paymentRequest) {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        <p className="mb-2 text-sm text-center font-medium">Pay quickly with:</p>
        <PaymentRequestButtonElement 
          options={{
            paymentRequest,
            style: {
              paymentRequestButton: {
                theme: 'dark',
                height: '44px',
              },
            },
          }} 
        />
      </div>
      <div className="flex items-center my-4">
        <Separator className="flex-grow" />
        <span className="px-4 text-sm text-gray-500">Or pay with card</span>
        <Separator className="flex-grow" />
      </div>
    </>
  );
};

export default DigitalWalletPayment;
