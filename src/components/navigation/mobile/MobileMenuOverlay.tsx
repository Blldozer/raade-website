// This is the right code for the hamburger implementation
import React from "react";
import { navItems, mobileFooterItems } from "../navConfig";
import { useMobileMenuScroll } from "@/hooks/navigation/useMobileMenuScroll";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import MobileMenuHeader from "./MobileMenuHeader";
import MobileMenuContent from "./MobileMenuContent";
import MobileMenuFooter from "./MobileMenuFooter";
import MobileMenuBackground from "./MobileMenuBackground";
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
 * - Proper layout organization with specialized child components
 * - Proper event handling and navigation
 * 
 * @param isOpen - Whether the menu is currently open
 * @param onClose - Callback to close the menu
 */
const MobileMenuOverlay = ({ isOpen, onClose }: MobileMenuOverlayProps) => {
  const { handleNavigation } = useNavigation();
  
  // Lock body scroll when menu is open
  useMobileMenuScroll(isOpen);
  
  // Handle navigation and close the menu
  const handleMenuNavigation = (href: string) => {
    onClose();
    handleNavigation(href);
  };

  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed top-0 left-0 w-screen h-screen min-h-screen min-w-full m-0 p-0 z-[9999] flex flex-col overflow-auto"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
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
      <MobileMenuBackground />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with logo and close button */}
        <MobileMenuHeader onClose={onClose} />
        
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
