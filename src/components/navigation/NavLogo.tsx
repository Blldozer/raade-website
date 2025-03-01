
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center">
        {/* Container for both logo parts */}
        <div className="flex items-center">
          {/* Text part of the logo */}
          <img
            className="h-16 w-auto transition-all duration-300" 
            src="/logos/RAADE-logo-name-svg.svg"
            alt="RAADE"
          />
          
          {/* Symbol part of the logo */}
          <img
            className="h-20 w-auto ml-2 transition-all duration-300" 
            src="/logos/RAADE-Logo-Symbol-svg.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
      </Link>
    </div>
  );
};

export default NavLogo;
