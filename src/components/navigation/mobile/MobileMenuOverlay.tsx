
import React from "react";
import { navItems, mobileFooterItems } from "../navConfig";
import { useMobileMenuScroll } from "@/hooks/navigation/useMobileMenuScroll";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import MobileMenuHeader from "./MobileMenuHeader";
import MobileMenuContent from "./MobileMenuContent";
import MobileMenuFooter from "./MobileMenuFooter";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenuOverlay Component
 * 
 * Provides a full-screen mobile menu overlay with:
 * - Clean white background for better readability
 * - Expandable navigation sections
 * - Smooth animations and transitions
 * - Proper scroll locking behavior
 * 
 * This component has been refactored into smaller pieces:
 * - MobileMenuHeader: Logo and close button
 * - MobileMenuContent: Main navigation links
 * - MobileMenuFooter: CTA and copyright
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
    <div 
      className="fixed top-0 left-0 w-[100vw] h-[100vh] min-h-screen min-w-full m-0 p-0 bg-gradient-to-b from-[#F5F5F0] to-[#EAEAE5] z-[9999] flex flex-col"
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
      role="dialog"
      aria-modal="true"
    >
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
  );
};

export default MobileMenuOverlay;
