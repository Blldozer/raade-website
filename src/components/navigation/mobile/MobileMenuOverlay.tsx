
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileNavLinks from "./MobileNavLinks";
import MobileNavHeader from "./MobileNavHeader";
import MobileNavFooter from "./MobileNavFooter";
import { useMobileMenuScroll } from "@/hooks/navigation/useMobileMenuScroll";
import { NavItem } from "../navConfig";
import NoiseTexture from "@/components/ui/NoiseTexture";

// Import the navigation config to get the navigation items
import navConfig from "@/components/navigation/navConfig";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenuOverlay Component
 * 
 * Full-screen mobile menu overlay with:
 * - Enhanced glassmorphism styling with subtle noise texture
 * - Smooth entrance/exit animations
 * - Lock body scroll when open
 * - Organized header, navigation links, and footer sections
 * 
 * @param isOpen - Whether the menu is currently open
 * @param onClose - Function to call to close the menu
 */
const MobileMenuOverlay = ({ isOpen, onClose }: MobileMenuOverlayProps) => {
  const { contentRef } = useMobileMenuScroll(isOpen);
  
  // Get navigation items from navConfig
  // Separate primary navigation items from footer items
  const mainNavItems = navConfig.mainNavItems;
  const footerNavItems = navConfig.footerNavItems || [];
  
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[110] overflow-hidden"
        >
          {/* Backdrop with enhanced glassmorphism effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Menu content with enhanced glassmorphism styling */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full sm:max-w-[400px] 
                      bg-white/90 backdrop-blur-md shadow-xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Add subtle noise texture for depth */}
            <NoiseTexture opacity={0.04} blendMode="multiply" />
            
            <MobileNavHeader onClose={onClose} />
            
            {/* Scrollable content area */}
            <div 
              className="flex-1 overflow-y-auto py-4 px-6" 
              ref={contentRef}
            >
              <MobileNavLinks 
                items={mainNavItems} 
                footerItems={footerNavItems}
                onLinkClick={onClose} 
              />
            </div>
            
            <MobileNavFooter onLinkClick={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuOverlay;
