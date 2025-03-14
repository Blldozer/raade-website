
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MobileNavHeader from "./MobileNavHeader";
import MobileNavLinks from "./MobileNavLinks";
import MobileNavFooter from "./MobileNavFooter";
import { navItems, mobileFooterItems } from "../navConfig";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenuOverlay Component
 * 
 * Full-screen mobile navigation overlay that displays:
 * - Header with logo and close button
 * - Navigation links with dropdown functionality
 * - Footer with CTA button
 * 
 * Handles body scroll locking and navigation state
 * 
 * @param isOpen - Whether the menu is currently open
 * @param onClose - Function to call when closing the menu
 */
const MobileMenuOverlay = ({ isOpen, onClose }: MobileMenuOverlayProps) => {
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname, isOpen, onClose]);

  // Handle body overflow to prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position when component unmounts or effect reruns
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#274675] z-[9999] flex flex-col h-[100dvh] w-screen animate-in fade-in slide-in-from-right duration-300"
      role="dialog"
      aria-modal="true"
    >
      <MobileNavHeader onClose={onClose} />
      <MobileNavLinks 
        items={navItems} 
        footerItems={mobileFooterItems} 
        onLinkClick={onClose} 
      />
      <MobileNavFooter onLinkClick={onClose} />
    </div>
  );
};

export default MobileMenuOverlay;
