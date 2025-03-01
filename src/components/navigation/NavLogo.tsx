
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center">
        {/* Container for both logo parts with relative positioning */}
        <div className="flex items-center relative">
          {/* Text part of the logo */}
          <img
            className="h-16 w-auto transition-all duration-300" 
            src="/logos/RAADE-logo-name-svg.svg"
            alt="RAADE"
          />
          
          {/* Symbol part of the logo - positioned absolutely on top */}
          <img
            className="h-20 w-auto absolute transition-all duration-300"
            // Adjust the following values to move the symbol:
            // left: moves symbol horizontally (increase to move right)
            // top: moves symbol vertically (increase to move down)
            // transform: additional positioning adjustments
            style={{ 
              left: "70%", 
              top: "-10%",
              zIndex: 10
            }}
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
