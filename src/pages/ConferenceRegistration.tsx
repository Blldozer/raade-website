
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ConferenceRegistrationForm from "@/components/conference/ConferenceRegistrationForm";
import { useNavBackground } from "@/hooks/useNavBackground";

/**
 * Conference Registration Page
 * 
 * This page displays the registration form for conference attendees.
 * Uses a dark navbar for proper contrast against the light gradient background.
 * The forceDarkMode prop is set to true to ensure proper text contrast.
 */
const ConferenceRegistration = () => {
  const navigate = useNavigate();
  
  // Initialize navigation background control
  // Setting to 'dark' to ensure proper navbar styling on this page
  useNavBackground('dark');
  
  // Added console.log to debug rendering
  console.log("Rendering ConferenceRegistration page");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set navigation background to dark explicitly for this page
    // This ensures the navbar will have light text for proper contrast
    document.body.setAttribute('data-nav-background', 'dark');
    
    // Cleanup function to reset attribute when component unmounts
    return () => {
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#274675]/10 to-white">
      {/* Force dark mode for the navbar to ensure proper contrast */}
      <Navigation forceDarkMode={true} />
      <div className="flex-grow pt-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto py-12">
          <button onClick={() => navigate("/conference")} className="flex items-center text-black hover:text-black/70 mb-6 transition-colors duration-300 font-lora">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Conference
          </button>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <h1 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Conference Registration</h1>
            <p className="text-lg text-gray-600 mb-8 font-lora">Register for the RAADE African Development Forum 2025, taking place on April 11-12. Early bird registration is now open!</p>
            
            <ConferenceRegistrationForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceRegistration;
