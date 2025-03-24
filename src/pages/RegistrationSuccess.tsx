
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavBackground } from "@/hooks/useNavBackground";
import { useEmailConfirmation } from "@/components/conference/payment/EmailConfirmationSender";

/**
 * Registration Success Page
 * 
 * Displayed after successful Stripe Checkout payment:
 * - Shows confirmation message
 * - Sends confirmation email
 * - Provides navigation back to conference page
 */
const RegistrationSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize navigation background
  useNavBackground('dark');
  
  // Get registration data from session storage
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('conference_registration');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setRegistrationData(parsedData);
        
        // Clear the data from session storage
        sessionStorage.removeItem('conference_registration');
      }
    } catch (error) {
      console.error("Error retrieving registration data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Handle email confirmation
  const { sendingEmail, sendConfirmationEmail } = useEmailConfirmation(
    registrationData,
    () => console.log("Email confirmation sent successfully")
  );
  
  // Send confirmation email when registration data is loaded
  useEffect(() => {
    if (registrationData && !sendingEmail) {
      sendConfirmationEmail();
    }
  }, [registrationData, sendingEmail, sendConfirmationEmail]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#274675]/10 to-white">
      <Navigation forceDarkMode={true} />
      <div className="flex-grow pt-20 px-4 md:px-8 flex items-center justify-center">
        <motion.div 
          className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-raade-navy mb-2 font-simula">Registration Complete!</h1>
            <p className="text-lg text-gray-600 font-lora">
              Thank you for registering for the RAADE African Development Forum 2025.
            </p>
          </div>
          
          {registrationData && (
            <div className="mb-6 bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2 font-simula">Registration Details</h2>
              <p><strong>Name:</strong> {registrationData.fullName}</p>
              <p><strong>Email:</strong> {registrationData.email}</p>
              <p><strong>Ticket Type:</strong> {registrationData.ticketType.charAt(0).toUpperCase() + registrationData.ticketType.slice(1)}</p>
              {registrationData.groupSize && registrationData.ticketType === 'group' && (
                <p><strong>Group Size:</strong> {registrationData.groupSize}</p>
              )}
            </div>
          )}
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-700">
              {sendingEmail ? (
                "Sending confirmation email..."
              ) : (
                "A confirmation email has been sent to your email address with additional details."
              )}
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate("/conference")}
              className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
            >
              Return to Conference Page <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
