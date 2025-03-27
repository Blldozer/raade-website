
import { cn } from "@/lib/utils";
import NavLogo from "../NavLogo";
import DesktopNav from "../DesktopNav";
import MobileNav from "../mobile/MobileNav";
import CountdownTimer from "@/components/CountdownTimer";
import { useNavigation } from "../context/useNavigation";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavBackgroundStyle } from "@/hooks/navigation/useNavBackgroundStyle";

interface NavigationContentProps {
  instanceId?: string;
}

/**
 * NavigationContent component - The actual rendering of navigation UI
 * 
 * Handles:
 * - Conditional rendering based on device size (mobile vs desktop)
 * - Styling based on scroll position and background
 * - Special page-specific overrides
 * - Instance tracking to prevent duplicates
 */
const NavigationContent = ({ instanceId = 'nav-default' }: NavigationContentProps) => {
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
  
  // Get styling from our extracted hook
  const { 
    backgroundClass, 
    isConferenceRegistrationPage,
    isConferencePage,
    isStudioPage,
    effectiveLightBackground,
    isAgainstDarkBackground
  } = useNavBackgroundStyle();
  
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
    
    // Force dark background for conference registration page or studios page
    if (isConferenceRegistrationPage || isConferencePage || isStudioPage || forceDarkMode) {
      document.body.setAttribute('data-nav-background', 'dark');
      console.log(`NavigationContent (${instanceId}): Forcing dark background for navbar due to page type or prop`);
    }
    
    return () => {
      // Clean up only if we set it in this component
      if (isHeroPage || isConferenceRegistrationPage || isConferencePage || isStudioPage || forceDarkMode) {
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
    isConferenceRegistrationPage,
    isConferencePage,
    isStudioPage
  ]);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${backgroundClass}`}
      data-is-scrolled={isScrolled ? "true" : "false"}
      data-light-background={isLightBackground ? "true" : "false"}
      data-force-dark={forceDarkMode ? "true" : "false"}
      data-nav-instance={instanceId}
      data-conference-page={isConferencePage ? "true" : "false"}
      data-registration-page={isConferenceRegistrationPage ? "true" : "false"}
      data-studio-page={isStudioPage ? "true" : "false"}
      data-page-path={location.pathname}
    >
      <div className={`max-w-7xl mx-auto ${getPadding()}`}>
        <div className="flex justify-between items-center">
          <NavLogo 
            isScrolled={isScrolled} 
            isHeroPage={isHeroPage} 
            forceDarkMode={!effectiveLightBackground} 
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
              forceDarkMode={!effectiveLightBackground} 
            />
            
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationContent;
