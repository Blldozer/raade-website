import { Link } from "react-router-dom";

const NavLogo = () => (
  <div className="flex-shrink-0 flex items-center">
    <Link to="/">
      <img
        className="h-12 w-auto"
        src="/lovable-uploads/bcc47310-6fc2-4473-804d-7f5f0620d040.png"
        alt="RAADE Logo"
      />
    </Link>
  </div>
);

export default NavLogo;