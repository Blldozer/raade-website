
import { cn } from "@/lib/utils";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./mobile/MobileNav";
import CountdownTimer from "../CountdownTimer";
import { NavigationProvider, useNavigation } from "./context/NavigationContext";

interface NavigationContainerProps {
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  useShortFormLogo?: boolean;
}

/**
 * NavigationContainer Component - Main container for navigation components
 * 
 * Delegates rendering to specialized components while providing
 * a shared context for navigation state management
 */
const NavigationContainer = ({ 
  isHeroPage = false, 
  forceDarkMode = false,
  useShortFormLogo = false 
}: NavigationContainerProps) => {
  return (
    <NavigationProvider initialProps={{ isHeroPage, forceDarkMode, useShortFormLogo }}>
      <NavigationContent />
    </NavigationProvider>
  );
};

/**
 * NavigationContent Component - Internal component that consumes the navigation context
 * 
 * Handles the actual rendering of navigation elements using shared state
 */
const NavigationContent = () => {
  const { state } = useNavigation();
  const { isScrolled, isVisible, isDarkBackground, isMobile, isTablet, isHeroPage, useShortFormLogo } = state;
  
  // Get responsive padding values
  const getPadding = () => {
    if (isMobile) return "px-4";
    if (isTablet) return "px-6";
    return "px-8";
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-[100] transition-all duration-300 pointer-events-auto pt-2 sm:pt-3 md:pt-4 isolate", 
        isScrolled
          ? "bg-white/5 backdrop-blur-[2px] shadow-md"
          : "bg-transparent",
        isVisible 
          ? "translate-y-0" 
          : "-translate-y-full"
      )}
    >
      <div className={`max-w-7xl mx-auto ${getPadding()}`}>
        <div className="flex justify-between items-center">
          <NavLogo 
            isScrolled={isScrolled} 
            isHeroPage={isHeroPage} 
            forceDarkMode={!isDarkBackground}
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
              forceDarkMode={!isDarkBackground} 
            />
            <MobileNav 
              isScrolled={isScrolled} 
              isHeroPage={isHeroPage} 
              forceDarkMode={!isDarkBackground} 
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationContainer;
