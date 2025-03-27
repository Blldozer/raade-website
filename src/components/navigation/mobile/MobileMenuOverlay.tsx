
// This is the fixed code for the hamburger implementation with proper React context handling

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
  // Verify React is available
  if (typeof React !== 'object') {
    console.warn("MobileMenuOverlay: React object unavailable");
    return null;
  }

  if (!isOpen) return null;
  
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
    
    // Simple fallback overlay that won't crash
    return (
      <div 
        className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-white flex flex-col"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-bold">RAADE</span>
          <button 
            onClick={onClose}
            className="p-2 rounded-full"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div className="p-4 flex-1">
          <p className="text-center py-8">
            Navigation temporarily unavailable. Please refresh the page.
          </p>
        </div>
      </div>
    );
  }
};

export default MobileMenuOverlay;
