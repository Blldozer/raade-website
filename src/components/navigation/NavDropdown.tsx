
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import NavDropdownItem from "./NavDropdownItem";

interface DropdownItem {
  name: string;
  href: string;
}

interface NavDropdownProps {
  name: string;
  href: string;
  dropdownItems: DropdownItem[];
  textColor: string;
  onClick?: () => void;
}

const NavDropdown = ({ name, href, dropdownItems, textColor, onClick }: NavDropdownProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={href}
        className={`bg-transparent hover:bg-transparent ${textColor} transition-colors duration-300 text-lg font-alegreyasans font-bold flex items-center`}
        onClick={onClick}
      >
        {name}
        <span className="inline-block ml-1 w-4 h-4 relative">
          <ChevronDown 
            className={`absolute top-0 left-0 w-4 h-4 transition-transform duration-300 ease-in-out ${
              isHovered ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </span>
      </Link>
      {isHovered && (
        <div className="absolute top-full left-0 min-w-[220px] z-50">
          <ul className="mt-2 bg-white/95 backdrop-blur-sm rounded-md shadow-lg p-2 transition-all duration-200 animate-fade-in">
            {dropdownItems.map((item) => (
              <NavDropdownItem 
                key={item.name}
                name={item.name}
                href={item.href}
                onClick={onClick}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
