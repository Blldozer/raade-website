
import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegistrationFormData } from "../RegistrationFormTypes";
import { useEmailConfirmation } from "./EmailConfirmationSender";

interface SuccessfulPaymentProps {
  registrationData: RegistrationFormData;
  onContinue: () => void;
}

/**
 * SuccessfulPayment Component
 * 
 * Displays payment confirmation screen with:
 * - Animated confetti celebration
 * - Registration details
 * - Confirmation email status
 * - Continue button
 * 
 * This component handles the email confirmation sending process
 */
const SuccessfulPayment = ({
  registrationData,
  onContinue
}: SuccessfulPaymentProps) => {
  const [exploding, setExploding] = useState(true);
  
  // Use email confirmation hook to handle sending confirmation email
  const { sendingEmail, emailSent, sendConfirmationEmail } = useEmailConfirmation(
    registrationData,
    onContinue
  );
  
  // Send confirmation email when component mounts
  useEffect(() => {
    sendConfirmationEmail();
    
    // Set confetti to stop after 3 seconds
    const timer = setTimeout(() => {
      setExploding(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [sendConfirmationEmail]);

  return (
    <Card className="relative overflow-hidden border-[#FBB03B]/20 dark:border-[#FBB03B]/30 dark:bg-gray-900">
      {exploding && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <ConfettiExplosion 
            force={0.8}
            duration={3000}
            particleCount={100}
            width={1600}
          />
        </div>
      )}
      
      <CardContent className="pt-6 text-center">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-simula dark:text-white">
            Payment Successful!
          </h2>
          
          <p className="text-gray-600 mb-6 max-w-md mx-auto dark:text-gray-300 font-lora">
            Thank you for registering for the RAADE Conference 2025. We look forward to seeing you on April 11-12!
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6 w-full max-w-md text-left dark:bg-gray-800">
            <h3 className="font-bold mb-2 text-lg text-raade-navy dark:text-white font-simula">Registration Details:</h3>
            <p><span className="font-medium">Name:</span> {registrationData.fullName}</p>
            <p><span className="font-medium">Email:</span> {registrationData.email}</p>
            <p><span className="font-medium">Ticket Type:</span> {registrationData.ticketType.charAt(0).toUpperCase() + registrationData.ticketType.slice(1)}</p>
            {registrationData.ticketType === "student-group" && registrationData.groupSize && (
              <p><span className="font-medium">Group Size:</span> {registrationData.groupSize} people</p>
            )}
            {sendingEmail && <p className="text-blue-500 mt-2 italic">Sending confirmation email...</p>}
            {emailSent && <p className="text-green-500 mt-2 italic">Confirmation email sent!</p>}
          </div>
          
          <Button 
            onClick={onContinue}
            className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora px-8
              dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
              transition-colors duration-300"
          >
            Return to Home
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessfulPayment;
