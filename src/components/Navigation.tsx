
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import NavLogo from "./navigation/NavLogo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import { motion, useScroll, useTransform } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.9;
      setIsScrolled(window.scrollY > 20);
      setIsPastHero(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled && "backdrop-blur-[2px] shadow-md"
      )}
      style={{ backgroundColor: navBackground }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLogo />
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
