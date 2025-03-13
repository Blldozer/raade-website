
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks/useResponsive";

/**
 * AboutHero component - Displays the hero section for the About page
 * Features a 39%/61% split between text content and image
 * Includes responsive handling for different device sizes with edge-to-edge image on mobile
 */
const AboutHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isMobile, isTablet, width } = useResponsive();

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = "/raade-innov-team-core-2.jpg"; // Make sure there's a leading slash for public directory
    
    img.onload = () => {
      console.log("Hero image loaded successfully");
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      console.error("Failed to load hero image");
      setImageError(true);
    };
    
    return () => {
      // Clean up to prevent memory leaks
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Text */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-[39%] flex flex-col justify-center bg-[#3C403A] relative"
      >
        {/* Add pt-24 on mobile to create space below the navbar, maintain existing padding on larger screens */}
        <div className="px-8 pt-24 pb-16 lg:py-24 lg:px-12 max-w-[600px] mx-auto">
          <h1 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-white mb-8">
            Who we are
          </h1>
          
          <p className="text-[clamp(1rem,1.2vw,1.25rem)] leading-relaxed text-white font-lora">
            RAADE pioneers innovative approaches to African development by connecting
            students with African organizations to create scalable solutions for
            pressing challenges.
          </p>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className={`
          w-full lg:w-[61%] relative
          ${isMobile ? 'mx-[-1rem]' : ''} 
        `}
      >
        {/* Modified container to adjust height based on screen size and remove padding on mobile */}
        <div className={`
          ${isMobile ? 'h-[50vh]' : 'h-screen'}
          relative overflow-hidden
          ${isMobile ? 'w-screen' : 'w-full'}
        `}>
          {/* Show a placeholder while image is loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-[#4C504A] flex items-center justify-center">
              <div className="text-white text-xl">Loading RAADE's story...</div>
            </div>
          )}
          
          {/* Show image once loaded - Mobile-specific adjustments */}
          {(imageLoaded || !isMobile) && !imageError && (
            <img
              src="/raade-innov-team-core-2.jpg" 
              alt="RAADE Innovation Studio Team at Rice Business School"
              className={`
                absolute inset-0 w-full h-full
                ${isMobile ? 'object-cover object-center' : 'object-cover'}
              `}
              style={{ display: imageLoaded ? 'block' : 'none' }}
              // On mobile, don't wait for onLoad event which might never fire if there are issues
              onLoad={() => !isMobile && setImageLoaded(true)} 
            />
          )}
          
          {/* Fallback if image fails to load */}
          {imageError && (
            <div className="absolute inset-0 bg-[#3C403A] flex items-center justify-center">
              <div className="text-white text-center px-6">
                <span className="text-4xl font-bold block mb-2">RAADE</span>
                <span className="text-xl">Revolutionizing African Development</span>
              </div>
            </div>
          )}
          
          {/* Overlay that's always visible - with mobile-specific adjustments */}
          <div className={`
            absolute inset-0 
            ${isMobile ? 'bg-black/5' : 'bg-black/10'}
          `} />
        </div>
      </motion.div>
    </div>
  );
};

export default AboutHero;
