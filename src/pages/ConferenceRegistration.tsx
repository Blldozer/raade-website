
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ConferenceRegistrationForm from "@/components/conference/ConferenceRegistrationForm";
import StripeStatusCheck from "@/components/conference/payment/StripeStatusCheck";
import { useNavBackground } from "@/hooks/useNavBackground";
import SaleCountdown from "@/components/conference/SaleCountdown";
import { isSaleActive } from "@/components/conference/RegistrationFormTypes";
import { toast } from "@/hooks/use-toast";

/**
 * Conference Registration Page
 * 
 * This page displays the registration form for conference attendees.
 * Features:
 * - Enhanced error prevention with clear user feedback
 * - Dark mode support with proper color inversion
 * - Mobile responsive design 
 * - Uses a dark navbar for proper contrast
 * - Smooth animations for an engaging UI
 * - Enhanced session cleanup to prevent registration issues
 * - Added countdown timer for registration closing
 * - Improved visual hierarchy and clarity
 */
const ConferenceRegistration = () => {
  const navigate = useNavigate();
  
  // Initialize navigation background control
  // Setting to 'dark' to ensure proper navbar styling on this page
  useNavBackground('dark');
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set navigation background to dark explicitly for this page
    // This ensures the navbar will have light text for proper contrast
    document.body.setAttribute('data-nav-background', 'dark');
    
    // Add class to handle dark mode properly 
    document.documentElement.classList.add('conference-registration-page');
    
    // Clear any stale session data
    const sessionId = sessionStorage.getItem("checkoutSessionId");
    if (sessionId && window.location.pathname.includes("/register")) {
      console.log("Found stale checkout session on registration page, clearing");
      sessionStorage.removeItem("checkoutSessionId");
      sessionStorage.removeItem("registrationEmail");
      
      // Add a toast message to inform the user their previous session was cleared
      toast({
        title: "Previous session cleared",
        description: "Your previous registration session has been cleared. You can start fresh.",
        variant: "default",
      });
    }
    
    // Display a warning if user has already registered
    const registeredEmail = localStorage.getItem("conference_registered_email");
    if (registeredEmail) {
      toast({
        title: "You've already registered",
        description: `It looks like you've already registered with ${registeredEmail}. Each person can only register once.`,
        variant: "warning",
        duration: 8000,
      });
    }
    
    // Cleanup function to reset attribute when component unmounts
    return () => {
      document.body.removeAttribute('data-nav-background');
      document.documentElement.classList.remove('conference-registration-page');
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#274675]/10 to-white dark:from-[#274675]/30 dark:to-gray-900">
      {/* Force dark mode for the navbar to ensure proper contrast */}
      <Navigation forceDarkMode={true} />
      <div className="flex-grow pt-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto py-12">
          <button onClick={() => navigate("/conference")} className="flex items-center text-black hover:text-black/70 mb-6 transition-colors duration-300 font-lora dark:text-white dark:hover:text-white/70">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Conference
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="dark:text-white"
          >
            {/* Always show the countdown regardless of sale status */}
            <div className="mb-6">
              <SaleCountdown />
            </div>
            
            <h1 className="text-4xl font-bold text-raade-navy mb-4 font-simula dark:text-white">Conference Registration</h1>
            <p className="text-lg text-gray-600 mb-2 font-lora dark:text-gray-300">
              Register for the RAADE African Development Forum 2025, taking place on April 11-12.
            </p>
            <p className="text-red-600 font-medium mb-6">Registration closes tonight at 11:59 PM. Don't miss out!</p>
            
            {/* Add the Stripe status check component */}
            <div className="mb-6">
              <StripeStatusCheck />
            </div>
            
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6 dark:bg-yellow-900/30 dark:border-yellow-800">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-1">Important Note</h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                Each email address can only be used for one registration. If you've already registered, please use a different email or contact us for assistance.
              </p>
            </div>
            
            <ConferenceRegistrationForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceRegistration;
