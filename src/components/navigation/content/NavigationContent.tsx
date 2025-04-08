
import { cn } from "@/lib/utils";
import NavLogo from "../NavLogo";
import DesktopNav from "../DesktopNav";
import MobileNav from "../mobile/MobileNav";
import CountdownTimer from "@/components/CountdownTimer";
import { useNavigation } from "../context/useNavigation";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
 * - Error handling for context issues
 */
const NavigationContent = ({ instanceId = 'nav-default' }: NavigationContentProps) => {
  // Initialize state to handle potential errors
  const [hasError, setHasError] = useState(false);
  
  try {
    const navigationContext = useNavigation();
    const { state } = navigationContext;
    
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
    
    let locationPath = '/';
    
    try {
      const location = useLocation();
      locationPath = location.pathname;
    } catch (error) {
      console.warn("NavigationContent: Router context not available");
    }
    
    // Get styling from our extracted hook
    let backgroundStyleData = {
      backgroundClass: '', 
      isConferenceRegistrationPage: false,
      isConferencePage: false,
      isStudioPage: false,
      effectiveLightBackground: true,
      isAgainstDarkBackground: false
    };
    
    try {
      backgroundStyleData = useNavBackgroundStyle();
    } catch (error) {
      console.warn("NavigationContent: Background style hook failed", error);
      // Use safe default background
      backgroundStyleData.backgroundClass = 'bg-white/90 backdrop-blur-sm border-b border-gray-200';
    }
    
    const { 
      backgroundClass, 
      isConferenceRegistrationPage,
      isConferencePage,
      isStudioPage,
      effectiveLightBackground,
      isAgainstDarkBackground
    } = backgroundStyleData;
    
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${backgroundClass}`}
        data-is-scrolled={isScrolled ? "true" : "false"}
        data-light-background={isLightBackground ? "true" : "false"}
        data-force-dark={forceDarkMode ? "true" : "false"}
        data-nav-instance={instanceId}
        data-conference-page={isConferencePage ? "true" : "false"}
        data-registration-page={isConferenceRegistrationPage ? "true" : "false"}
        data-studio-page={isStudioPage ? "true" : "false"}
        data-page-path={locationPath}
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
  } catch (error) {
    console.error(`NavigationContent (${instanceId}): Error rendering`, error);
    setHasError(true);
    
    // Return a minimal fallback navigation
    return (
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="font-bold">RAADE</div>
          <div className="text-sm">Menu</div>
        </div>
      </nav>
    );
  }
};

export default NavigationContent;
