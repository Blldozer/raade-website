import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";

interface NavLogoProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  forceSize?: string;
  useShortForm?: boolean;
}

const NavLogo = ({ 
  isScrolled = false, 
  isHeroPage = false, 
  forceDarkMode = false,
  forceSize,
  useShortForm = false
}: NavLogoProps) => {
  const location = useLocation();
  const [showSecondary, setShowSecondary] = useState(false);
  const { isMobile, isTablet, width } = useResponsive();
  
  const getLogoSize = () => {
    if (forceSize) return forceSize;
    
    if (width < 375) return "h-10"; // Extra small screens
    if (width < 640) return "h-12"; // Small mobile screens
    if (width < 768) return "h-16"; // Larger mobile screens
    if (width < 1024) return "h-18"; // Tablet screens
    return "h-20"; // Desktop screens
  };
  
  const blackShortFormLogo = "/logos/RAADE-logo-final-black.png";
  const whiteShortFormLogo = "/logos/RAADE-logo-final-white.png";
    
  const blackRegularLogo = "/logos/RAADE-logo-final-black.png";
  const whiteRegularLogo = "/logos/RAADE-logo-final-white.png";
  
  const isProjectPage = location.pathname.includes('/projects/');
  
  const shouldUseShortForm = useShortForm || width < 480;
  
  const primaryLogo = isProjectPage 
    ? (shouldUseShortForm ? whiteShortFormLogo : whiteRegularLogo)
    : (forceDarkMode 
        ? (shouldUseShortForm ? blackShortFormLogo : blackRegularLogo)
        : (shouldUseShortForm ? whiteShortFormLogo : whiteRegularLogo));
    
  const secondaryLogo = isProjectPage
    ? (shouldUseShortForm ? blackShortFormLogo : blackRegularLogo)
    : (forceDarkMode
        ? (shouldUseShortForm ? whiteShortFormLogo : whiteRegularLogo)
        : (shouldUseShortForm ? blackShortFormLogo : blackRegularLogo));

  useEffect(() => {
    setShowSecondary(false);
  }, [forceDarkMode, useShortForm, isProjectPage]);

  const logoSize = getLogoSize();

  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center relative">
        <img
          className={`${logoSize} w-auto transition-all duration-300 ease-in-out z-10 ${showSecondary ? 'opacity-0' : 'opacity-100'}`}
          src={primaryLogo}
          alt="RAADE"
        />
        
        <img
          className={`${logoSize} w-auto absolute top-0 left-0 transition-all duration-300 ease-in-out pointer-events-none ${showSecondary ? 'opacity-100' : 'opacity-0'}`}
          src={secondaryLogo}
          alt="RAADE"
        />
      </Link>
    </div>
  );
};

export default NavLogo;
