import { Link, useLocation } from "react-router-dom";
import { Home, Users, Lightbulb, Calendar, ChevronUp } from "lucide-react";
import { useState } from "react";

type NavItem = {
  icon: JSX.Element;
  label: string;
  path: string;
  subItems?: { label: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: <Home size={20} />,
    label: "Home",
    path: "/",
  },
  {
    icon: <Users size={20} />,
    label: "About",
    path: "/about",
    subItems: [
      { label: "Our Team", path: "/about#team" },
      { label: "Mission", path: "/about#mission" },
    ],
  },
  {
    icon: <Lightbulb size={20} />,
    label: "Studios",
    path: "/studios",
    subItems: [
      { label: "Current Projects", path: "/studios#projects" },
      { label: "Get Involved", path: "/studios#involve" },
      { label: "Past Success", path: "/studios#success" },
    ],
  },
  {
    icon: <Calendar size={20} />,
    label: "Conference",
    path: "/conference",
    subItems: [
      { label: "Schedule", path: "/conference#schedule" },
      { label: "Speakers", path: "/conference#speakers" },
      { label: "Register", path: "/conference#register" },
      { label: "Location", path: "/conference#location" },
    ],
  },
];

const BottomNav = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleMouseEnter = (label: string) => {
    if (currentPath !== "/" || label !== "Home") {
      setHoverItem(label);
    }
  };

  const handleMouseLeave = () => {
    setHoverItem(null);
  };

  const handleClick = (item: NavItem) => {
    if (currentPath === item.path) {
      setActiveItem(null);
      return;
    }
    setActiveItem(activeItem === item.label ? null : item.label);
  };

  const showMenu = (item: NavItem) => 
    (activeItem === item.label || hoverItem === item.label) && item.subItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2">
      <div className="relative max-w-sm mx-auto">
        {/* Popup Menu */}
        {navItems.map((item) => (
          showMenu(item) && (
            <div 
              key={`menu-${item.label}`}
              className="absolute bottom-full left-0 right-0 rounded-t-4xl bg-gradient-to-r from-[#FFA726] via-[#FF9848] to-[#FF8A6A] overflow-hidden animate-expand-up"
              style={{ transformOrigin: 'bottom' }}
            >
              <div className="p-4">
                {item.subItems?.map((subItem, index) => (
                  <Link
                    key={index}
                    to={subItem.path}
                    className="block text-white/70 hover:text-white py-2 text-left transition-colors duration-300"
                    onClick={() => {
                      setActiveItem(null);
                      setHoverItem(null);
                    }}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          )
        ))}
        
        {/* Navigation Bar */}
        <nav className="rounded-4xl bg-gradient-to-r from-[#FFA726] via-[#FF9848] to-[#FF8A6A]">
          <div className="flex justify-around items-center h-12">
            {navItems.map((item) => {
              const isHome = item.path === "/";
              const isCurrentPath = currentPath === item.path;
              const hasSubItems = !!item.subItems;
              
              return (
                <button
                  key={item.label}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isHome && isCurrentPath
                      ? "text-white/50 cursor-default"
                      : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => handleClick(item)}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                  disabled={isHome && isCurrentPath}
                >
                  <div className="relative">
                    {item.icon}
                    {hasSubItems && (
                      <ChevronUp 
                        size={12} 
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 transition-transform duration-300 ${
                          showMenu(item) ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>
                  <span className="text-[10px] mt-0.5">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;