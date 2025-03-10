
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import NavLogo from "./navigation/NavLogo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import CountdownTimer from "./CountdownTimer";

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
  
  // If isHeroPage is explicitly passed, use that value, otherwise determine it from the path
  const heroPage = isHeroPage !== undefined 
    ? isHeroPage 
    : (location.pathname === "/" || location.pathname === "/studios");

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
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed w-full z-[100] transition-all duration-300 pointer-events-auto",
        isScrolled
          ? "bg-white/5 backdrop-blur-[2px] shadow-md"
          : "bg-transparent",
        isVisible 
          ? "translate-y-0" 
          : "-translate-y-full"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLogo 
            isScrolled={isScrolled} 
            isHeroPage={heroPage} 
            forceDarkMode={shouldForceDarkMode || !isDarkBackground}
            useShortForm={useShortFormLogo}
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
