
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import NavLogo from "./navigation/NavLogo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";

interface NavigationProps {
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

const Navigation = ({ isHeroPage = false, forceDarkMode = false }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  // If isHeroPage is explicitly passed, use that value, otherwise determine it from the path
  const heroPage = isHeroPage !== undefined ? isHeroPage : location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      
      // Control navbar visibility based on scroll direction
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
      setIsPastHero(currentScrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLogo isScrolled={isScrolled} isHeroPage={heroPage} forceDarkMode={forceDarkMode} />
          <DesktopNav isScrolled={isScrolled} isHeroPage={heroPage} forceDarkMode={forceDarkMode} />
          <MobileNav isScrolled={isScrolled} isHeroPage={heroPage} forceDarkMode={forceDarkMode} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
