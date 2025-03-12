import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
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

  // Prevent background scrolling when menu is open, with a safer implementation
  useEffect(() => {
    // Store the original overflow value to restore it properly
    const originalOverflow = document.body.style.overflow;
    
    if (isOpen) {
      // Instead of directly setting overflow, add a class for better control
      document.body.classList.add('mobile-menu-open');
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = originalOverflow;
    }
    
    // Cleanup function that ensures overflow is restored properly
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = originalOverflow;
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
          "relative z-[99999]" // Increased z-index
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Full-screen Menu */}
      {isOpen && (
        <div
          id="mobile-menu-panel"
          ref={panelRef}
          className="fixed inset-0 bg-white z-[99990] flex flex-col"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Panel Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <div className="flex items-center">
              <NavLogo 
                isScrolled={isScrolled} 
                forceDarkMode={true}
                useShortForm={true}
                forceSize="h-8"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Nav Links */}
          <div className="flex-grow py-4 overflow-y-auto">
            <ul className="flex flex-col space-y-4 px-6">
              {navItems.map((item) => (
                <li key={item.name} className="py-1">
                  {item.dropdownItems ? (
                    <div className="w-full">
                      <button 
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center justify-between w-full py-2 text-[#274675] text-xl font-alegreyasans font-bold"
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
                            <li key={subItem.name} className="mb-3">
                              <a 
                                href={subItem.href}
                                className="block py-1 text-[#274675] hover:text-[#FBB03B] transition-colors duration-200 text-lg font-alegreyasans font-bold"
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
                      className="block py-2 text-[#274675] hover:text-[#FBB03B] transition-colors duration-200 text-xl font-alegreyasans font-bold"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
              <li className="mt-10">
                <JoinButton 
                  buttonStyles="w-full justify-center border-[#FBB03B] bg-[#FBB03B] text-white hover:bg-[#274675] hover:border-[#274675] shadow-md"
                  onClick={() => setIsOpen(false)}
                />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
