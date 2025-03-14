import { useState, useEffect } from "react";
import { X, Search, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navConfig";
import NavLogo from "./NavLogo";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

/**
 * MobileNav Component
 * 
 * Provides a full-page mobile navigation experience:
 * - Slides in from the side covering the entire viewport
 * - Shows navigation links in a clear, accessible format
 * - Maintains consistent behavior across all pages
 * - Handles dropdown menus for nested navigation items
 * 
 * @param isScrolled - Whether the page has been scrolled
 * @param isHeroPage - Whether this is displayed on a hero section
 * @param forceDarkMode - Whether to force dark mode styling
 */
const MobileNav = ({ isScrolled = false, isHeroPage = false, forceDarkMode = false }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      setOpenDropdowns([]);
    }
  }, [location.pathname]);

  // Handle body overflow to prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position when component unmounts or effect reruns
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "p-2 hover:bg-white/10 rounded-md transition-all duration-200",
          forceDarkMode ? "text-[#274675]" : "text-white"
        )}
        aria-label="Open menu"
      >
        <span className="sr-only">Menu</span>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <path 
            d="M3 12H21M3 6H21M3 18H21" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Full Screen Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-b from-[#274675] to-[#1c3151] z-[9999] flex flex-col overflow-y-auto h-[100dvh] w-[100vw] animate-in fade-in slide-in-from-right duration-300"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="sticky top-0 flex justify-between items-center p-4 border-b border-white/20 bg-[#274675] z-50">
            <NavLogo 
              forceDarkMode={false} 
              useShortForm={true}
              forceSize="h-8"
            />
            <div className="flex items-center gap-4">
              <button 
                className="p-2 text-white hover:bg-white/10 rounded-md"
                aria-label="Search"
              >
                <Search size={24} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white hover:bg-white/10 rounded-md"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow overflow-y-auto pb-safe px-6 pt-8">
            <nav>
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li key={item.name} className="border-b border-white/10 pb-3">
                    {item.dropdownItems ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full text-2xl text-white font-alegreyasans"
                          aria-expanded={openDropdowns.includes(item.name)}
                        >
                          <span>{item.name}</span>
                          {openDropdowns.includes(item.name) ? (
                            <ChevronUp className="ml-2 text-white" />
                          ) : (
                            <ChevronDown className="ml-2 text-white" />
                          )}
                        </button>
                        {openDropdowns.includes(item.name) && (
                          <ul className="mt-4 ml-4 space-y-4 border-l-2 border-[#FBB03B] pl-4">
                            {item.dropdownItems.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  to={subItem.href}
                                  className="block text-xl text-white hover:text-[#FBB03B] transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className="block text-2xl text-white hover:text-[#FBB03B] transition-colors font-alegreyasans"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
                {/* Additional footer links */}
                <li>
                  <Link
                    to="/conference"
                    className="block text-2xl text-white hover:text-[#FBB03B] transition-colors font-alegreyasans"
                    onClick={() => setIsOpen(false)}
                  >
                    Events
                  </Link>
                </li>
                <li className="pt-3">
                  <Link
                    to="/contact"
                    className="block text-2xl text-white hover:text-[#FBB03B] transition-colors font-alegreyasans"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Join Us Button - Fixed at bottom */}
          <div className="sticky bottom-0 w-full border-t border-white/20 py-4 px-6 bg-[#1c3151]">
            <Link
              to="/#build-with-us"
              className="block w-full py-3 px-6 bg-[#FBB03B] hover:bg-[#FBB03B]/80 text-[#274675] text-center rounded-md font-medium text-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
