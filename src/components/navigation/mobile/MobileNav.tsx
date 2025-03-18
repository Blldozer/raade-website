import React, { useEffect } from "react";
import { useNavigation } from "../context/NavigationContext";
import MobileNavButton from "./MobileNavButton";
import { useMobileNav } from "@/hooks/useMobileNav";
import { navItems, mobileFooterItems } from "../navConfig";
import { X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavLogo from "../NavLogo";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

/**
 * MobileNav Component
 * 
 * Provides a full-page mobile navigation experience:
 * - Clean, minimal design with a light background
 * - Organized navigation links with clear hierarchy
 * - Simple open/close interactions
 * - Smooth transitions
 * 
 * @param isScrolled - Whether the page has been scrolled
 * @param isHeroPage - Whether this is displayed on a hero section
 * @param forceDarkMode - Whether to force dark mode styling
 */
const MobileNav = ({ 
  isScrolled = false, 
  isHeroPage = false, 
  forceDarkMode = false 
}: MobileNavProps) => {
  // Use mobile nav state from custom hook
  const { isOpen, openMenu, closeMenu } = useMobileNav();
  
  // Track which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  
  // Use the navigation context for styling
  const { state } = useNavigation();
  
  // Prioritize context values but fall back to props for backward compatibility
  const actualForceDarkMode = forceDarkMode || !state.isDarkBackground;

  // Toggle dropdown visibility
  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  // Handle body overflow to prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      console.log("Mobile menu opened - locking body scroll");
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        console.log("Mobile menu closed - restoring body scroll");
        // Restore scroll position when component unmounts or effect reruns
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <div className="block md:hidden">
      {/* Hamburger Menu Button */}
      <MobileNavButton 
        onClick={openMenu} 
        forceDarkMode={actualForceDarkMode} 
      />

      {/* Full Screen Menu Overlay - Implement style */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#F9F5EB] z-[1000] flex flex-col h-full w-screen"
          role="dialog"
          aria-modal="true"
        >
          {/* Header with logo and close button */}
          <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <NavLogo 
              forceDarkMode={true} 
              useShortForm={true}
              forceSize="h-8"
            />
            <div className="flex items-center gap-4">
              <button 
                className="p-2 text-[#274675] hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search size={22} />
              </button>
              <button
                onClick={closeMenu}
                className="p-2 text-[#274675] hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex-grow overflow-y-auto px-5 py-6">
            <nav>
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li key={item.name} className="py-1">
                    {item.dropdownItems ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full text-lg text-[#274675] font-medium"
                          aria-expanded={openDropdowns.includes(item.name)}
                        >
                          <span>{item.name}</span>
                          {openDropdowns.includes(item.name) ? (
                            <ChevronUp className="ml-2 text-[#274675]" size={18} />
                          ) : (
                            <ChevronDown className="ml-2 text-[#274675]" size={18} />
                          )}
                        </button>
                        {openDropdowns.includes(item.name) && (
                          <ul className="mt-4 ml-4 space-y-4">
                            {item.dropdownItems.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  to={subItem.href}
                                  className="block text-base text-[#4A5568] hover:text-[#FBB03B] transition-colors"
                                  onClick={closeMenu}
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
                        className="block text-lg text-[#274675] font-medium hover:text-[#FBB03B] transition-colors"
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
                
                {/* Divider */}
                <li className="border-t border-gray-200 pt-4 mt-4"></li>
                
                {/* Additional links */}
                {mobileFooterItems.map((item) => (
                  <li key={item.name} className="py-1">
                    <Link
                      to={item.href}
                      className="block text-lg text-[#274675] font-medium hover:text-[#FBB03B] transition-colors"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-200 p-5">
            <Link
              to="/#build-with-us"
              className="block w-full py-3 px-6 bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-[#274675] text-center rounded-md font-medium transition-colors"
              onClick={closeMenu}
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
