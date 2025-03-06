
import NavLinks from "./NavLinks";

interface DesktopNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  className?: string;
  forceDarkMode?: boolean;
}

const DesktopNav = ({ isScrolled = false, isHeroPage = false, className = "", forceDarkMode = false }: DesktopNavProps) => (
  <div className={`hidden md:flex items-center space-x-8 ${className}`}>
    <NavLinks isScrolled={isScrolled} isHeroPage={isHeroPage} forceDarkMode={forceDarkMode} />
  </div>
);

export default DesktopNav;
