
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { navItems } from "./navConfig";
import JoinButton from "./JoinButton";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

const MobileNav = ({ isScrolled = false, isHeroPage = false, forceDarkMode = false }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
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
    setOpenDropdowns([]);
  }, [location.pathname]);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  const isDropdownOpen = (name: string) => openDropdowns.includes(name);

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
          "fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out overflow-hidden",
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
          <ul className="flex flex-col space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.name} className="py-1">
                {item.dropdownItems ? (
                  <div className="w-full">
                    <button 
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between w-full px-4 py-2 text-[#274675] hover:bg-gray-100 rounded-md transition-all duration-200 text-lg font-alegreyasans font-bold"
                    >
                      <span>{item.name}</span>
                      {isDropdownOpen(item.name) ? (
                        <ChevronUp className="w-5 h-5 ml-2 transition-transform" />
                      ) : (
                        <ChevronDown className="w-5 h-5 ml-2 transition-transform" />
                      )}
                    </button>
                    <div 
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out pl-4",
                        isDropdownOpen(item.name) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <ul className="mt-2 border-l-2 border-[#FBB03B]/30 pl-4">
                        {item.dropdownItems.map((subItem) => (
                          <li key={subItem.name} className="mb-2">
                            <a 
                              href={subItem.href}
                              className="block px-4 py-2 rounded-md text-[#274675] hover:bg-[#FBB03B]/10 hover:text-[#FBB03B] transition-colors duration-200 text-base font-alegreyasans font-bold"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <a 
                    href={item.href}
                    className="block px-4 py-2 rounded-md text-[#274675] hover:bg-gray-100 transition-colors duration-200 text-lg font-alegreyasans font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
            <li className="mt-6 px-4">
              <JoinButton 
                buttonStyles="w-full justify-center border-[#FBB03B] bg-[#FBB03B] text-white hover:bg-[#274675] hover:border-[#274675] shadow-md"
                onClick={() => setIsOpen(false)}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
