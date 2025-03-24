import { useState, useEffect, useRef, RefObject } from "react";
import { useResponsive } from "../../../hooks/useResponsive"; 

/**
 * Extended Navigator interface with connection information
 */
interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType: string;
    addEventListener: (event: string, listener: EventListener) => void;
    removeEventListener: (event: string, listener: EventListener) => void;
  };
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
 * - Improved mobile handling
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
  
  // Get device info for better mobile handling
  const { isMobile, deviceType } = useResponsive();
  
  // Check if we're in a low bandwidth situation
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  
  useEffect(() => {
    // Check connection type if available
    if ('connection' in navigator && navigator.connection) {
      const connection = (navigator as NavigatorWithConnection).connection;
      if (connection && connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        setIsLowBandwidth(true);
        console.log("Low bandwidth detected, optimizing image loading");
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
    
    // Determine which format to use based on retry count and device
    let imgPath;
    
    // Enhanced strategy: Try JPG first on mobile for faster initial display
    // On desktop, try WebP for modern browsers initially
    if (retryCount === 0) {
      if (isMobile) {
        // On mobile, start with JPG for faster loading and better compatibility
        imgPath = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
        console.log(`Using JPG first for ${name} on mobile for faster loading`);
      } else {
        // On desktop, try WebP first for better quality/size ratio
        imgPath = `/raade-individual-e-board-photos-webp/${formattedName}-raade-website-image.webp`;
      }
    } else {
      // On retry, use opposite format from what was tried first
      if (isMobile) {
        imgPath = `/raade-individual-e-board-photos-webp/${formattedName}-raade-website-image.webp`;
      } else {
        imgPath = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
      }
    }
    
    console.log(`Loading image for ${name} from path: ${imgPath}, retry: ${retryCount}`);
    
    // Set the image source - this will be used by the img element
    setImageSrc(imgPath);
    
    // Create an image object to pre-load
    const img = new Image();
    
    // Important: Don't add timestamp to prevent caching - allow browser cache to work
    img.src = imgPath;
    
    // Set up proper event handlers
    img.onload = () => {
      console.log(`Pre-loaded team member image: ${name} successfully`);
      setImageLoaded(true);
      setImageError(false);
      onImageLoad?.();
    };
    
    img.onerror = (e) => {
      console.error(`Failed to load team member image: ${name}, retry: ${retryCount + 1}/${MAX_RETRIES}`, e);
      
      if (retryCount < MAX_RETRIES) {
        // Reduced delay between retries for faster fallback
        const delay = 500 * (retryCount + 1); // Reduced from 1000ms
        console.log(`Will retry loading ${name} in ${delay}ms`);
        
        setTimeout(() => {
          setRetryCount(retryCount + 1);
        }, delay);
      } else {
        console.log(`Max retries reached for ${name}, showing fallback`);
        setImageError(true);
      }
    };
    
    // Set eager loading for first few images
    // This improves initial loading performance significantly
    const eagerLoadingThreshold = 6; // First 6 images load eagerly
    if (imageRef.current) {
      // Extract the index from the formatted name if available
      const memberIndex = teamMembers.findIndex(m => 
        m.name.split(" ").join("-") === formattedName
      );
      
      if (memberIndex >= 0 && memberIndex < eagerLoadingThreshold) {
        imageRef.current.loading = 'eager';
        console.log(`Setting eager loading for ${name} (priority image)`);
      }
      // For non-priority images, use native lazy loading
      else if ('loading' in HTMLImageElement.prototype) {
        imageRef.current.loading = 'lazy';
      }
    }
    
    // Cleanup to prevent memory leaks
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [name, onImageLoad, retryCount, imageError, setImageError, setRetryCount, isMobile, isLowBandwidth]);

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

// Get reference to team data
const teamMembers = [
  // This line is needed for the index lookup in the component
  // The actual data is imported elsewhere
];

// Try to get actual team members array from the imported data
try {
  const importedData = require('../TeamData').teamMembers;
  if (Array.isArray(importedData)) {
    Object.assign(teamMembers, importedData);
  }
} catch (e) {
  console.warn("Could not import team data for indexing in ImageLoader");
}

export default ImageLoader;
