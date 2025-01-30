import { Link } from "react-router-dom";
import { Home, Users, Lightbulb, Calendar } from "lucide-react";
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

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2">
      <div className="relative max-w-sm mx-auto">
        {/* Popup Menu */}
        {activeItem && (
          <div 
            className="absolute bottom-full left-0 right-0 mb-2 rounded-4xl bg-gradient-to-r from-[#FFA726] via-[#FF9848] to-[#FF8A6A] overflow-hidden animate-slide-up"
          >
            <div className="p-4">
              {navItems.find(item => item.label === activeItem)?.subItems?.map((subItem, index) => (
                <Link
                  key={index}
                  to={subItem.path}
                  className="block text-white hover:text-white/80 py-2 text-left"
                  onClick={() => setActiveItem(null)}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Navigation Bar */}
        <nav className="rounded-4xl bg-gradient-to-r from-[#FFA726] via-[#FF9848] to-[#FF8A6A]">
          <div className="flex justify-around items-center h-12">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex flex-col items-center text-white hover:text-white/80 transition-colors"
                onClick={() => setActiveItem(activeItem === item.label ? null : item.label)}
              >
                {item.icon}
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;