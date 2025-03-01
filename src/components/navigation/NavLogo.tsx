
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        {/* New SVG logo (text only version without the symbol) */}
        <img
          className="h-16 w-auto transition-all duration-300 hover:scale-105" 
          src="/logos/RAADE-Logo-name-svg.svg"
          alt="RAADE"
        />
      </Link>
    </div>
  );
};

export default NavLogo;
