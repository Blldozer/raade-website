
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import CountdownTimer from "./CountdownTimer";

const AboutNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  useEffect(() => {
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
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/5 backdrop-blur-[2px] shadow-md"
          : "bg-transparent",
        isVisible 
          ? "translate-y-0" 
          : "-translate-y-full"
      )}
    >
      <div className="w-full">
        <div className="flex h-20">
          {/* Left section (39%) */}
          <div className="w-[39%] flex justify-center items-center border-r border-gray-200">
            <NavLogo isScrolled={isScrolled} isHeroPage={true} forceDarkMode={!isDarkBackground} />
          </div>
          
          {/* Right section (61%) */}
          <div className="w-[61%] flex justify-end items-center pr-8">
            {/* Conference Countdown Timer */}
            <div className="hidden md:block mr-6">
              <CountdownTimer 
                variant="nav" 
                colorScheme={!isDarkBackground ? "dark" : "light"} 
              />
            </div>
            
            <div className="hidden md:block">
              <DesktopNav isScrolled={isScrolled} isHeroPage={true} className="justify-end" forceDarkMode={!isDarkBackground} />
            </div>
            <div className="md:hidden">
              <MobileNav isScrolled={isScrolled} isHeroPage={true} forceDarkMode={!isDarkBackground} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AboutNav;
