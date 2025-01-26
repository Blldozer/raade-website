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
}

const NavLinks = ({ className = "", onClick }: NavLinksProps) => (
  <NavigationMenu>
    <NavigationMenuList>
      {navItems.map((item) =>
        item.dropdownItems ? (
          <NavigationMenuItem key={item.name}>
            <Link to={item.href} className="inline-block">
              <NavigationMenuTrigger className="bg-transparent text-raade-navy hover:text-raade-gold transition-colors duration-200">
                {item.name}
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-4 bg-white/90 backdrop-blur-sm">
                {item.dropdownItems.map((dropdownItem) => (
                  <li key={dropdownItem.name}>
                    <Link
                      to={dropdownItem.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-raade-navy hover:text-raade-gold"
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
          className="px-6 py-2 rounded-md transition-colors duration-200 border-2 border-raade-navy text-raade-navy hover:bg-raade-navy hover:text-white"
          onClick={onClick}
        >
          Join Us
        </a>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default NavLinks;