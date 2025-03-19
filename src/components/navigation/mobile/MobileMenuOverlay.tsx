
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileNavLinks from "./MobileNavLinks";
import MobileNavHeader from "./MobileNavHeader";
import MobileNavFooter from "./MobileNavFooter";
import { useMobileMenuScroll } from "@/hooks/navigation/useMobileMenuScroll";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenuOverlay Component
 * 
 * Full-screen mobile menu overlay with:
 * - Glassmorphism styling for a modern look
 * - Smooth entrance/exit animations
 * - Lock body scroll when open
 * - Organized header, navigation links, and footer sections
 * 
 * @param isOpen - Whether the menu is currently open
 * @param onClose - Function to call to close the menu
 */
const MobileMenuOverlay = ({ isOpen, onClose }: MobileMenuOverlayProps) => {
  const { contentRef } = useMobileMenuScroll(isOpen);
  
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
          {/* Backdrop with glassmorphism effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Menu content with glassmorphism styling */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full sm:max-w-[400px] 
                      bg-white/90 backdrop-blur-md shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <MobileNavHeader onClose={onClose} />
            
            {/* Scrollable content area */}
            <div 
              className="flex-1 overflow-y-auto py-4 px-6" 
              ref={contentRef}
            >
              <MobileNavLinks onLinkClick={onClose} />
            </div>
            
            <MobileNavFooter onLinkClick={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuOverlay;
