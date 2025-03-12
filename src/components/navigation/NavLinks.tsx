
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const navItems = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Innovation Studios",
    href: "/studios",
    dropdownItems: [
      { name: "Overview", href: "/studios#overview" },
      { name: "Current Projects", href: "/studios#projects" },
      { name: "Join Us", href: "/studios#apply" },
    ],
  },
  {
    name: "Conference",
    href: "/conference",
    dropdownItems: [
      { name: "Overview", href: "/conference" },
      { name: "Tickets", href: "/conference#registration" },
    ],
  },
];

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

const NavLinks = ({ className = "", onClick, isScrolled = false, isHeroPage = false, forceDarkMode = false }: NavLinksProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const isProjectPage = location.pathname.includes('/projects/');
  
  const getTextColor = () => {
    if (isProjectPage) {
      return "text-white hover:text-[#FBB03B]";
    }
    
    if (forceDarkMode) {
      return "text-[#274675] hover:text-[#FBB03B]";
    }
    
    return "text-white hover:text-[#FBB03B]";
  };

  const getButtonStyles = () => {
    if (isProjectPage) {
      return "border-white text-white hover:bg-[#FBB03B] hover:border-[#FBB03B] hover:text-white";
    }
    
    if (!forceDarkMode) {
      return "border-white text-white hover:bg-[#FBB03B] hover:border-[#FBB03B] hover:text-white";
    }
    
    return "border-[#FBB03B] bg-[#FBB03B] text-white hover:bg-[#274675] hover:border-[#274675] shadow-md";
  };

  const handleNavigation = (path: string) => {
    if (onClick) onClick();
    navigate(path);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex space-x-6">
        {navItems.map((item) => (
          <NavigationMenuItem 
            key={item.name} 
            className="relative"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.dropdownItems ? (
              <>
                <Link
                  to={item.href}
                  className={`bg-transparent hover:bg-transparent ${getTextColor()} transition-colors duration-300 text-lg font-alegreyasans font-bold flex items-center`}
                  onClick={onClick}
                >
                  {item.name}
                  <ChevronDown 
                    className={`h-4 w-4 ml-1 transition-transform duration-200 ${hoveredItem === item.name ? 'rotate-180' : ''}`} 
                  />
                </Link>
                {hoveredItem === item.name && (
                  <div className="absolute top-full left-0 min-w-[200px] z-50">
                    <ul className="mt-2 bg-white/90 backdrop-blur-sm rounded-md shadow-lg p-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <li key={dropdownItem.name}>
                          <Link
                            to={dropdownItem.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#FBB03B]/10 hover:text-[#FBB03B] text-[#1A365D] text-lg font-alegreyasans font-bold"
                            onClick={onClick}
                          >
                            {dropdownItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.href}
                className={`${getTextColor()} transition-colors duration-300 ${className} text-lg font-alegreyasans font-bold`}
                onClick={onClick}
              >
                {item.name}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <Link
            to="/studios#apply"
            className={`px-6 py-2 rounded-md transition-all duration-300 border-2 text-lg font-alegreyasans font-bold ${getButtonStyles()}`}
            onClick={onClick}
          >
            Join Us
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
