
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

/**
 * DonationSuccess Component
 * 
 * Displays a success message after a user completes a donation
 * Shows confirmation details and allows navigation back to main site
 */
const DonationSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    
    // If no session ID is provided, redirect back to conference page
    if (!sessionId) {
      navigate("/conference");
      return;
    }
    
    // Set success state
    setSuccess(true);
    setLoading(false);
    
    // Set title
    document.title = "Thank You for Your Donation | RAADE";
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [navigate, searchParams]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#274675]"></div>
      </div>
    );
  }
  
  return (
    <>
      <Navigation forceDarkMode={false} />
      <div className="min-h-screen pt-[var(--navbar-height)] bg-gradient-to-b from-[#EFF6FF] to-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 border border-gray-100"
          >
            {success ? (
              <>
                <div className="flex flex-col items-center justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
                  >
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </motion.div>
                  <h1 className="text-3xl font-simula text-center text-gray-800 mb-2">Thank You for Your Donation!</h1>
                  <p className="text-gray-600 text-center font-lora">
                    Your generous contribution will help us make a difference in African development.
                  </p>
                </div>
                
                <div className="bg-[#274675]/5 p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-semibold mb-4 font-lora text-[#274675]">What Your Support Enables:</h2>
                  <ul className="space-y-3">
                    {[
                      "Connecting more student innovators with African partners",
                      "Developing prototypes for promising solutions",
                      "Supporting implementation and scaling of successful projects",
                      "Providing educational resources and opportunities"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                        className="flex items-start"
                      >
                        <span className="bg-[#FBB03B]/20 p-1 rounded-full mr-2 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FBB03B]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="font-lora text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center space-y-4">
                  <p className="text-gray-600 font-lora">
                    You will receive a receipt at the email address you provided.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      onClick={() => navigate("/conference")}
                      className="bg-[#274675] hover:bg-[#274675]/90 font-lora"
                    >
                      Return to Conference
                    </Button>
                    <Button
                      onClick={() => navigate("/")}
                      variant="outline"
                      className="border-[#274675] text-[#274675] hover:bg-[#274675]/10 font-lora"
                    >
                      Go to Homepage
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
                <p className="mb-6">We couldn't verify your donation. Please contact us if you believe this is an error.</p>
                <Button
                  onClick={() => navigate("/conference")}
                  className="bg-[#274675] hover:bg-[#274675]/90"
                >
                  Return to Conference
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DonationSuccess;
