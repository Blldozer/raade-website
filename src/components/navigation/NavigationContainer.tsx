
import { useState, useEffect, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./mobile/MobileNav";
import CountdownTimer from "../CountdownTimer";
import { useResponsive } from "@/hooks/useResponsive";
import { useNavigationBackground } from "./hooks/useNavigationBackground";

interface NavigationContainerProps {
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  useShortFormLogo?: boolean;
}

/**
 * NavigationContainer Component - Main container for navigation components
 * 
 * Handles scroll detection, visibility states, and responsiveness
 * while delegating rendering to more specialized components
 */
const NavigationContainer = ({ 
  isHeroPage = false, 
  forceDarkMode = false,
  useShortFormLogo = false 
}: NavigationContainerProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isMobile, isTablet } = useResponsive();
  
  // Use custom hook to determine background state
  const { isDarkBackground } = useNavigationBackground({ forceDarkMode });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      
      // Visibility control based on scroll direction
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
      setIsPastHero(currentScrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
            forceDarkMode={forceDarkMode || !isDarkBackground}
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
              forceDarkMode={forceDarkMode || !isDarkBackground} 
            />
            <MobileNav 
              isScrolled={isScrolled} 
              isHeroPage={isHeroPage} 
              forceDarkMode={forceDarkMode || !isDarkBackground} 
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationContainer;
