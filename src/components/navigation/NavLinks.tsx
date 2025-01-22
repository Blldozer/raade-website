import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
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
  { name: "Conference", href: "/conference" },
];

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
}

const NavLinks = ({ className = "", onClick }: NavLinksProps) => (
  <NavigationMenu>
    <NavigationMenuList>
      {navItems.map((item) =>
        item.dropdownItems ? (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuTrigger className="text-raade-navy hover:text-raade-gold transition-colors duration-200">
              {item.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-4 bg-white">
                {item.dropdownItems.map((dropdownItem) => (
                  <li key={dropdownItem.name}>
                    <Link
                      to={dropdownItem.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-raade-navy hover:text-raade-gold"
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
              className={`text-raade-navy hover:text-raade-gold transition-colors duration-200 ${className}`}
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
          className="px-6 py-2 rounded-md transition-colors duration-200 bg-raade-navy text-white hover:bg-raade-gold"
          onClick={onClick}
        >
          Join Us
        </a>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default NavLinks;