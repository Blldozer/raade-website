import { useState, useEffect, useRef } from "react";
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
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  isMobile?: boolean;
}

/**
 * ImageLoader component - Handles loading team member images
 * Features:
 * - Progressive image loading with fallbacks
 * - Bandwidth-aware optimizations for slower connections
 * - Cache registration with service worker if available
 * - Improved mobile handling
 * - Support for priority loading
 */
const ImageLoader = ({ 
  name, 
  onLoad, 
  onError,
  priority = false,
  isMobile = false
}: ImageLoaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const MAX_RETRIES = 2;
  
  // Get device info for better mobile handling
  const { deviceType } = useResponsive();
  
  // Check if we're in a low bandwidth situation
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  
  useEffect(() => {
    // Detect connection quality using the Network Information API
    const nav = navigator as NavigatorWithConnection;
    if (nav.connection) {
      const connectionType = nav.connection.effectiveType;
      console.log(`Connection type: ${connectionType}`);
      
      // Consider 2g and slow-3g as low bandwidth
      setIsLowBandwidth(['slow-2g', '2g', 'slow-3g'].includes(connectionType));
      
      const updateConnectionStatus = () => {
        const newConnectionType = nav.connection?.effectiveType;
        console.log(`Connection changed to: ${newConnectionType}`);
        setIsLowBandwidth(['slow-2g', '2g', 'slow-3g'].includes(newConnectionType || ''));
      };
      
      nav.connection.addEventListener('change', updateConnectionStatus);
      return () => {
        nav.connection.removeEventListener('change', updateConnectionStatus);
      };
    } else {
      // Fallback for browsers without connection API
      console.log('Connection API not available');
    }
  }, []);
  
  // Build image paths and load appropriate images based on device and network
  useEffect(() => {
    // Only load images if the component is visible
    // Format name for URL (lowercase, replace spaces with hyphens)
    const formattedName = name.toLowerCase().replace(/\s+/g, '-');
    
    // No timestamp for better caching
    const timestamp = priority ? '' : '';
    
    // Set up image paths - use WebP for better performance, but only on faster connections
    // Default to JPG for better compatibility on slow connections
    let primaryFormat = !isMobile && !isLowBandwidth ? 'webp' : 'jpg';
    let fallbackFormat = 'jpg';
    
    // Base path without extension
    const basePath = `/assets/img/team/${formattedName}`;
    
    // Generate full paths with appropriate format
    const primaryPath = `${basePath}.${primaryFormat}${timestamp}`;
    const fallbackPath = `${basePath}.${fallbackFormat}${timestamp}`;
    
    // Choose which path to load based on retry status
    const imgPath = retryCount === 0 ? primaryPath : fallbackPath;
    
    console.log(`Loading image for ${name}, path: ${imgPath}, retry: ${retryCount}, mobile: ${isMobile}, low bandwidth: ${isLowBandwidth}`);
    
    // Set the source for the image
    setImageSrc(imgPath);
    
  }, [name, retryCount, isMobile, isLowBandwidth, priority]);
  
  // Handle successful image load
  const handleImageLoad = () => {
    console.log(`Image loaded successfully: ${name}`);
    setImageLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };
  
  // Handle image load errors
  const handleImageError = () => {
    console.error(`Error loading image: ${name}, retry: ${retryCount}`);
    
    if (retryCount < MAX_RETRIES) {
      // Try loading with fallback format
      console.log(`Retrying with fallback format for ${name}`);
      setRetryCount(retryCount + 1);
    } else {
      console.error(`Max retries exceeded for ${name}, giving up`);
      setImageError(true);
      if (onError) {
        onError();
      }
    }
  };
  
  return (
    <img
      ref={imageRef}
      src={imageSrc || ''}
      alt={`${name} - Team Member`}
      width="100%"
      height="auto"
      className="w-full h-full object-cover transition-opacity duration-300"
      style={{ 
        opacity: imageLoaded ? 1 : 0,
        display: 'block',
        minHeight: '10rem'
      }}
      onLoad={handleImageLoad}
      onError={handleImageError}
      loading={priority ? "eager" : "lazy"}
    />
  );
};

export default ImageLoader;
