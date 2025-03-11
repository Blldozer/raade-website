
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import { useState, useEffect } from "react";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

const MobileNav = ({ isScrolled = false, isHeroPage = false, forceDarkMode = false }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center transition-colors duration-200 p-2 rounded-md",
          forceDarkMode ? "text-[#274675] hover:bg-[#274675]/10" : "text-white hover:bg-white/10"
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Full-screen overlay for mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#2b212e]/90 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={cn(
          "absolute top-[var(--navbar-height)] left-0 right-0 z-50 transition-transform duration-300 ease-in-out max-h-[calc(100vh-var(--navbar-height))] overflow-y-auto",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="bg-white px-4 py-6 shadow-lg rounded-b-lg">
          <NavLinks
            className="block py-3 text-xl border-b border-gray-100 last:border-0"
            onClick={() => setIsOpen(false)}
            isScrolled={isScrolled}
            isHeroPage={isHeroPage}
            forceDarkMode={true}  // Always force dark mode for dropdown contents against white background
            isMobileMenu={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
