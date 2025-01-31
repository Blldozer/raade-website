import { Link, useLocation } from "react-router-dom";
import { Home, Users, Lightbulb, Calendar, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const navRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useGSAP(() => {
    // Set initial states
    gsap.set(Object.values(menuRefs.current), {
      height: 0,
      opacity: 0,
      display: "none",
    });
  }, []);

  const handleMouseEnter = (label: string) => {
    // Clear any existing timeout to prevent animation conflicts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (currentPath !== "/" || label !== "Home") {
      setHoverItem(label);
      const menu = menuRefs.current[label];
      if (menu) {
        // Kill any existing animations
        gsap.killTweensOf(menu);
        
        // Show menu immediately
        gsap.set(menu, { 
          display: "block",
          height: "auto",
          opacity: 0
        });

        // Get the natural height
        const height = menu.offsetHeight;
        
        // Set back to 0 and animate
        gsap.set(menu, { 
          height: 0,
          opacity: 0
        });
        
        // Animate to full height
        gsap.to(menu, {
          height: height,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (hoverItem) {
      const menu = menuRefs.current[hoverItem];
      if (menu) {
        // Kill any existing animations
        gsap.killTweensOf(menu);
        
        gsap.to(menu, {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(menu, { display: "none" });
            // Add a small delay before resetting hover state
            timeoutRef.current = setTimeout(() => {
              setHoverItem(null);
            }, 100);
          }
        });
      }
    }
  };

  const showMenu = (item: NavItem) => 
    hoverItem === item.label && item.subItems;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 p-2 z-50"
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative max-w-sm mx-auto" ref={navRef}>
        <nav className="relative">
          {/* Base Navigation Bar */}
          <div className="rounded-4xl bg-gradient-to-r from-[#FFA726] via-[#FF9848] to-[#FF8A6A] overflow-hidden">
            <div className="flex justify-around items-center h-12">
              {navItems.map((item) => {
                const isHome = item.path === "/";
                const isCurrentPath = currentPath === item.path;
                const hasSubItems = !!item.subItems;
                
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    className="h-full flex items-center"
                  >
                    <Link
                      to={isHome && isCurrentPath ? "#" : item.path}
                      className={`flex items-center justify-center transition-all duration-300 ${
                        isHome && isCurrentPath
                          ? "text-white/50 cursor-default pointer-events-none"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <div className="relative flex items-center gap-1">
                        {item.icon}
                        <span className="text-[10px]">{item.label}</span>
                        {hasSubItems && (
                          <ChevronDown 
                            size={12} 
                            className={`ml-0.5 transition-transform duration-300 ${
                              showMenu(item) ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expandable Content */}
          {navItems.map((item) => (
            item.subItems && (
              <div 
                key={`menu-${item.label}`}
                ref={(el) => (menuRefs.current[item.label] = el)}
                className="absolute bottom-0 left-0 right-0 rounded-t-4xl bg-gradient-to-r from-[#FFA726] via-[#FF9848] to-[#FF8A6A] origin-bottom"
              >
                <div className="p-4 pt-16">
                  {item.subItems?.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.path}
                      className="block text-white/70 hover:text-white py-2 text-left transition-colors duration-300"
                      onClick={() => setHoverItem(null)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;