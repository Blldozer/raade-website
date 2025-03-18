import React, { useEffect, useState } from "react";
import { useNavigation } from "../context/NavigationContext";
import MobileNavButton from "./MobileNavButton";
import { useMobileNav } from "@/hooks/useMobileNav";
import { navItems, mobileFooterItems } from "../navConfig";
import { X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
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
 * - Reliable scroll locking with multiple failsafes
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

  // Safety check to unlock body if component unmounts while menu is open
  useEffect(() => {
    return () => {
      // Unlock scroll if component unmounts while menu is open
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  // Handle body overflow to prevent scrolling when menu is open
  useEffect(() => {
    let scrollY = 0;
    
    if (isOpen) {
      console.log("Mobile menu opened - locking body scroll");
      // Store the current scroll position
      scrollY = window.scrollY;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Add additional padding to prevent layout shift in some browsers
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Add a failsafe to unlock scroll if menu state gets stuck
      window.localStorage.setItem('mobileMenuOpenTime', Date.now().toString());
    } else {
      // Only perform unlock if we were previously locked
      if (document.body.style.position === 'fixed') {
        console.log("Mobile menu closed - restoring body scroll");
        
        // Restore scroll position when component unmounts or effect reruns
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
        
        // Clear failsafe
        window.localStorage.removeItem('mobileMenuOpenTime');
      }
    }
    
    // Failsafe: Check every 2 seconds if menu is stuck open and force close if necessary
    const failsafeInterval = setInterval(() => {
      const menuOpenTime = window.localStorage.getItem('mobileMenuOpenTime');
      
      if (menuOpenTime) {
        const timeOpen = Date.now() - parseInt(menuOpenTime);
        // If menu has been "open" for more than 60 seconds and user isn't interacting, force close
        if (timeOpen > 60000 && !document.querySelector('.mobile-menu-overlay:hover')) {
          console.log("Failsafe: Force closing potentially stuck menu");
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
          window.localStorage.removeItem('mobileMenuOpenTime');
        }
      }
    }, 2000);
    
    return () => {
      clearInterval(failsafeInterval);
    };
  }, [isOpen]);

  // Helper function to handle clicks that need to stop propagation and close the menu
  const handleCloseWithStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeMenu();
  };

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
          className="mobile-menu-overlay fixed top-0 left-0 w-[100vw] h-[100vh] min-h-screen min-w-full m-0 p-0 bg-gradient-to-b from-[#F5F5F0] to-[#EAEAE5] z-[9999] flex flex-col"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
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
                onClick={handleCloseWithStopPropagation}
                className="p-2 text-[#274675] hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          {/* Join Us Button - Moved to top for visibility */}
          <div className="p-4">
            <Link
              to="/#build-with-us"
              className="block w-full py-3 px-6 bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-[#274675] text-center rounded-md font-alegreyasans font-bold transition-colors"
              onClick={handleCloseWithStopPropagation}
            >
              Join Us
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex-grow overflow-y-auto px-5 py-2">
            <nav>
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li key={item.name} className="py-1">
                    {item.dropdownItems ? (
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(item.name);
                          }}
                          className="flex items-center justify-between w-full text-lg text-[#274675] font-alegreyasans font-bold"
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
                                  className="block text-base text-[#4A5568] hover:text-[#FBB03B] transition-colors font-alegreyasans"
                                  onClick={handleCloseWithStopPropagation}
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
                        className="block text-lg text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans font-bold"
                        onClick={handleCloseWithStopPropagation}
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
                      className="block text-lg text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans font-bold"
                      onClick={handleCloseWithStopPropagation}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Footer - Copyright or other info */}
          <div className="border-t border-gray-200 p-3 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} RAADE. All rights reserved.
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
