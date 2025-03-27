
// This is the right code for the hamburger implementation
import React from "react";
import navConfig from "../navConfig";
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
 * - Enhanced with React context error handling
 * 
 * @param isOpen - Whether the menu is currently open
 * @param onClose - Callback to close the menu
 */
const MobileMenuOverlay = ({ isOpen, onClose }: MobileMenuOverlayProps) => {
  try {
    // Try to get navigation context
    // If this fails, we'll use a fallback
    let handleNavigation = (href: string) => {
      onClose();
      window.location.href = href;
    };
    
    try {
      const navigation = useNavigation();
      handleNavigation = (href: string) => {
        onClose();
        navigation.handleNavigation(href);
      };
    } catch (error) {
      console.warn("MobileMenuOverlay: Navigation context unavailable, using fallback navigation");
    }
    
    // Lock body scroll when menu is open - also handle errors
    try {
      useMobileMenuScroll(isOpen);
    } catch (error) {
      console.warn("MobileMenuOverlay: Error with scroll locking", error);
    }

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
            navItems={navConfig.mainNavItems}
            footerItems={navConfig.footerNavItems}
            onNavigation={handleNavigation}
          />
          
          {/* Footer with CTA and copyright */}
          <MobileMenuFooter onLinkClick={() => onClose()} />
        </div>
      </motion.div>
    );
  } catch (error) {
    // Fallback when React context is missing
    console.error("MobileMenuOverlay: React context error", error);
    
    // Return null to prevent rendering and crashing when there's a context error
    return null;
  }
};

export default MobileMenuOverlay;
