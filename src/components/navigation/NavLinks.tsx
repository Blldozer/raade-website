
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { useLocation } from "react-router-dom";

export const navItems = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Innovation Studios",
    href: "/studios",
    dropdownItems: [
      { name: "Program Overview", href: "/studios#overview" },
      { name: "Current Projects", href: "/studios#projects" },
      { name: "Apply", href: "/studios#apply" },
    ],
  },
  {
    name: "Conference",
    href: "/conference",
    dropdownItems: [
      { name: "Overview", href: "/conference" },
      { name: "Registration", href: "/conference#registration" },
      // Hidden temporarily as requested:
      // { name: "Speakers", href: "/conference#speakers" },
      // { name: "Schedule", href: "/conference#schedule" },
      // { name: "Venue", href: "/conference#venue" },
      // { name: "Sponsorship", href: "/conference#sponsorship" },
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
  
  const getTextColor = () => {
    // When forceDarkMode is true, we need dark text for light backgrounds
    if (forceDarkMode) {
      return "text-[#274675] hover:text-[#FBB03B]";
    }
    
    // When forceDarkMode is false, we need light text for dark backgrounds
    return "text-white hover:text-[#FBB03B]";
  };

  // Get button styles based on background
  const getButtonStyles = () => {
    // For dark backgrounds (forceDarkMode is false)
    if (!forceDarkMode) {
      return "border-white text-white hover:bg-[#FBB03B] hover:border-[#FBB03B] hover:text-white";
    }
    
    // For light backgrounds (forceDarkMode is true)
    return "border-[#FBB03B] bg-[#FBB03B] text-white hover:bg-[#274675] hover:border-[#274675] shadow-md";
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex space-x-6">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name} className="relative">
            {item.dropdownItems ? (
              <>
                <NavigationMenuTrigger 
                  className={`group bg-transparent hover:bg-transparent ${getTextColor()} transition-colors duration-300 text-lg font-alegreyasans font-bold`}
                  onClick={() => {
                    if (onClick) onClick();
                    window.location.href = item.href;
                  }}
                >
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="min-w-[200px] gap-2 p-4 bg-white/90 backdrop-blur-sm rounded-md shadow-lg">
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
                </NavigationMenuContent>
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
