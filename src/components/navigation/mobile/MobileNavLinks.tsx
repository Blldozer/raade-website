
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavItem } from "../navConfig";

export interface MobileNavLinksProps {
  items: NavItem[];
  footerItems: NavItem[];
  onLinkClick: () => void;
}

/**
 * MobileNavLinks Component
 * 
 * Renders the navigation links section of the mobile menu
 * Handles dropdown states and navigation interactions
 * 
 * @param items - Main navigation items to display
 * @param footerItems - Additional footer navigation items
 * @param onLinkClick - Function to call when a link is clicked
 */
const MobileNavLinks = ({ items, footerItems, onLinkClick }: MobileNavLinksProps) => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  const handleLinkClick = (href: string) => {
    // Use setTimeout to allow the page to navigate before closing the menu
    // This ensures smooth transitions and prevents layout shifts
    setTimeout(() => {
      onLinkClick();
    }, 150);
  };

  return (
    <nav className="flex-grow overflow-y-auto px-6 py-8">
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.name} className="border-b border-white/10 pb-4">
            {item.dropdownItems ? (
              <div>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center justify-between w-full text-2xl text-white font-alegreyasans"
                  aria-expanded={openDropdowns.includes(item.name)}
                >
                  <span>{item.name}</span>
                  {openDropdowns.includes(item.name) ? (
                    <ChevronUp className="ml-2 text-white" size={20} />
                  ) : (
                    <ChevronDown className="ml-2 text-white" size={20} />
                  )}
                </button>
                {openDropdowns.includes(item.name) && (
                  <ul className="mt-4 ml-4 space-y-4 border-l-2 border-[#FBB03B] pl-4">
                    {item.dropdownItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.href}
                          className="block text-xl text-white hover:text-[#FBB03B] transition-colors"
                          onClick={() => handleLinkClick(subItem.href)}
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
                onClick={() => handleLinkClick(item.href)}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
        
        {/* Add footer links from footerItems */}
        {footerItems.map((item) => (
          <li key={item.name} className="pb-3">
            <Link
              to={item.href}
              className="block text-2xl text-white hover:text-[#FBB03B] transition-colors font-alegreyasans"
              onClick={() => handleLinkClick(item.href)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavLinks;
