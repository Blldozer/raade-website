
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import NavLogo from "./navigation/NavLogo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import CountdownTimer from "./CountdownTimer";
import useResponsive from "@/hooks/useResponsive";

interface NavigationProps {
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  useShortFormLogo?: boolean;
}

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
  
  // If isHeroPage is explicitly passed, use that value, otherwise determine it from the path
  const heroPage = isHeroPage !== undefined 
    ? isHeroPage 
    : (location.pathname === "/" || location.pathname === "/studios");

  // Project page detection - check if we're on a project detail page
  const isProjectPage = location.pathname.startsWith('/projects/');
  
  // Determine if dark mode should be forced based on route or background color
  const isConferencePage = location.pathname === "/conference";
  const isStudiosPage = location.pathname === "/studios";
  
  // For conference page, we want dark elements (black logo, dark text buttons)
  // because the background is white/light
  const shouldForceDarkMode = forceDarkMode || (isConferencePage && !isHeroPage);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      
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
      setIsPastHero(currentScrollY > heroHeight);
      
      // Check the current background from the body attribute
      const navBackground = document.body.getAttribute('data-nav-background');
      setIsDarkBackground(navBackground === 'dark');
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    // If on project page, set initial dark background to true 
    // for the hero section which has a dark overlay
    if (isProjectPage && !isScrolled) {
      setIsDarkBackground(true);
      document.body.setAttribute('data-nav-background', 'dark');
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isProjectPage, isScrolled]);

  // Use dynamic padding based on device size
  const getPadding = () => {
    if (isMobile) return "px-4";
    if (isTablet) return "px-6";
    return "px-8";
  };

  // For project pages, we need to detect when scrolling past the hero section
  // to change the logo and button contrast
  useEffect(() => {
    if (!isProjectPage) return;
    
    const handleProjectPageScroll = () => {
      const projectHeroElement = document.querySelector('[id^="project-hero"]');
      
      if (projectHeroElement) {
        const heroBottom = projectHeroElement.getBoundingClientRect().bottom;
        // If the hero bottom is above the top of the viewport, we've scrolled past it
        if (heroBottom <= 0) {
          document.body.setAttribute('data-nav-background', 'light');
          setIsDarkBackground(false);
        } else {
          document.body.setAttribute('data-nav-background', 'dark');
          setIsDarkBackground(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleProjectPageScroll);
    // Initial check
    handleProjectPageScroll();
    
    return () => window.removeEventListener('scroll', handleProjectPageScroll);
  }, [isProjectPage]);

  return (
    <nav
      className={cn(
        "fixed w-full z-[100] transition-all duration-300 pointer-events-auto pt-2 sm:pt-3 md:pt-4", 
        isScrolled
          ? "bg-white/5 backdrop-blur-[2px] shadow-md"
          : "bg-transparent",
        isVisible 
          ? "translate-y-0" 
          : "-translate-y-full"
      )}
    >
      <div className={`max-w-7xl mx-auto ${getPadding()}`}>
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          <NavLogo 
            isScrolled={isScrolled} 
            isHeroPage={heroPage} 
            forceDarkMode={shouldForceDarkMode || !isDarkBackground}
            useShortForm={useShortFormLogo || width < 640}
          />
          
          <div className="flex items-center">
            {/* Conference Countdown Timer */}
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
