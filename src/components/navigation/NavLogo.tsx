
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center">
        <img
          className="h-60 w-auto transition-all duration-300" 
          src="/logos/RAADE-logo-final-black.png"
          alt="RAADE"
        />
      </Link>
    </div>
  );
};

export default NavLogo;
