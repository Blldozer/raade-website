
import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { DonationFormData } from "@/types/donation";
import { createDonationPayment, updateDonationStatus } from "@/services/donationService";

interface DonationPaymentFormProps {
  donationData: DonationFormData;
  paymentIntentId?: string;
  onClientSecretCreated?: (clientSecret: string, paymentIntentId: string) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
  onBack: () => void;
}

/**
 * DonationPaymentForm Component
 * 
 * Handles the Stripe payment process:
 * 1. Creates payment intent
 * 2. Displays card input form
 * 3. Processes payment
 * 4. Updates donation status
 */
const DonationPaymentForm = ({ 
  donationData,
  paymentIntentId,
  onClientSecretCreated,
  onSuccess,
  onError,
  onBack
}: DonationPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCreatingIntent, setIsCreatingIntent] = useState(!paymentIntentId);

  // Create payment intent when component mounts if not provided
  useEffect(() => {
    if (onClientSecretCreated && !paymentIntentId) {
      const createIntent = async () => {
        try {
          setIsCreatingIntent(true);
          const response = await createDonationPayment(donationData);
          onClientSecretCreated(response.clientSecret, response.paymentIntentId);
          setIsCreatingIntent(false);
        } catch (error) {
          setIsCreatingIntent(false);
          setMessage(error instanceof Error ? error.message : "Failed to set up payment");
          onError(error instanceof Error ? error.message : "Failed to set up payment");
        }
      };
      
      createIntent();
    }
  }, [donationData, onClientSecretCreated, paymentIntentId, onError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage("Card element not found");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        "", // This is overridden by the CardElement
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setMessage(error.message || "An error occurred with your payment");
        onError(error.message || "An error occurred with your payment");
      } else if (paymentIntent) {
        if (paymentIntent.status === "succeeded") {
          setIsSuccess(true);
          setMessage("Payment successful! Thank you for your donation.");
          
          // Update donation status in database
          if (paymentIntentId) {
            try {
              await updateDonationStatus(paymentIntentId);
            } catch (statusError) {
              console.error("Error updating donation status:", statusError);
            }
          }
          
          // Notify parent component of success
          onSuccess();
        } else {
          setMessage(`Payment status: ${paymentIntent.status}. Please try again.`);
        }
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
      onError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getDonationTypeName = () => {
    switch (donationData.donationType) {
      case "general": return "General Support";
      case "scholarship": return "Scholarship Fund";
      case "innovation-studios": return "Innovation Studios";
      case "conference": return "Annual Conference";
      default: return "Donation";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#274675] dark:text-[#FBB03B]">
          Complete Your Donation
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Securely process your donation with Stripe
        </p>
      </div>

      <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800">
        <h3 className="font-medium text-lg">Donation Summary</h3>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between">
            <span>Donation Type:</span>
            <span className="font-semibold">{getDonationTypeName()}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-semibold">${donationData.amount.toFixed(2)}</span>
          </div>
          {!donationData.isAnonymous && donationData.donorName && (
            <div className="flex justify-between">
              <span>Donor:</span>
              <span className="font-semibold">{donationData.donorName}</span>
            </div>
          )}
          {donationData.isAnonymous && (
            <div className="flex justify-between">
              <span>Donor:</span>
              <span className="font-semibold">Anonymous</span>
            </div>
          )}
        </div>
      </div>

      {isCreatingIntent ? (
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#274675] dark:text-[#FBB03B]" />
          <p className="mt-2">Setting up payment...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="card-element" className="block text-sm font-medium">
              Card Details
            </label>
            <div className="p-3 border rounded-md">
              <CardElement 
                id="card-element"
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>

          {message && (
            <Alert variant={isSuccess ? "default" : "destructive"} className={isSuccess ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700" : ""}>
              {isSuccess ? (
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between mt-8">
            <Button 
              type="button"
              variant="outline" 
              onClick={onBack}
              disabled={isLoading || isSuccess}
              className="border-[#274675] text-[#274675] hover:bg-[#274675]/10 dark:border-[#FBB03B] dark:text-[#FBB03B] dark:hover:bg-[#FBB03B]/10"
            >
              Back
            </Button>
            <Button 
              type="submit"
              disabled={!stripe || !elements || isLoading || isSuccess}
              className="bg-[#274675] hover:bg-[#274675]/90 dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Donate $${donationData.amount.toFixed(2)}`
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DonationPaymentForm;
