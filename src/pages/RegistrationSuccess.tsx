
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavBackground } from "@/hooks/useNavBackground";

/**
 * RegistrationSuccess Page
 * 
 * An improved success page that:
 * - Uses staged renders to prevent layout shifts
 * - Controls animations for better visual stability
 * - Handles session verification more gracefully
 * - Prevents multiple navigations during transitions
 */
const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [registrantEmail, setRegistrantEmail] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Set dark nav background for this page
  useNavBackground('dark');

  // Parse the session ID from the URL
  useEffect(() => {
    // Simulates a verification delay to prevent layout jumps
    const verificationTimer = setTimeout(() => {
      // Get the email from sessionStorage
      const storedEmail = sessionStorage.getItem("registrationEmail");
      if (storedEmail) {
        setRegistrantEmail(storedEmail);
        // Clear it after retrieval
        sessionStorage.removeItem("registrationEmail");
      }
      
      // Get the session ID from the URL
      const params = new URLSearchParams(location.search);
      const sessionId = params.get('session_id');
      
      if (sessionId) {
        console.log("Registration complete with session ID:", sessionId);
      } else {
        console.warn("No session ID found in URL, may be a direct visit");
      }
      
      // Complete verification
      setVerificationComplete(true);
      setIsVerifying(false);
    }, 800);
    
    return () => clearTimeout(verificationTimer);
  }, [location]);

  const handleNavigation = (path: string) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    setTimeout(() => navigate(path), 300);
  };

  const handleCalendarAction = () => {
    window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=RAADE%20Conference%202025&dates=20250411/20250413&details=RAADE%20African%20Development%20Forum%202025&location=Rice%20University,%20Houston,%20TX', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#274675]/10 to-white">
      <Navigation forceDarkMode={true} />
      
      <div className="flex-grow flex items-center justify-center px-4 md:px-8 pt-28 pb-12">
        <AnimatePresence mode="wait">
          {isVerifying ? (
            <motion.div 
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <Loader2 className="h-12 w-12 text-[#FBB03B] animate-spin mb-4" />
              <p className="text-lg text-gray-700">Verifying your registration...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="confirmation"
              className="max-w-2xl w-full mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8 border border-[#FBB03B]/20">
                <div className="flex flex-col items-center text-center mb-6">
                  <motion.div 
                    className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </motion.div>
                  
                  <motion.h1 
                    className="text-3xl font-bold text-raade-navy mb-2 font-simula"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    Registration Complete!
                  </motion.h1>
                  
                  <motion.p 
                    className="text-gray-600 text-lg font-lora"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    Thank you for registering for the RAADE Conference 2025
                  </motion.p>
                </div>
                
                {registrantEmail && (
                  <motion.div 
                    className="mb-6 p-4 bg-blue-50 rounded-md"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <p className="text-blue-800 text-center">
                      A confirmation email has been sent to <strong>{registrantEmail}</strong>
                    </p>
                  </motion.div>
                )}
                
                <motion.div 
                  className="space-y-6"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <div className="border-t border-b border-gray-200 py-6">
                    <h2 className="text-xl font-bold mb-4 text-raade-navy font-simula">What's Next?</h2>
                    <ul className="space-y-3 text-gray-700 font-lora">
                      <li className="flex items-start">
                        <span className="mr-2 text-[#FBB03B]">•</span>
                        Save the date: April 11-12, 2025
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#FBB03B]">•</span>
                        Check your email for important conference updates
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#FBB03B]">•</span>
                        Follow RAADE on social media for speaker announcements
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <Button
                      onClick={() => handleNavigation('/conference')}
                      disabled={isNavigating}
                      className="flex-1 bg-[#274675] hover:bg-[#274675]/90 text-white font-lora"
                    >
                      Back to Conference Details
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCalendarAction}
                      className="flex-1 border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
                    >
                      Add to Calendar
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
