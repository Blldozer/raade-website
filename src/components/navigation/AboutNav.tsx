
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const AboutNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
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
      <div className="w-full">
        <div className="flex h-20">
          {/* Left section (39%) */}
          <div className="w-[39%] flex justify-center items-center border-r border-gray-200">
            <NavLogo />
          </div>
          
          {/* Right section (61%) */}
          <div className="w-[61%] flex justify-end items-center pr-8">
            <div className="hidden md:block">
              <DesktopNav isScrolled={isScrolled} isHeroPage={false} className="justify-end" />
            </div>
            <div className="md:hidden">
              <MobileNav isScrolled={isScrolled} isHeroPage={false} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AboutNav;
