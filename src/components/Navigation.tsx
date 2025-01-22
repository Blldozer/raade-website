import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import NavLogo from "./navigation/NavLogo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.9; // 90vh
      setIsScrolled(window.scrollY > 20);
      setIsPastHero(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 shadow-md bg-transparent backdrop-blur-sm",
        isScrolled ? "bg-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLogo />
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;