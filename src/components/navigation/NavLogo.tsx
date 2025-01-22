import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        <img
          className="h-24 w-auto transition-all duration-300 hover:scale-105"
          src="/lovable-uploads/53c3e0e3-e1ae-42a9-bdb8-6854c8b646ba.png"
          alt="RAADE Logo"
        />
      </Link>
    </div>
  );
};

export default NavLogo;