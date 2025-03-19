
import { cn } from "@/lib/utils";
import NavLogo from "../NavLogo";
import DesktopNav from "../DesktopNav";
import MobileNav from "../mobile/MobileNav";
import CountdownTimer from "@/components/CountdownTimer";
import NoiseTexture from "@/components/ui/NoiseTexture";
import { useNavigation } from "../context/useNavigation";
import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

interface NavigationContentProps {
  instanceId: string;
}

/**
 * NavigationContent Component - Core rendering component for navigation elements
 * 
 * Handles the actual visual rendering of navigation elements using shared state
 * Features enhanced glassmorphism styling with subtle noise texture for depth
 * 
 * @param instanceId - Unique identifier for this navigation instance (for debugging)
 */
const NavigationContent = ({ instanceId }: NavigationContentProps) => {
  const { state } = useNavigation();
  const { 
    isScrolled, 
    isVisible, 
    isDarkBackground, 
    isLightBackground,
    isMobile, 
    isTablet, 
    isHeroPage, 
    useShortFormLogo,
    forceDarkMode
  } = state;
  
  const location = useLocation();
  const isConferenceRegistrationPage = location.pathname === '/conference/register';
  
  // Get responsive padding values
  const getPadding = () => {
    if (isMobile) return "px-4";
    if (isTablet) return "px-6";
    return "px-8";
  };

  // Ensure the nav background is available for scroll detection
  useEffect(() => {
    console.log(`NavigationContent (${instanceId}): Initializing with background state:`, 
      { isScrolled, isVisible, isDarkBackground, isLightBackground, forceDarkMode });
    
    // Handle special pages
    if (isHeroPage) {
      // Set initial background to light (for dark hero backgrounds)
      document.body.setAttribute('data-nav-background', 'light');
      console.log(`NavigationContent (${instanceId}): Set nav background to light for hero page`);
    }
    
    // Force dark background for conference registration page
    if (isConferenceRegistrationPage || forceDarkMode) {
      document.body.setAttribute('data-nav-background', 'dark');
      console.log(`NavigationContent (${instanceId}): Forcing dark background for navbar due to page type or prop`);
    }
    
    return () => {
      // Clean up only if we set it in this component
      if (isHeroPage || isConferenceRegistrationPage || forceDarkMode) {
        document.body.removeAttribute('data-nav-background');
        console.log(`NavigationContent (${instanceId}): Cleaned up nav background attribute`);
      }
    };
  }, [
    isHeroPage, 
    instanceId, 
    isScrolled, 
    isVisible, 
    isDarkBackground, 
    isLightBackground, 
    forceDarkMode,
    isConferenceRegistrationPage
  ]);

  // Determine the actual background state considering all factors
  const effectiveLightBackground = 
    forceDarkMode || isConferenceRegistrationPage ? false : isLightBackground;

  return (
    <nav
      className={cn(
        "fixed w-full z-[100] transition-all duration-300 pointer-events-auto pt-2 sm:pt-3 md:pt-4 isolate", 
        getBackgroundClass(isScrolled, isLightBackground, isConferenceRegistrationPage, forceDarkMode),
        isVisible 
          ? "translate-y-0" 
          : "-translate-y-full"
      )}
      data-nav-instance={instanceId}
      data-scrolled={isScrolled ? "true" : "false"}
      data-visible={isVisible ? "true" : "false"}
      data-background={effectiveLightBackground ? "light" : "dark"}
      data-forced-dark={forceDarkMode ? "true" : "false"}
    >
      {/* Noise texture overlay for enhanced depth */}
      {isScrolled && (
        <NoiseTexture 
          opacity={effectiveLightBackground ? 0.03 : 0.07} 
          blendMode={effectiveLightBackground ? "multiply" : "soft-light"}
          scale={150}
        />
      )}
      
      <div className={`max-w-7xl mx-auto ${getPadding()}`}>
        <div className="flex justify-between items-center">
          <NavLogo 
            isScrolled={isScrolled} 
            isHeroPage={isHeroPage} 
            forceDarkMode={effectiveLightBackground}
            useShortForm={useShortFormLogo}
          />
          
          <div className="flex items-center">
            <div className="hidden md:block mr-6">
              <CountdownTimer 
                variant="nav" 
                colorScheme={isDarkBackground ? "light" : "dark"} 
              />
            </div>
            
            <DesktopNav 
              isScrolled={isScrolled} 
              isHeroPage={isHeroPage} 
              forceDarkMode={effectiveLightBackground} 
            />
            
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

/**
 * Helper function to determine navbar background styling based on state
 */
const getBackgroundClass = (
  isScrolled: boolean, 
  isLightBackground: boolean,
  isConferenceRegistrationPage: boolean,
  forceDarkMode: boolean
): string => {
  // Apply enhanced glassmorphism effect with proper light/dark handling when scrolled
  if (isScrolled) {
    // For conference registration, always use dark background
    if (isConferenceRegistrationPage || forceDarkMode) {
      return "bg-[#274675]/80 backdrop-blur-md border-b border-[#274675]/30 shadow-md";
    }
    
    return isLightBackground 
      ? "bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm" 
      : "bg-[#274675]/80 backdrop-blur-md border-b border-[#274675]/30 shadow-md";
  }
  
  // Transparent when at top
  return "bg-transparent";
};

export default NavigationContent;
