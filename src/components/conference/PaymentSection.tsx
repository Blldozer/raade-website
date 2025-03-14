
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import StripeCheckout from "./StripeCheckout";
import { RegistrationFormData } from "./RegistrationFormTypes";
import RegistrationSummary from "./RegistrationSummary";
import SubmissionConfirmation from "@/components/forms/SubmissionConfirmation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentSectionProps {
  registrationData: RegistrationFormData;
  isSubmitting: boolean;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  onBackClick: () => void;
}

/**
 * PaymentSection Component
 * 
 * Handles the payment process for conference registration:
 * - Displays registration summary
 * - Initializes Stripe payment flow
 * - Sends confirmation email after successful payment
 * - Provides feedback to the user throughout the process
 * 
 * @param registrationData - Form data from the registration form
 * @param isSubmitting - Loading state for the form
 * @param onPaymentSuccess - Callback when payment succeeds
 * @param onPaymentError - Callback when payment fails
 * @param onBackClick - Callback to go back to the registration form
 */
const PaymentSection = ({
  registrationData,
  isSubmitting,
  onPaymentSuccess,
  onPaymentError,
  onBackClick
}: PaymentSectionProps) => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const { toast } = useToast();
  
  const handlePaymentSuccess = async () => {
    setPaymentComplete(true);
    
    // Send confirmation email
    try {
      setSendingEmail(true);
      
      // Build request with all required data
      const requestData = {
        fullName: registrationData.fullName,
        email: registrationData.email,
        ticketType: registrationData.ticketType,
        // Only include groupSize for student-group tickets
        ...(registrationData.ticketType === "student-group" && { 
          groupSize: registrationData.groupSize 
        })
      };
      
      const { data, error } = await supabase.functions.invoke('send-conference-confirmation', {
        body: requestData
      });
      
      if (error) {
        console.error("Error sending confirmation email:", error);
        toast({
          title: "Confirmation email could not be sent",
          description: "We'll still send you conference details via email later.",
          variant: "destructive"
        });
      } else {
        console.log("Confirmation email sent successfully:", data);
        toast({
          title: "Conference confirmation sent",
          description: "Check your email for registration details.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error invoking confirmation email function:", error);
      toast({
        title: "Confirmation email could not be sent",
        description: "We'll still send you conference details via email later.",
        variant: "destructive"
      });
    } finally {
      setSendingEmail(false);
    }
    
    // Delay the onPaymentSuccess callback to allow the user to see the confirmation
    setTimeout(() => {
      onPaymentSuccess();
    }, 5000); // Auto-redirect after 5 seconds
  };
  
  // Generate payment confirmation display
  const paymentConfirmation = (
    <div className="text-white/80 font-lora text-left p-4 bg-[#1a1a1a] rounded-md mb-4">
      <h3 className="text-[#FBB03B] mb-2 font-simula">Payment Details:</h3>
      <p><span className="text-[#FBB03B]/80">Name:</span> {registrationData.fullName}</p>
      <p><span className="text-[#FBB03B]/80">Email:</span> {registrationData.email}</p>
      <p><span className="text-[#FBB03B]/80">Ticket Type:</span> {registrationData.ticketType}</p>
      {registrationData.ticketType === "student-group" && registrationData.groupSize && (
        <>
          <p><span className="text-[#FBB03B]/80">Group Size:</span> {registrationData.groupSize} people</p>
          <p><span className="text-[#FBB03B]/80">Total Cost:</span> ${30 * registrationData.groupSize} (${30} per person)</p>
        </>
      )}
      {sendingEmail && <p className="text-green-400 mt-2">Sending confirmation email...</p>}
    </div>
  );
  
  if (paymentComplete) {
    return (
      <SubmissionConfirmation
        title="Payment Successful!"
        message="Thank you for registering for the RAADE Conference 2025. Your payment has been received and a confirmation email has been sent."
        customMessage={paymentConfirmation}
        buttonText="Continue"
        icon={<CreditCard className="h-16 w-16 text-green-500" />}
        buttonAction={onPaymentSuccess}
      />
    );
  }

  return (
    <div className="space-y-6">
      <RegistrationSummary registrationData={registrationData} />
      
      <StripeCheckout 
        ticketType={registrationData.ticketType}
        email={registrationData.email}
        fullName={registrationData.fullName}
        onSuccess={handlePaymentSuccess}
        onError={onPaymentError}
        groupSize={registrationData.groupSize}
      />
      
      <Button 
        variant="outline" 
        onClick={onBackClick}
        className="w-full border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
        disabled={isSubmitting}
      >
        Back to Registration Form
      </Button>
    </div>
  );
};

export default PaymentSection;
