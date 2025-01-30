import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Lightbulb, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  dropdownItems?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: <Home size={20} />,
  },
  {
    name: "About",
    href: "/about",
    icon: <Users size={20} />,
    dropdownItems: [
      { name: "Overview", href: "/about" },
      { name: "Our Team", href: "/about#team" },
      { name: "Faculty Mentors", href: "/about#mentors" },
      { name: "Partner Organizations", href: "/about#partners" },
    ],
  },
  {
    name: "Studios",
    href: "/studios",
    icon: <Lightbulb size={20} />,
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
    icon: <Calendar size={20} />,
    dropdownItems: [
      { name: "Overview", href: "/conference" },
      { name: "Speakers", href: "/conference#speakers" },
      { name: "Schedule", href: "/conference#schedule" },
      { name: "Registration", href: "/conference#registration" },
      { name: "Sponsorship", href: "/conference#sponsorship" },
    ],
  },
];

const BottomNav = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

  const handleNavItemClick = (item: NavItem) => {
    if (isMobile) {
      if (activeDropdown === item.name) {
        setActiveDropdown(null);
      } else {
        setActiveDropdown(item.name);
      }
    }
  };

  const handleNavItemHover = (item: NavItem) => {
    if (!isMobile) {
      setActiveDropdown(item.name);
    }
  };

  const handleNavItemLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 z-50">
      <nav className="max-w-sm mx-auto rounded-4xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="flex justify-around items-center h-12">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onClick={() => handleNavItemClick(item)}
              onMouseEnter={() => handleNavItemHover(item)}
              onMouseLeave={handleNavItemLeave}
            >
              {/* Dropdown Menu */}
              {item.dropdownItems && activeDropdown === item.name && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 min-w-[200px] p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg animate-slide-up">
                  <div className="flex flex-col space-y-1">
                    {item.dropdownItems.map((dropItem) => (
                      <Link
                        key={dropItem.href}
                        to={dropItem.href}
                        className="px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
                        onClick={(e) => {
                          if (isMobile && activeDropdown !== item.name) {
                            e.preventDefault();
                          }
                        }}
                      >
                        {dropItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Nav Item */}
              <Link
                to={item.href}
                className={cn(
                  "flex flex-col items-center text-white/80 hover:text-white transition-all duration-300",
                  "hover:animate-float-up",
                  location.pathname === item.href && "text-white",
                  activeDropdown === item.name && "text-white animate-float-up"
                )}
              >
                {item.icon}
                <span className="text-[10px] mt-0.5">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;