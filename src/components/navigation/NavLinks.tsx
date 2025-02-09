import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const navItems = [
  {
    name: "About",
    href: "/about",
    dropdownItems: [
      { name: "Overview", href: "/about" },
      { name: "Our Team", href: "/about#team" },
      { name: "Faculty Mentors", href: "/about#mentors" },
      { name: "Partner Organizations", href: "/about#partners" },
    ],
  },
  {
    name: "Innovation Studios",
    href: "/studios",
    dropdownItems: [
      { name: "Program Overview", href: "/studios" },
      { name: "Current Projects", href: "/studios#projects" },
      { name: "Past Projects", href: "/studios#past-projects" },
      { name: "Apply", href: "/studios#apply" },
    ],
  },
  {
    name: "Conference",
    href: "/conference",
    dropdownItems: [
      { name: "Overview", href: "/conference" },
      { name: "Speakers", href: "/conference#speakers" },
      { name: "Schedule", href: "/conference#schedule" },
      { name: "Registration", href: "/conference#registration" },
      { name: "Sponsorship", href: "/conference#sponsorship" },
    ],
  },
];

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
  isScrolled?: boolean;
  isHeroPage?: boolean;
}

const NavLinks = ({ className = "", onClick, isScrolled = false, isHeroPage = false }: NavLinksProps) => {
  const getTextColor = () => {
    if (isHeroPage && !isScrolled) return "text-white hover:text-[#FBB03B]";
    return "text-[#FBB03B]";
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) =>
          item.dropdownItems ? (
            <NavigationMenuItem key={item.name}>
              <Link to={item.href} className="inline-block">
                <NavigationMenuTrigger 
                  className={`group bg-transparent hover:bg-transparent ${getTextColor()} transition-colors duration-300 text-lg font-alegreyasans`}
                >
                  {item.name}
                </NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2 p-4 bg-white/90 backdrop-blur-sm">
                  {item.dropdownItems.map((dropdownItem) => (
                    <li key={dropdownItem.name}>
                      <Link
                        to={dropdownItem.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-300 hover:bg-[#FBB03B]/10 hover:text-[#FBB03B] focus:bg-accent focus:text-accent-foreground text-raade-navy text-lg font-alegreyasans"
                        onClick={onClick}
                      >
                        {dropdownItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.name}>
              <Link
                to={item.href}
                className={`${getTextColor()} transition-colors duration-300 ${className} text-lg font-alegreyasans`}
                onClick={onClick}
              >
                {item.name}
              </Link>
            </NavigationMenuItem>
          )
        )}
        <NavigationMenuItem>
          <a
            href="#join"
            className={`px-6 py-2 rounded-md transition-all duration-300 border-2 text-lg font-alegreyasans ${
              isHeroPage && !isScrolled 
                ? "border-white text-white hover:bg-[#FBB03B] hover:border-[#FBB03B] hover:text-white" 
                : "border-[#FBB03B] text-[#FBB03B]"
            }`}
            onClick={onClick}
          >
            Join Us
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
