import { Menu, X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import NavLogo from "./NavLogo";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { navItems } from "./navConfig";
import { Link } from "react-router-dom";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

const MobileNav = ({ isScrolled = false, isHeroPage = false, forceDarkMode = false }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  // Initialize component
  useEffect(() => {
    setIsInitialized(true);
    return () => {
      // Make sure to reset body overflow when component unmounts
      document.body.style.removeProperty('overflow');
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdowns([]);
    // Ensure body overflow is reset when navigation occurs
    if (isInitialized) {
      document.body.style.removeProperty('overflow');
    }
  }, [location.pathname, isInitialized]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    // Only modify body style if component is initialized to prevent issues during hydration
    if (!isInitialized) return;

    if (isOpen) {
      // Store original overflow value to restore later
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Use the stored value or default to 'auto' instead of 'unset' for better browser compatibility
        document.body.style.overflow = originalOverflow || 'auto';
      };
    } else {
      // When closing, reset to auto (more compatible than 'unset')
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, isInitialized]);

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
        <Menu size={24} />
      </button>

      {/* Full Screen Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#F4F5F4] z-[9999]">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <NavLogo 
              forceDarkMode={true}
              useShortForm={true}
              forceSize="h-8"
            />
            <div className="flex items-center gap-4">
              <button className="p-2 text-[#274675] hover:bg-gray-100 rounded-md">
                <Search size={24} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#274675] hover:bg-gray-100 rounded-md"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="overflow-y-auto h-[calc(100vh-70px)] px-6 py-8">
            <nav>
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.dropdownItems ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full text-2xl text-[#274675] font-alegreyasans"
                        >
                          <span>{item.name}</span>
                          {openDropdowns.includes(item.name) ? (
                            <ChevronUp className="ml-2 text-[#274675]" />
                          ) : (
                            <ChevronDown className="ml-2 text-[#274675]" />
                          )}
                        </button>
                        {openDropdowns.includes(item.name) && (
                          <ul className="mt-4 ml-4 space-y-4 border-l-2 border-[#FBB03B] pl-4">
                            {item.dropdownItems.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  to={subItem.href}
                                  className="block text-xl text-[#274675] hover:text-[#FBB03B] transition-colors"
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
                        className="block text-2xl text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
                {/* Additional footer links */}
                <li className="pt-6 border-t border-gray-200">
                  <Link
                    to="/conference"
                    className="block text-2xl text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans"
                    onClick={() => setIsOpen(false)}
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block text-2xl text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
