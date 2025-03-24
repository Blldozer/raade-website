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

  // Create image path - log this for debugging
  const formattedName = name.split(" ").join("-").toLowerCase(); // Make lowercase for consistency
  const imagePath = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
  
  // Log the image path for debugging
  useEffect(() => {
    console.log(`Attempting to load image from path: ${imagePath}`);
  }, [imagePath]);

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
