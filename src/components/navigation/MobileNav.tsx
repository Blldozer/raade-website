
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
      // Add a class to the body instead of directly manipulating style
      document.body.classList.add('overflow-hidden');
      // Preserve scroll position
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      return () => {
        // Clean up when component unmounts or effect reruns
        document.body.classList.remove('overflow-hidden');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        // Restore scroll position
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
        <Menu size={24} />
      </button>

      {/* Full Screen Menu Overlay - Using fixed positioning with blue background */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#274675] z-[9999] flex flex-col animate-in fade-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-white/20">
            <NavLogo 
              forceDarkMode={false}
              useShortForm={true}
              forceSize="h-8"
            />
            <div className="flex items-center gap-4">
              <button className="p-2 text-white hover:bg-white/10 rounded-md">
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

          {/* Navigation Links - Using flex-grow to fill available space */}
          <div className="flex-grow overflow-y-auto pb-safe px-6 pt-8">
            <nav>
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.dropdownItems ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full text-2xl text-white font-alegreyasans"
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
                <li className="pt-6 border-t border-white/20">
                  <Link
                    to="/conference"
                    className="block text-2xl text-white hover:text-[#FBB03B] transition-colors font-alegreyasans"
                    onClick={() => setIsOpen(false)}
                  >
                    Events
                  </Link>
                </li>
                <li>
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
        </div>
      )}
    </div>
  );
};

export default MobileNav;
