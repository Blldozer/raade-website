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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.mobile-nav-container')) {
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

  return (
    <div className="md:hidden mobile-nav-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center p-2 rounded-md transition-all duration-200 hover:bg-white/10",
          forceDarkMode ? "text-[#274675]" : "text-white"
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu dropdown */}
      <div
        className={cn(
          "absolute top-full right-0 left-0 mt-2 transition-all duration-300 ease-in-out z-50",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="py-2">
            <NavLinks
              className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
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
