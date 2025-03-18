import React, { useEffect } from "react";
import { X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavLogo from "../NavLogo";
import { navItems, mobileFooterItems } from "../navConfig";
import { useState } from "react";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenuOverlay Component
 * 
 * Provides a full-screen mobile menu overlay with:
 * - Clean white background for better readability
 * - Expandable navigation sections
 * - Smooth animations and transitions
 * - Proper scroll locking behavior
 * 
 * @param isOpen - Whether the menu is currently open
 * @param onClose - Callback to close the menu
 */
const MobileMenuOverlay = ({ isOpen, onClose }: MobileMenuOverlayProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Track which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

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
      
      // Restore proper padding to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Only unlock if we were previously locked
      if (document.body.style.position === 'fixed') {
        console.log("Mobile menu closed - restoring scroll");
        
        // Remove styles
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      }
    }
    
    return () => {
      // Cleanup in case component unmounts while menu is open
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [isOpen]);
  
  // Helper function to handle clicks that need to stop propagation and close the menu
  const handleCloseWithStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };
  
  // Handle navigation with proper handling of section navigation
  const handleNavigation = (href: string) => {
    // Close the menu
    onClose();
    
    // Parse the URL and hash
    const hasHash = href.includes('#');
    const [path, hash] = hasHash ? href.split('#') : [href, ''];
    const isSamePage = path === "" || path === "/" || location.pathname === path;
    
    if (isSamePage && hash) {
      // If we're on the same page, just scroll to the element
      console.log(`Scrolling to section #${hash} on current page`);
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn(`Element #${hash} not found on current page`);
        }
      }, 100);
    } else if (hasHash) {
      // If we're navigating to a different page with a hash, use state
      console.log(`Navigating to ${path} with scrollToSection=${hash}`);
      navigate(path, { 
        state: { scrollToSection: hash }
      });
    } else {
      // Regular navigation
      console.log(`Regular navigation to ${href}`);
      navigate(href);
    }
  };

  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed top-0 left-0 w-[100vw] h-[100vh] min-h-screen min-w-full m-0 p-0 bg-gradient-to-b from-[#F5F5F0] to-[#EAEAE5] z-[9999] flex flex-col"
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
        <a
          href="/#build-with-us"
          className="block w-full py-3 px-6 bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-[#274675] text-center rounded-md font-alegreyasans font-bold transition-colors"
          onClick={(e) => handleNavigation("/#build-with-us")}
        >
          Join Us
        </a>
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
                            <a
                              href={subItem.href}
                              className="block text-base text-[#4A5568] hover:text-[#FBB03B] transition-colors font-alegreyasans"
                              onClick={(e) => handleNavigation(subItem.href)}
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block text-lg text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans font-bold"
                    onClick={(e) => handleNavigation(item.href)}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
            
            {/* Divider */}
            <li className="border-t border-gray-200 pt-4 mt-4"></li>
            
            {/* Additional links */}
            {mobileFooterItems.map((item) => (
              <li key={item.name} className="py-1">
                <a
                  href={item.href}
                  className="block text-lg text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans font-bold"
                  onClick={(e) => handleNavigation(item.href)}
                >
                  {item.name}
                </a>
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
  );
};

export default MobileMenuOverlay;
