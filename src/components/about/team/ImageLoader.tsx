import { useState, useEffect, useRef, RefObject } from "react";
import { useResponsive } from "../../../hooks/useResponsive";

/**
 * ImageLoader - Simplified image loading utility
 * Features:
 * - Simple image path construction
 * - Basic loading state management
 * - Proper error handling with more robust error detection
 * - Support for eager loading of priority images
 * - Debug mode to help diagnose image loading issues
 */
interface ImageLoaderProps {
  name: string;
  onImageLoad?: () => void;
}

const ImageLoader = ({ name, onImageLoad }: ImageLoaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { isMobile } = useResponsive();

  // Check if we're in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Create image path - preserve capitalization to match actual file names
  const formattedName = name.split(" ").map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join("-");
  
  // Use absolute URLs in production for reliability
  const imagePath = isProduction 
    ? `https://rice-raade.com/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`
    : `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
  
  // Log the image path and environment for debugging
  useEffect(() => {
    console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
    console.log(`Attempting to load image for: ${name}`);
    console.log(`Formatted image name: ${formattedName}`);
    console.log(`Full image path: ${imagePath}`);
    if (isProduction) {
      console.log(`Base URL: ${window.location.origin}`);
    }
  }, [imagePath, isProduction, name, formattedName]);

  // Effect to preload image
  useEffect(() => {
    // For actual preloading (this will utilize the browser cache)
    const img = new Image();
    
    // Add a timestamp to bypass cache for testing
    const uncachedPath = `${imagePath}?t=${new Date().getTime()}`;
    img.src = isMobile ? uncachedPath : imagePath; // Bypass cache on mobile for testing
    
    // Set a timeout to detect extremely slow loading images (5 seconds)
    const timeoutTimer = setTimeout(() => {
      if (!imageLoaded) {
        console.warn(`Image load timeout for ${name} - treating as error`);
        setImageError(true);
      }
    }, 5000);
    
    img.onload = () => {
      clearTimeout(timeoutTimer);
      console.log(`✅ Successfully loaded image for ${name}`);
      setImageLoaded(true);
      setImageError(false);
      onImageLoad?.();
    };
    
    img.onerror = (e) => {
      clearTimeout(timeoutTimer);
      console.error(`❌ Failed to load image for ${name}`, e);
      
      // Try with a direct fetch to get more error details
      fetch(img.src)
        .then(response => {
          if (!response.ok) {
            console.error(`Fetch failed with status: ${response.status}`);
          } else {
            console.log(`Fetch succeeded but image load failed - possible CORS issue`);
          }
        })
        .catch(err => {
          console.error(`Network error fetching image: ${err.message}`);
        });
      
      setImageError(true);
    };
    
    return () => {
      clearTimeout(timeoutTimer);
      img.onload = null;
      img.onerror = null;
    };
  }, [name, imagePath, onImageLoad, isMobile, imageLoaded]);

  return {
    imageRef,
    imageSrc: imagePath,
    imageLoaded,
    imageError
  };
};

export default ImageLoader;
