import { Link } from "react-router-dom";

const NavLogo = () => (
  <div className="flex-shrink-0 flex items-center">
    <Link to="/">
      <img
        className="h-12 w-auto"
        src="/lovable-uploads/5f474a9c-ca13-4875-b29c-a91ae8f15738.png"
        alt="RAADE Logo"
      />
    </Link>
  </div>
);

export default NavLogo;