
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useResponsive from "@/hooks/useResponsive";

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
  
  // Dynamically determine logo size based on screen width if not forced
  const getLogoSize = () => {
    if (forceSize) return forceSize;
    
    if (width < 375) return "h-10"; // Extra small screens
    if (width < 640) return "h-12"; // Small mobile screens
    if (width < 768) return "h-16"; // Larger mobile screens
    if (width < 1024) return "h-18"; // Tablet screens
    return "h-20"; // Desktop screens
  };
  
  // For short form logos - using symbol SVG for better quality
  const blackShortFormLogo = "/logos/RAADE-Logo-Symbol-svg.svg";
  const whiteShortFormLogo = "/logos/RAADE-Logo-Symbol-svg.svg"; // We'll apply color via CSS
    
  // For regular logos
  const blackRegularLogo = "/logos/RAADE-logo-final-black.png";
  const whiteRegularLogo = "/logos/RAADE-logo-final-white.png";
  
  // Always use white logo for project detail pages
  const isProjectPage = location.pathname.includes('/projects/');
  
  // Determine if short form should be used based on screen width if not explicitly set
  const shouldUseShortForm = useShortForm || width < 480;
  
  // Determine which logos to use (black or white)
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

  // Reset the state when forceDarkMode changes or when on project pages
  useEffect(() => {
    setShowSecondary(false);
  }, [forceDarkMode, useShortForm, isProjectPage]);

  const logoSize = getLogoSize();

  // Determine SVG color filter to apply
  const getPrimaryLogoClass = () => {
    if (shouldUseShortForm) {
      return isProjectPage || !forceDarkMode 
        ? "filter brightness-0 invert" // White version
        : ""; // Black version (no filter)
    }
    return "";
  };

  const getSecondaryLogoClass = () => {
    if (shouldUseShortForm) {
      return isProjectPage || forceDarkMode 
        ? "" // Black version (no filter)
        : "filter brightness-0 invert"; // White version
    }
    return "";
  };

  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center relative">
        {/* Primary logo (visible when showSecondary is false) */}
        <img
          className={`${logoSize} w-auto transition-all duration-300 ease-in-out z-10 ${showSecondary ? 'opacity-0' : 'opacity-100'} ${getPrimaryLogoClass()}`}
          src={primaryLogo}
          alt="RAADE"
        />
        
        {/* Secondary logo (visible when showSecondary is true) */}
        <img
          className={`${logoSize} w-auto absolute top-0 left-0 transition-all duration-300 ease-in-out pointer-events-none ${showSecondary ? 'opacity-100' : 'opacity-0'} ${getSecondaryLogoClass()}`}
          src={secondaryLogo}
          alt="RAADE"
        />
      </Link>
    </div>
  );
};

export default NavLogo;
