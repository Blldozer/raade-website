
import React from "react";
import { navItems, mobileFooterItems } from "../navConfig";
import { useMobileMenuScroll } from "@/hooks/navigation/useMobileMenuScroll";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import MobileMenuHeader from "./MobileMenuHeader";
import MobileMenuContent from "./MobileMenuContent";
import MobileMenuFooter from "./MobileMenuFooter";
import { motion } from "framer-motion";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenuOverlay Component
 * 
 * Provides a full-screen mobile menu overlay with:
 * - Smooth entrance and exit animations
 * - Subtle background patterns and gradient
 * - Clean white backdrop for better readability
 * - Proper event handling and navigation
 * 
 * @param isOpen - Whether the menu is currently open
 * @param onClose - Callback to close the menu
 */
const MobileMenuOverlay = ({ isOpen, onClose }: MobileMenuOverlayProps) => {
  const { handleNavigation } = useNavigation();
  
  // Lock body scroll when menu is open
  useMobileMenuScroll(isOpen);
  
  // Helper function to handle clicks that need to stop propagation and close the menu
  const handleCloseWithStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };
  
  // Handle navigation and close the menu
  const handleMenuNavigation = (href: string) => {
    onClose();
    handleNavigation(href);
  };

  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed top-0 left-0 w-[100vw] h-[100vh] min-h-screen min-w-full m-0 p-0 z-[9999] flex flex-col overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
    >
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F0] to-[#EAEAE5] z-0">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `radial-gradient(#274675 0.5px, transparent 0.5px)`,
          backgroundSize: '15px 15px' 
        }}></div>
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with logo and close button */}
        <MobileMenuHeader onClose={handleCloseWithStopPropagation} />
        
        {/* Main navigation content with dropdowns */}
        <MobileMenuContent 
          navItems={navItems}
          footerItems={mobileFooterItems}
          onNavigation={handleMenuNavigation}
        />
        
        {/* Footer with CTA and copyright */}
        <MobileMenuFooter onNavigation={handleMenuNavigation} />
      </div>
    </motion.div>
  );
};

export default MobileMenuOverlay;
