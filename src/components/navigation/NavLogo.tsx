import { Link } from "react-router-dom";

const NavLogo = () => (
  <div className="flex-shrink-0 flex items-center">
    <Link to="/">
      <img
        className="h-12 w-auto"
        src="/lovable-uploads/ea70dd62-188f-483f-b286-c31c1e137ceb.png"
        alt="RAADE Logo"
      />
    </Link>
  </div>
);

export default NavLogo;