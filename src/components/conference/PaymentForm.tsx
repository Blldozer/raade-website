
import { useState, useEffect } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement,
  PaymentRequestButtonElement
} from "@stripe/react-stripe-js";

import { Card, CardContent } from "@/components/ui/card";
import PaymentTotal from "./payment/PaymentTotal";
import PaymentStatus from "./payment/PaymentStatus";
import PaymentFormButtons from "./payment/PaymentFormButtons";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface PaymentFormProps {
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  amount: number;
  currency: string;
  isGroupRegistration?: boolean;
  groupSize?: number;
}

/**
 * PaymentForm Component
 * 
 * Displays Stripe payment form with proper pricing information:
 * - Supports digital wallet payments (Apple Pay, Google Pay)
 * - For group registrations, shows both per-person and total cost
 * - For individual registrations, shows single ticket price
 * - Handles payment submission and error reporting
 * 
 * @param email - User's email address
 * @param onSuccess - Callback for successful payment
 * @param onError - Callback for payment errors
 * @param amount - Payment amount
 * @param currency - Payment currency code
 * @param isGroupRegistration - Whether this is a group registration
 * @param groupSize - Number of people in the group
 */
const PaymentForm = ({ 
  email, 
  onSuccess, 
  onError, 
  amount, 
  currency,
  isGroupRegistration,
  groupSize
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Get clientSecret from URL if available when component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("payment_intent_client_secret");
    if (secret) {
      setClientSecret(secret);
    }
  }, []);

  // Initialize payment request for Apple Pay and Google Pay
  useEffect(() => {
    if (!stripe || !elements) {
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

    // Store client secret for wallet payment confirmations
    if (elements._commonOptions.clientSecret) {
      setClientSecret(elements._commonOptions.clientSecret as string);
    }

    // Handle successful payments through wallets
    if (pr) {
      pr.on('paymentmethod', async (e) => {
        if (!clientSecret) {
          console.error("No client secret available for payment confirmation");
          e.complete('fail');
          setMessage("Payment failed: No client secret available");
          onError("Payment failed: No client secret available");
          return;
        }
        
        setIsLoading(true);
        
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
            setMessage(confirmError.message || "Payment failed. Please try again.");
            onError(confirmError.message || "Payment failed. Please try again.");
            setIsLoading(false);
            return;
          }
          
          // Report to the browser that the confirmation was successful
          e.complete('success');
          
          // Check if further actions are needed (like 3D Secure)
          if (paymentIntent.status === 'requires_action') {
            // Use Stripe.js to handle required card action
            const {error} = await stripe.confirmCardPayment(clientSecret);
            if (error) {
              setMessage(error.message || "Payment failed. Please try again.");
              onError(error.message || "Payment failed. Please try again.");
            } else {
              // Payment succeeded
              handlePaymentSuccess();
            }
          } else {
            // Payment succeeded
            handlePaymentSuccess();
          }
        } catch (err) {
          console.error("Error processing wallet payment:", err);
          e.complete('fail');
          setMessage("Payment failed. Please try again.");
          onError("Payment failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      });
    }
  }, [stripe, elements, amount, currency, isGroupRegistration, groupSize, onSuccess, onError, clientSecret]);

  // Check for existing payment in URL
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          handlePaymentSuccess();
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, onSuccess]);

  // Helper function to handle successful payments
  const handlePaymentSuccess = () => {
    setMessage("Payment succeeded!");
    setPaymentCompleted(true);
    onSuccess();
    toast({
      title: "Payment successful",
      description: "Your registration payment has been processed.",
      variant: "default",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
          receipt_email: email,
        },
        redirect: "if_required"
      });

      if (error) {
        console.error("Payment error:", error);
        // This point will only be reached if there's an immediate error when confirming the payment
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "An unexpected error occurred");
          onError(error.message || "An unexpected error occurred");
        } else {
          setMessage("An unexpected error occurred");
          onError("An unexpected error occurred");
        }
        
        // Show error toast
        toast({
          title: "Payment failed",
          description: error.message || "Your payment couldn't be processed. Please try again.",
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // The payment has been processed!
        handlePaymentSuccess();
      }
    } catch (err) {
      console.error("Error during payment submission:", err);
      setMessage("An error occurred during payment processing");
      onError("An error occurred during payment processing");
      
      toast({
        title: "Payment error",
        description: "Something went wrong processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mt-4">
      <CardContent className="pt-6">
        <PaymentTotal 
          amount={amount}
          currency={currency}
          isGroupRegistration={isGroupRegistration}
          groupSize={groupSize}
        />
        
        {/* Digital Wallet Payment Options - Apple Pay / Google Pay */}
        {isWalletLoading ? (
          <div className="py-4 text-center text-sm text-gray-500">
            Checking for digital wallet payment options...
          </div>
        ) : paymentRequest ? (
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
        ) : null}
        
        {paymentRequest && (
          <div className="flex items-center my-4">
            <Separator className="flex-grow" />
            <span className="px-4 text-sm text-gray-500">Or pay with card</span>
            <Separator className="flex-grow" />
          </div>
        )}
        
        <form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement 
            id="link-authentication-element"
            options={{
              defaultValues: { email }
            }}
          />
          
          <PaymentElement 
            id="payment-element" 
            options={{
              layout: "tabs",
              defaultValues: {
                billingDetails: {
                  email: email
                }
              }
            }}
            className="mb-6 mt-4"
          />
          
          <AddressElement 
            options={{
              mode: 'billing',
              fields: {
                phone: 'always',
              },
              validation: {
                phone: {
                  required: 'always',
                },
              },
            }}
            className="mb-6"
          />
          
          <PaymentFormButtons 
            isLoading={isLoading}
            isDisabled={!stripe || !elements}
            paymentCompleted={paymentCompleted}
          />
          
          <PaymentStatus message={message} />
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
