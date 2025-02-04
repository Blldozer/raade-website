import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: JSX.Element;
  label: string;
  path: string;
  isCurrentPath: boolean;
  onMouseEnter: () => void;
}

const NavItem = ({ icon, label, path, isCurrentPath, onMouseEnter }: NavItemProps) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="h-full flex items-center relative z-10"
    >
      <Link
        to={isCurrentPath ? "#" : path}
        className={`flex items-center justify-center transition-all duration-300 ${
          isCurrentPath
            ? "text-white/50 cursor-default pointer-events-none"
            : "text-white/70 hover:text-white"
        }`}
      >
        <div className="relative flex items-center gap-1">
          {icon}
          <span className="text-[10px]">{label}</span>
        </div>
      </Link>
    </div>
  );
};

export default NavItem;