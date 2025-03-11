import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import { useState, useEffect, useRef } from "react";
import NavLogo from "./NavLogo";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

const MobileNav = ({ isScrolled = false, isHeroPage = false, forceDarkMode = false }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  // Prevent scrolling when menu is open
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
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-white/10",
          forceDarkMode ? "text-[#274675]" : "text-white"
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header with logo and close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <NavLogo 
              forceDarkMode={true} 
              forceSize="h-10" 
              useShortForm={true}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-gray-600 p-2"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Mobile menu links */}
          <div className="flex-1 overflow-y-auto py-4">
            <NavLinks
              className="block px-6 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
              isScrolled={isScrolled}
              isHeroPage={isHeroPage}
              forceDarkMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
