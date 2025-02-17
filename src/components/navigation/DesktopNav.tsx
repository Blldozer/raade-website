
import NavLinks from "./NavLinks";

interface DesktopNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  className?: string;
}

const DesktopNav = ({ isScrolled = false, isHeroPage = false, className = "" }: DesktopNavProps) => (
  <div className={`hidden md:flex items-center space-x-8 ${className}`}>
    <NavLinks isScrolled={isScrolled} isHeroPage={isHeroPage} />
  </div>
);

export default DesktopNav;
