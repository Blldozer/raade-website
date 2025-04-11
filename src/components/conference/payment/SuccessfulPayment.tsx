
import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegistrationFormData, getFullName } from "../RegistrationFormTypes";
import { useEmailConfirmation } from "./EmailConfirmationSender";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessfulPaymentProps {
  registrationData: RegistrationFormData;
  onContinue: () => void;
}

/**
 * SuccessfulPayment Component
 * 
 * An improved payment success screen that:
 * - Uses staggered animations for visual stability
 * - Controls confetti rendering to prevent performance issues
 * - Handles email confirmation state changes smoothly
 * - Prevents multiple button clicks during transitions
 * - Shows only email confirmation status for simplicity
 */
const SuccessfulPayment = ({
  registrationData,
  onContinue
}: SuccessfulPaymentProps) => {
  const [exploding, setExploding] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Use email confirmation hook to handle sending confirmation email
  // and storing registration data
  const { 
    sendingEmail, 
    emailSent, 
    sendConfirmationEmail 
  } = useEmailConfirmation(
    registrationData,
    onContinue
  );
  
  // Send confirmation email when component mounts
  useEffect(() => {
    // Small delay before starting animations and processes
    const startupDelay = setTimeout(() => {
      setExploding(true);
      sendConfirmationEmail();
    }, 100);
    
    // Set confetti to stop after 3 seconds
    const confettiTimer = setTimeout(() => {
      setExploding(false);
    }, 3000);
    
    return () => {
      clearTimeout(startupDelay);
      clearTimeout(confettiTimer);
    };
  }, [sendConfirmationEmail]);

  const handleContinueClick = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    // Short delay to allow exit animations to complete
    setTimeout(onContinue, 300);
  };

  // Get the full name from first and last name
  const fullName = getFullName(registrationData.firstName, registrationData.lastName);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="payment-success"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="relative overflow-hidden border-[#FBB03B]/20 dark:border-[#FBB03B]/30 dark:bg-gray-900 shadow-lg">
          {exploding && (
            <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10 pointer-events-none">
              <ConfettiExplosion 
                force={0.6}
                duration={2500}
                particleCount={80}
                width={1200}
              />
            </div>
          )}
          
          <CardContent className="pt-6 text-center">
            <motion.div 
              className="flex flex-col items-center justify-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Check className="h-8 w-8 text-green-600" />
              </motion.div>
              
              <motion.h2 
                className="text-2xl font-bold text-gray-900 mb-2 font-simula dark:text-white"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Payment Successful!
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 mb-6 max-w-md mx-auto dark:text-gray-300 font-lora"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                Thank you for registering for the RAADE Conference 2025. We look forward to seeing you on April 11-12!
              </motion.p>
              
              <motion.div 
                className="bg-gray-50 p-4 rounded-lg mb-6 w-full max-w-md text-left dark:bg-gray-800"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <h3 className="font-bold mb-2 text-lg text-raade-navy dark:text-white font-simula">Registration Details:</h3>
                <p><span className="font-medium">Name:</span> {fullName}</p>
                <p><span className="font-medium">Email:</span> {registrationData.email}</p>
                <p>
                  <span className="font-medium">Ticket Type:</span> {registrationData.ticketType
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                  }
                </p>
                {registrationData.ticketType === "student-group" && registrationData.groupSize && (
                  <p><span className="font-medium">Group Size:</span> {registrationData.groupSize} people</p>
                )}
                
                {/* Email status - Only showing email confirmation status now */}
                <div className="mt-4 space-y-1 min-h-[1.75rem]">
                  {sendingEmail && (
                    <p className="text-blue-500 italic">Sending confirmation email...</p>
                  )}
                  {emailSent && (
                    <p className="text-green-500 italic">Confirmation email sent!</p>
                  )}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Button 
                  onClick={handleContinueClick}
                  disabled={isTransitioning}
                  className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora px-8
                    dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
                    transition-colors duration-300"
                >
                  Return to Home
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessfulPayment;
