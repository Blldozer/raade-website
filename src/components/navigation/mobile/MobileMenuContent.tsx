
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavItem } from "../navConfig";

interface MobileMenuContentProps {
  navItems: NavItem[];
  footerItems: NavItem[];
  onNavigation: (href: string) => void;
}

/**
 * MobileMenuContent Component
 * 
 * Renders the main navigation content of the mobile menu with:
 * - Expandable dropdown sections
 * - Navigation links with proper event handling
 * - Footer navigation links
 * 
 * @param navItems - Main navigation items to display
 * @param footerItems - Secondary navigation items to display at the bottom
 * @param onNavigation - Function to handle navigation with proper routing
 */
const MobileMenuContent = ({ 
  navItems, 
  footerItems,
  onNavigation 
}: MobileMenuContentProps) => {
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

  // Handle navigation with proper event handling
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigation(href);
  };

  return (
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
                      
                      // Also navigate to the main section when clicking the dropdown header
                      onNavigation(item.href);
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
                            onClick={(e) => handleLinkClick(e, subItem.href)}
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
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
          
          {/* Divider */}
          <li className="border-t border-gray-200 pt-4 mt-4"></li>
          
          {/* Additional links */}
          {footerItems.map((item) => (
            <li key={item.name} className="py-1">
              <a
                href={item.href}
                className="block text-lg text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans font-bold"
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenuContent;
