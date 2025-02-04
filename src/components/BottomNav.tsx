import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavItem from "./bottom-nav/NavItem";
import SubMenu from "./bottom-nav/SubMenu";
import { navItems } from "./bottom-nav/navigation-config";

const BottomNav = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleMouseEnter = (label: string) => {
    if (currentPath !== "/" || label !== "Home") {
      setActiveMenu(label);
    }
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 p-2 z-50"
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative max-w-sm mx-auto">
        <nav className="relative">
          <div className="rounded-4xl bg-gradient-to-r from-raade-orange via-[#FF9848] to-raade-red overflow-hidden">
            <div className="flex justify-around items-center h-12">
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  {...item}
                  isCurrentPath={currentPath === item.path}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                />
              ))}
            </div>
          </div>

          <AnimatePresence>
            {navItems.map((item) => (
              item.subItems && (
                <SubMenu
                  key={item.label}
                  items={item.subItems}
                  isVisible={activeMenu === item.label}
                  onClose={() => setActiveMenu(null)}
                />
              )
            ))}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;