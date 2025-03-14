
import { useState, useEffect, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./mobile/MobileNav";
import CountdownTimer from "../CountdownTimer";

/**
 * AboutNav - Navigation component for the About page
 * Features auto-hiding behavior and background color detection
 * Incorporates mobile responsiveness considerations
 */
const AboutNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkBackground, setIsDarkBackground] = useState(false); // Default to light background (dark navbar)

  // Use layout effect to set initial background before first paint
  useLayoutEffect(() => {
    // Set light background for initial state immediately (white content has light background)
    document.body.setAttribute('data-nav-background', 'light');
    setIsDarkBackground(false);
  }, []);

  useEffect(() => {
    // Check initial background without waiting for scroll
    const checkInitialBackground = () => {
      // Get current nav background attribute - if set by another component
      const navBackground = document.body.getAttribute('data-nav-background');
      
      // Set initial isDarkBackground state
      if (navBackground) {
        setIsDarkBackground(navBackground === 'dark');
      } else {
        // Default to light background for content (dark navbar)
        setIsDarkBackground(false);
        document.body.setAttribute('data-nav-background', 'light');
      }
    };
    
    // Run initial background check
    checkInitialBackground();
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Improved navbar visibility control:
      // 1. Always show at the very top (first 50px)
      // 2. Hide when scrolling down past threshold
      // 3. Show when scrolling up
      if (currentScrollY < 50) {
        // Always show navbar at the top of the page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        // Hide navbar when scrolling down (with a small threshold to prevent flickering)
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        // Show navbar when scrolling up (with a small threshold to prevent flickering)
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
      
      // Check the current background from the body attribute
      const navBackground = document.body.getAttribute('data-nav-background');
      setIsDarkBackground(navBackground === 'dark');
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed w-full z-[9999] transition-all duration-300 pointer-events-auto pt-2 sm:pt-3 md:pt-4 isolate", 
        isScrolled
          ? "bg-white/5 backdrop-blur-[2px] shadow-md"
          : "bg-transparent",
        isVisible 
          ? "translate-y-0" 
          : "-translate-y-full"
      )}
    >
      <div className="w-full">
        <div className="flex h-16 sm:h-18 md:h-20">
          {/* Left section (39%) - Adjusted height for mobile */}
          <div className="w-[39%] flex justify-center items-center">
            <NavLogo isScrolled={isScrolled} isHeroPage={false} forceDarkMode={!isDarkBackground} />
          </div>
          
          {/* Right section (61%) */}
          <div className="w-[61%] flex justify-end items-center pr-4 sm:pr-6 md:pr-8">
            {/* Conference Countdown Timer */}
            <div className="hidden md:block mr-6">
              <CountdownTimer 
                variant="nav" 
                colorScheme={!isDarkBackground ? "dark" : "light"} 
              />
            </div>
            
            <div className="hidden md:block">
              <DesktopNav isScrolled={isScrolled} isHeroPage={false} className="justify-end" forceDarkMode={!isDarkBackground} />
            </div>
            <div className="md:hidden">
              <MobileNav isScrolled={isScrolled} isHeroPage={false} forceDarkMode={!isDarkBackground} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AboutNav;
