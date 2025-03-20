
import React from "react";
import { motion } from "framer-motion";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { useLocation, useNavigate } from "react-router-dom";

interface MobileNavFooterProps {
  onLinkClick: () => void;
}

/**
 * MobileNavFooter Component
 * 
 * Renders the footer section of the mobile menu with:
 * - Gold CTA button with hover effects (maintaining gold color)
 * - Fade-in animations for smooth appearance
 * - Responsive padding for better touch targets
 * - Consistent navigation to the join section using build-with-us ID
 * - Uses the same navigation logic as JoinButton component
 * 
 * @param onLinkClick - Function to call when a link is clicked
 */
const MobileNavFooter = ({ onLinkClick }: MobileNavFooterProps) => {
  const { handleNavigation } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation to join section consistently with JoinButton component
  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Close mobile menu
    onLinkClick();
    
    console.log("MobileNavFooter: Navigating to join section, current path:", location.pathname);
    
    // If we're not on the home page, navigate to home and then scroll
    if (location.pathname !== '/') {
      console.log("MobileNavFooter: Not on homepage, navigating with state");
      navigate('/', { state: { scrollToSection: "build-with-us" } });
    } else {
      // If we're already on home page, just scroll to the section
      console.log("MobileNavFooter: On homepage, scrolling directly");
      const joinSection = document.getElementById('build-with-us');
      if (joinSection) {
        joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn("MobileNavFooter: Could not find 'build-with-us' section element");
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Main CTA Button explicitly linking to join section */}
      <motion.div 
        className="p-5"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.a
          href="/#build-with-us"
          className="block w-full py-3.5 px-6 bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-[#274675] text-center rounded-md font-alegreyasans font-bold text-lg transition-colors shadow-md hover:shadow-lg"
          onClick={handleJoinClick}
          whileHover={{ y: -2 }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          Join Us
        </motion.a>
      </motion.div>
      
      {/* Copyright or other info */}
      <motion.div 
        className="border-t border-white/10 p-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-sm text-white/80 font-alegreyasans">
          &copy; {new Date().getFullYear()} RAADE. All rights reserved.
        </p>
        <p className="text-xs text-white/60 mt-1 font-alegreyasans">
          Rice Association for African Development
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MobileNavFooter;
