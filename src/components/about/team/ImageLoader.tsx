import { useState, useEffect, useRef } from "react";

interface NetworkInformation {
  readonly downlink?: number;
  readonly effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  readonly rtt?: number;
  readonly saveData?: boolean;
  readonly type?: 'bluetooth' | 'cellular' | 'ethernet' | 'mixed' | 'none' | 'other' | 'unknown' | 'wifi' | 'wimax';
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

interface ImageLoaderProps {
  name: string;
  onImageLoad?: () => void;
  retryCount: number;
  setRetryCount: (count: number) => void;
  setImageError: (error: boolean) => void;
  imageError: boolean;
}

/**
 * ImageLoader component - Handles loading team member images with retry logic
 * Features:
 * - Progressive image loading with fallbacks
 * - Bandwidth-aware optimizations for slower connections
 * - Cache registration with service worker if available
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
  
  // Check if we're in a low bandwidth situation
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  
  useEffect(() => {
    // Check connection type if available
    if ('connection' in navigator && navigator.connection) {
      const connection = (navigator as NavigatorWithConnection).connection;
      if (connection && connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        setIsLowBandwidth(true);
      }
      
      // Listen for changes to connection quality
      const updateConnectionStatus = () => {
        if (connection) {
          setIsLowBandwidth(connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g');
        }
      };
      
      connection.addEventListener('change', updateConnectionStatus);
      return () => connection.removeEventListener('change', updateConnectionStatus);
    }
  }, []);

  // Preload image with retry logic
  useEffect(() => {
    // Prevent unnecessary retries if we already have too many
    if (retryCount >= MAX_RETRIES && imageError) {
      console.log(`Maximum retries reached for ${name}, using fallback`);
      return;
    }

    // Create proper image path with safeguards
    const formattedName = name.split(" ").join("-");
    // Primary and fallback image paths
    const primaryPath = `/raade-individual-e-board-photos-webp/${formattedName}-raade-website-image.webp`;
    const fallbackPath = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
    
    // Use WebP for modern browsers, fallback to JPG for better compatibility
    const imgPath = retryCount === 0 ? primaryPath : fallbackPath;
    
    // Set the image source
    setImageSrc(imgPath);
    
    // Create an image object to pre-load
    const img = new Image();
    
    // Add timestamp to URL to prevent caching issues
    img.src = `${imgPath}?t=${new Date().getTime()}`;
    
    // Set up proper event handlers
    img.onload = () => {
      console.log(`Pre-loaded team member image: ${name}`);
      setImageLoaded(true);
      setImageError(false);
      onImageLoad?.();
    };
    
    img.onerror = () => {
      console.error(`Failed to load team member image: ${name}, retry: ${retryCount + 1}/${MAX_RETRIES}`);
      
      if (retryCount < MAX_RETRIES) {
        // Wait a bit longer between each retry
        const delay = 1000 * (retryCount + 1);
        setTimeout(() => {
          // Fixed: Use direct value instead of updater function
          setRetryCount(retryCount + 1);
        }, delay);
      } else {
        setImageError(true);
      }
    };
    
    // Check if the browser supports the 'loading' attribute for native lazy loading
    if (imageRef.current && 'loading' in HTMLImageElement.prototype) {
      imageRef.current.loading = 'lazy';
    }
    
    // Cleanup to prevent memory leaks
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [name, onImageLoad, retryCount, imageError, setImageError, setRetryCount]);

  // Register image with service worker cache if available
  useEffect(() => {
    if (imageSrc && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // Tell service worker to cache this image
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_IMAGE',
        url: imageSrc
      });
    }
  }, [imageSrc]);

  return {
    imageRef,
    imageSrc,
    imageLoaded
  };
};

export default ImageLoader;
