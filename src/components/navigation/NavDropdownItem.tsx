
import { Link } from "react-router-dom";

interface NavDropdownItemProps {
  name: string;
  href: string;
  onClick?: () => void;
}

const NavDropdownItem = ({ name, href, onClick }: NavDropdownItemProps) => {
  // Handle section links (those with hash)
  const isTicketsLink = name === "Tickets";
  const hasHash = href.includes('#');
  
  // For links with hash, we'll handle the navigation differently
  if (hasHash && !isTicketsLink) {
    return (
      <li>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-200 hover:bg-[#FBB03B]/10 hover:text-[#FBB03B] text-[#1A365D] text-lg font-alegreyasans font-bold"
          onClick={onClick}
        >
          {name}
        </Link>
      </li>
    );
  }
  
  return (
    <li>
      <Link
        to={href}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-200 hover:bg-[#FBB03B]/10 hover:text-[#FBB03B] text-[#1A365D] text-lg font-alegreyasans font-bold"
        onClick={onClick}
      >
        {name}
      </Link>
    </li>
  );
};

export default NavDropdownItem;
