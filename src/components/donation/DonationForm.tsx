
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { DonationType } from "@/types/donation";
import DonationTypeSelector from "./DonationTypeSelector";
import DonationAmountSelector from "./DonationAmountSelector";
import DonorInformationForm from "./DonorInformationForm";
import DonationPaymentForm from "./DonationPaymentForm";
import DonationSuccessPage from "./DonationSuccessPage";

// Initialize Stripe
const stripePromise = loadStripe(
  "pk_test_51NVCrZLUacmfuZcMHptobJGjQ6CCK6vTxvWG1KTuUVSaHNr2ELo17P7Jhl07TmnKiGwJa9Q8wEMvgFSRJgr5Vr5G00HOXRX3RT"
);

/**
 * DonationForm Component
 * 
 * Main component for the donation flow:
 * - Step 1: Select donation type
 * - Step 2: Select donation amount
 * - Step 3: Enter donor information
 * - Step 4: Make payment
 * - Step 5: Success confirmation
 */
const DonationForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");
  const [donationData, setDonationData] = useState({
    amount: 50,
    donorName: "",
    donorEmail: "",
    isAnonymous: false,
    donationType: "general" as DonationType,
    message: "",
  });

  const handleDonationTypeSelect = (type: DonationType) => {
    setDonationData((prev) => ({ ...prev, donationType: type }));
    setCurrentStep(2);
  };

  const handleAmountSelect = (amount: number) => {
    setDonationData((prev) => ({ ...prev, amount }));
    setCurrentStep(3);
  };

  const handleDonorInfoSubmit = (data: {
    donorName: string;
    donorEmail: string;
    isAnonymous: boolean;
    message: string;
  }) => {
    setDonationData((prev) => ({ ...prev, ...data }));
    setCurrentStep(4);
  };

  const handlePaymentSetup = (secret: string, intentId: string) => {
    setClientSecret(secret);
    setPaymentIntentId(intentId);
  };

  const handlePaymentSuccess = () => {
    setCurrentStep(5);
    toast({
      title: "Donation successful!",
      description: "Thank you for your generous contribution!",
    });
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment error",
      description: error,
      variant: "destructive",
    });
  };

  const resetForm = () => {
    setCurrentStep(1);
    setClientSecret("");
    setPaymentIntentId("");
    setDonationData({
      amount: 50,
      donorName: "",
      donorEmail: "",
      isAnonymous: false,
      donationType: "general" as DonationType,
      message: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
      {currentStep === 1 && (
        <DonationTypeSelector onSelect={handleDonationTypeSelect} />
      )}

      {currentStep === 2 && (
        <DonationAmountSelector 
          onSelect={handleAmountSelect} 
          initialAmount={donationData.amount}
          donationType={donationData.donationType}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <DonorInformationForm 
          onSubmit={handleDonorInfoSubmit}
          initialData={{
            donorName: donationData.donorName,
            donorEmail: donationData.donorEmail,
            isAnonymous: donationData.isAnonymous,
            message: donationData.message
          }}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 4 && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <DonationPaymentForm
            donationData={donationData}
            paymentIntentId={paymentIntentId}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onBack={() => setCurrentStep(3)}
          />
        </Elements>
      )}

      {currentStep === 4 && !clientSecret && (
        <DonationPaymentForm
          donationData={donationData}
          onClientSecretCreated={handlePaymentSetup}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onBack={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 5 && (
        <DonationSuccessPage
          donationData={donationData}
          onDonateAgain={resetForm}
        />
      )}
    </div>
  );
};

export default DonationForm;
