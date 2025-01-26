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
              <NavigationMenuTrigger className="bg-transparent text-design-text-primary hover:text-design-accent transition-colors duration-200 font-medium">
                {item.name}
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-4 bg-design-background-glass backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
                {item.dropdownItems.map((dropdownItem) => (
                  <li key={dropdownItem.name}>
                    <Link
                      to={dropdownItem.href}
                      className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-black/5 hover:text-design-accent focus:bg-black/5 focus:text-design-accent text-design-text-primary"
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
              className={`text-design-text-primary hover:text-design-accent transition-colors duration-200 ${className}`}
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
          className="px-6 py-2 rounded-full transition-all duration-200 border-2 border-design-primary text-design-primary hover:bg-design-primary hover:text-white font-medium"
          onClick={onClick}
        >
          Join Us
        </a>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default NavLinks;