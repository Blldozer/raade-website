import { useState, useEffect, useRef, RefObject } from "react";
import { useResponsive } from "../../../hooks/useResponsive";

/**
 * ImageLoader - Simplified image loading utility
 * Features:
 * - Simple image path construction
 * - Basic loading state management
 * - Proper error handling
 * - Support for eager loading of priority images
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

  // Create image path
  const formattedName = name.split(" ").join("-");
  const imagePath = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;

  // Effect to preload image
  useEffect(() => {
    // For actual preloading (this will utilize the browser cache)
    const img = new Image();
    img.src = imagePath;
    
    img.onload = () => {
      console.log(`Loaded image for ${name}`);
      setImageLoaded(true);
      setImageError(false);
      onImageLoad?.();
    };
    
    img.onerror = () => {
      console.log(`Failed to load image for ${name}`);
      setImageError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [name, imagePath, onImageLoad]);

  return {
    imageRef,
    imageSrc: imagePath,
    imageLoaded,
    imageError
  };
};

export default ImageLoader;
