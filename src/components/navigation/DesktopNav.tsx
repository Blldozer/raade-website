
import NavLinks from "./NavLinks";

interface DesktopNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
}

const DesktopNav = ({ isScrolled = false, isHeroPage = false }: DesktopNavProps) => (
  <div className="hidden md:flex items-center space-x-8">
    <NavLinks isScrolled={isScrolled} isHeroPage={isHeroPage} />
  </div>
);

export default DesktopNav;
