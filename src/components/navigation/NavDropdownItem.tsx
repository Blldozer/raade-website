import { Link, useNavigate, useLocation } from "react-router-dom";

interface NavDropdownItemProps {
  name: string;
  href: string;
  onClick?: () => void;
}

/**
 * NavDropdownItem Component
 * 
 * Handles dropdown items in navigation with proper section linking capabilities
 * Special handling for hash links to ensure smooth scrolling
 */
const NavDropdownItem = ({ name, href, onClick }: NavDropdownItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle section links (those with hash)
  const hasHash = href.includes('#');
  const [path, hash] = hasHash ? href.split('#') : [href, ''];
  const isSamePage = path === "" || path === "/" || location.pathname === path;
  
  // Custom handler for section navigation
  const handleSectionNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Call the onClick handler if provided (usually to close mobile menu)
    if (onClick) onClick();
    
    if (isSamePage) {
      // If we're on the same page, just scroll to the element
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn(`Element #${hash} not found`);
      }
    } else {
      // If we're navigating to a different page, navigate with state
      console.log(`Navigating to ${path} with scrollToSection=${hash}`);
      navigate(path, { 
        state: { scrollToSection: hash }
      });
    }
  };
  
  // For links with hash, we'll handle the navigation differently
  if (hasHash) {
    return (
      <li>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-200 hover:bg-[#FBB03B]/10 hover:text-[#FBB03B] text-[#1A365D] text-lg font-alegreyasans font-bold"
          onClick={handleSectionNavigation}
        >
          {name}
        </a>
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
