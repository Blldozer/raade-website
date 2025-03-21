
import { useState, useEffect, useRef, RefObject } from "react";
import { useResponsive } from "../../../hooks/useResponsive"; 

interface ImageLoaderProps {
  name: string;
  onImageLoad?: () => void;
  retryCount: number;
  setRetryCount: (count: number) => void;
  setImageError: (error: boolean) => void;
  imageError: boolean;
}

/**
 * Simplified ImageLoader component
 * Uses a direct approach to image loading with minimal complexity
 * Prioritizes reliability over format optimization
 */
const ImageLoader = ({ 
  name, 
  onImageLoad, 
  retryCount, 
  setRetryCount, 
  setImageError,
  imageError
}: ImageLoaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const MAX_RETRIES = 2;
  
  // Get device info
  const { isMobile } = useResponsive();
  
  // Track network status
  const [isNetworkActive, setIsNetworkActive] = useState<boolean>(navigator.onLine);
  
  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsNetworkActive(true);
    const handleOffline = () => setIsNetworkActive(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load image with direct path strategy
  useEffect(() => {
    // Don't retry beyond max attempts
    if (retryCount >= MAX_RETRIES && imageError) {
      return;
    }

    // Create normalized name for file path
    const safeName = name.replace(/[^\w\s-]/gi, '').trim();
    const formattedName = safeName.split(" ").join("-");
    
    // SIMPLIFIED APPROACH: Always use JPG - more reliable across browsers
    const imgPath = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
    
    // Set the image source path
    setImageSrc(imgPath);
    
    // Create an image object to pre-load
    const img = new Image();
    
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
      onImageLoad?.();
    };
    
    img.onerror = () => {
      if (retryCount < MAX_RETRIES) {
        // Fast retry approach
        setTimeout(() => {
          setRetryCount(retryCount + 1);
        }, 500);
      } else {
        setImageError(true);
      }
    };
    
    // Start loading the image
    img.src = imgPath;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [name, onImageLoad, retryCount, imageError, setImageError, setRetryCount, isMobile, isNetworkActive]);

  return {
    imageRef,
    imageSrc,
    imageLoaded
  };
};

export default ImageLoader;
