
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

const MobileNav = ({ isScrolled = false, isHeroPage = false, forceDarkMode = false }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.mobile-menu-button')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="md:hidden mobile-nav-container">
      {/* Hamburger/Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "mobile-menu-button flex items-center justify-center p-2 rounded-md transition-all duration-200 hover:bg-white/10",
          forceDarkMode ? "text-[#274675] hover:bg-[#274675]/10" : "text-white",
          "relative z-50"
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-in Panel */}
      <div
        id="mobile-menu-panel"
        ref={panelRef}
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Panel Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <NavLogo 
            isScrolled={isScrolled} 
            forceDarkMode={true}
            useShortForm={true}
            forceSize="h-8"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Nav Links */}
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-76px)]">
          <NavLinks
            className="block w-full px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-lg"
            onClick={() => setIsOpen(false)}
            isScrolled={isScrolled}
            isHeroPage={isHeroPage}
            forceDarkMode={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
