
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useResponsive } from "@/hooks/useResponsive";

interface NavLogoProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  forceSize?: string;
  useShortForm?: boolean;
}

/**
 * NavLogo component - Displays the RAADE logo with proper state handling
 * Features responsive sizing and color switching based on page context
 * Includes improved navigation handling to prevent routing issues
 * Now with improved duplicate prevention mechanism
 */
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
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  // Cache logo paths to ensure consistent rendering
  const blackShortFormLogo = "/logos/RAADE-logo-final-black.png";
  const whiteShortFormLogo = "/logos/RAADE-logo-final-white.png";
    
  const blackRegularLogo = "/logos/RAADE-logo-final-black.png";
  const whiteRegularLogo = "/logos/RAADE-logo-final-white.png";
  
  const isProjectPage = location.pathname.includes('/projects/');
  const isAboutPage = location.pathname === '/about';
  
  // Preload logo images to prevent flash of content
  useEffect(() => {
    const preloadImages = () => {
      const imagesToPreload = [
        blackShortFormLogo,
        whiteShortFormLogo,
        blackRegularLogo,
        whiteRegularLogo
      ];
      
      Promise.all(
        imagesToPreload.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      )
      .then(() => {
        console.log("All logo images preloaded successfully");
        setLogoLoaded(true);
      })
      .catch(error => {
        console.error("Error preloading logo images:", error);
        // Set loaded anyway to prevent blocking UI
        setLogoLoaded(true);
      });
    };
    
    preloadImages();
  }, []);
  
  // Use short form logo on smaller screens
  const shouldUseShortForm = useShortForm || width < 480;
  
  const getLogoSize = useCallback(() => {
    if (forceSize) return forceSize;
    
    // Adjusted sizes for better visibility on various screen sizes
    if (width < 375) return "h-8"; // Extra small screens
    if (width < 640) return "h-10"; // Small mobile screens
    if (width < 768) return "h-14"; // Larger mobile screens
    if (width < 1024) return "h-16"; // Tablet screens
    return "h-20"; // Desktop screens
  }, [forceSize, width]);
  
  // Determine the correct logo to show based on page context
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

  // Reset logo state when props change
  useEffect(() => {
    setShowSecondary(false);
  }, [forceDarkMode, useShortForm, isProjectPage]);

  const logoSize = getLogoSize();

  return (
    <div className="flex-shrink-0 flex items-center">
      <Link 
        to="/" 
        className="flex items-center relative"
        // Add a key to force re-render when location changes
        key={`logo-link-${location.pathname}`}
      >
        {/* Show a placeholder while loading */}
        {!logoLoaded && (
          <div className={`${logoSize} w-20 bg-gray-200 animate-pulse rounded`}></div>
        )}
        
        {/* Primary logo */}
        <img
          className={`${logoSize} w-auto transition-all duration-300 ease-in-out z-10 ${
            showSecondary ? 'opacity-0' : 'opacity-100'
          } ${logoLoaded ? 'block' : 'hidden'}`}
          src={primaryLogo}
          alt="RAADE"
          onLoad={() => console.log("Primary logo loaded")}
        />
        
        {/* Secondary logo for hover effects */}
        <img
          className={`${logoSize} w-auto absolute top-0 left-0 transition-all duration-300 ease-in-out pointer-events-none ${
            showSecondary ? 'opacity-100' : 'opacity-0'
          } ${logoLoaded ? 'block' : 'hidden'}`}
          src={secondaryLogo}
          alt="RAADE"
        />
      </Link>
    </div>
  );
};

export default NavLogo;
