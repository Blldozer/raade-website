
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
    
    // Adjusted sizes for better visibility on various screen sizes
    if (width < 375) return "h-8"; // Extra small screens - reduced from h-10
    if (width < 640) return "h-10"; // Small mobile screens - reduced from h-12
    if (width < 768) return "h-14"; // Larger mobile screens - reduced from h-16
    if (width < 1024) return "h-16"; // Tablet screens - reduced from h-18
    return "h-20"; // Desktop screens
  };
  
  const blackShortFormLogo = "/logos/RAADE-logo-final-black.png";
  const whiteShortFormLogo = "/logos/RAADE-logo-final-white.png";
    
  const blackRegularLogo = "/logos/RAADE-logo-final-black.png";
  const whiteRegularLogo = "/logos/RAADE-logo-final-white.png";
  
  const isProjectPage = location.pathname.includes('/projects/');
  
  // Use short form logo on smaller screens
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
