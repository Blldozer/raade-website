
import { useState, useEffect, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import NavLogo from "./navigation/NavLogo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import CountdownTimer from "./CountdownTimer";
import { useResponsive } from "@/hooks/useResponsive";

interface NavigationProps {
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  useShortFormLogo?: boolean;
}

/**
 * Navigation Component - Main navigation bar for the website
 * 
 * This component adapts its styling based on:
 * - Current page/section background
 * - Scroll position
 * - User's device
 * 
 * On initial load with no scrolling, it should display:
 * - Light navbar (white text) when over dark backgrounds
 * - Dark navbar (navy text) when over light backgrounds
 */
const Navigation = ({ 
  isHeroPage = false, 
  forceDarkMode = false,
  useShortFormLogo = false 
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const location = useLocation();
  const { isMobile, isTablet, width } = useResponsive();
  
  const heroPage = isHeroPage !== undefined 
    ? isHeroPage 
    : (location.pathname === "/" || location.pathname === "/studios");

  const isConferencePage = location.pathname === "/conference";
  const isStudiosPage = location.pathname === "/studios";
  const isIndexPage = location.pathname === "/" || location.pathname === "";
  
  const shouldForceDarkMode = forceDarkMode || (isConferencePage && !isHeroPage);

  // Immediately check background configuration on component mount
  // This ensures proper contrast without requiring any user interaction
  useLayoutEffect(() => {
    const checkInitialBackground = () => {
      // For index page, we always want to start with light navbar (over dark hero)
      if (isIndexPage) {
        setIsDarkBackground(true);
        document.body.setAttribute('data-nav-background', 'light');
        return;
      }
      
      const navBackground = document.body.getAttribute('data-nav-background');
      
      if (navBackground) {
        setIsDarkBackground(navBackground === 'dark');
      } else {
        if (isConferencePage) {
          setIsDarkBackground(false);
          document.body.setAttribute('data-nav-background', 'light');
        } else {
          setIsDarkBackground(true);
          document.body.setAttribute('data-nav-background', 'dark');
        }
      }
    };
    
    checkInitialBackground();
  }, [isIndexPage, isConferencePage]);

  useEffect(() => {
    const checkInitialBackground = () => {
      const navBackground = document.body.getAttribute('data-nav-background');
      
      if (navBackground) {
        setIsDarkBackground(navBackground === 'dark');
      } else {
        if (isConferencePage) {
          setIsDarkBackground(false);
          document.body.setAttribute('data-nav-background', 'light');
        } else {
          setIsDarkBackground(true);
          document.body.setAttribute('data-nav-background', 'dark');
        }
      }
    };
    
    checkInitialBackground();
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      
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
      
      const navBackground = document.body.getAttribute('data-nav-background');
      setIsDarkBackground(navBackground === 'dark');
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial call to handle scroll ensures correct state without user scrolling
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isConferencePage]);

  const getPadding = () => {
    if (isMobile) return "px-4";
    if (isTablet) return "px-6";
    return "px-8";
  };

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
      <div className={`max-w-7xl mx-auto ${getPadding()}`}>
        <div className="flex justify-between items-center">
          <NavLogo 
            isScrolled={isScrolled} 
            isHeroPage={heroPage} 
            forceDarkMode={shouldForceDarkMode || !isDarkBackground}
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
              isHeroPage={heroPage} 
              forceDarkMode={shouldForceDarkMode || !isDarkBackground} 
            />
            <MobileNav 
              isScrolled={isScrolled} 
              isHeroPage={heroPage} 
              forceDarkMode={shouldForceDarkMode || !isDarkBackground} 
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
