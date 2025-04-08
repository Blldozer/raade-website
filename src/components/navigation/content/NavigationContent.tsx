
import React, { useEffect } from "react";
import { useNavigationBackground } from "../hooks/useNavigationBackground";
import { useNavigation } from "../context/useNavigation";
import DesktopNav from "../DesktopNav";
import MobileNav from "../mobile/MobileNav";

interface NavigationContentProps {
  children: React.ReactNode;
}

/**
 * NavigationContent Component
 * 
 * Renders the appropriate navigation UI based on:
 * - Current device (mobile/desktop)
 * - Current page context
 * - Scroll position
 * 
 * Also applies background detection for dynamic styling.
 */
const NavigationContent: React.FC<NavigationContentProps> = ({ children }) => {
  const { state } = useNavigation();
  
  // Initialize background detection and scroll awareness
  useNavigationBackground();
  
  // Safely access state properties with defaults in case they're undefined
  const isVisible = state.isVisible !== undefined ? state.isVisible : true;
  const isMobile = state.isMobile || false;
  const isTablet = state.isTablet || false;

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <div className={`hidden md:block ${!isVisible ? "invisible" : ""}`}>
        <DesktopNav />
      </div>

      {/* Mobile Navigation - Only shown on mobile */}
      <div className={`block md:hidden ${!isVisible ? "invisible" : ""}`}>
        <MobileNav />
      </div>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </>
  );
};

export default NavigationContent;
