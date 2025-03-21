
import { useState, useEffect, useRef, RefObject } from "react";
import { useResponsive } from "../../../hooks/useResponsive"; 
import { teamMembers } from "../TeamData";

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
 * - Improved mobile handling with explicit error logging
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
  const [connectionType, setConnectionType] = useState<string>('unknown');
  
  // Track network status explicitly 
  const [isNetworkActive, setIsNetworkActive] = useState<boolean>(navigator.onLine);
  
  // Monitor network status actively
  useEffect(() => {
    console.log(`[DEBUG-TEAM] Initial network status: ${navigator.onLine ? 'online' : 'offline'} for ${name}`);
    
    const handleOnline = () => {
      console.log(`[DEBUG-TEAM] Network is online for ${name}`);
      setIsNetworkActive(true);
    };
    
    const handleOffline = () => {
      console.log(`[DEBUG-TEAM] Network is offline for ${name}`);
      setIsNetworkActive(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [name]);
  
  // Log connection info on mount to help debug
  useEffect(() => {
    console.log(`[DEBUG-TEAM] Initializing ImageLoader for ${name} (Mobile: ${isMobile}, Retry: ${retryCount})`);
    
    // Check connection type if available
    if ('connection' in navigator && navigator.connection) {
      const connection = (navigator as NavigatorWithConnection).connection;
      if (connection) {
        const effectiveType = connection.effectiveType || 'unknown';
        setConnectionType(effectiveType);
        console.log(`[DEBUG-TEAM] Connection type for ${name}: ${effectiveType}`);
        
        setIsLowBandwidth(effectiveType === '2g' || effectiveType === 'slow-2g');
        
        // Listen for changes to connection quality
        const updateConnectionStatus = () => {
          if (connection) {
            const newEffectiveType = connection.effectiveType || 'unknown';
            console.log(`[DEBUG-TEAM] Connection changed to: ${newEffectiveType} for ${name}`);
            setConnectionType(newEffectiveType);
            setIsLowBandwidth(newEffectiveType === '2g' || newEffectiveType === 'slow-2g');
          }
        };
        
        connection.addEventListener('change', updateConnectionStatus);
        return () => connection.removeEventListener('change', updateConnectionStatus);
      }
    } else {
      console.log(`[DEBUG-TEAM] Connection API not available for ${name}`);
    }
  }, [name, isMobile, retryCount]);

  // Preload image with improved retry logic
  useEffect(() => {
    // Prevent unnecessary retries if we already have too many
    if (retryCount >= MAX_RETRIES && imageError) {
      console.log(`[DEBUG-TEAM] Maximum retries reached for ${name}, using fallback`);
      return;
    }

    // Safety check for network status before attempting to load
    if (!isNetworkActive) {
      console.log(`[DEBUG-TEAM] Network is offline, delaying image load for ${name}`);
      return; // Don't attempt to load when offline
    }

    // Create proper image path with robust formatting
    // Remove special characters and normalize spaces
    const safeName = name.replace(/[^\w\s-]/gi, '').trim();
    const formattedName = safeName.split(" ").join("-");
    
    console.log(`[DEBUG-TEAM] Formatted name: "${formattedName}" from "${name}"`);
    
    // Determine which format to use based on retry count and device
    let imgPath;
    
    // Enhanced strategy with explicit logging
    if (retryCount === 0) {
      // First try - pick optimal format based on device
      if (isMobile) {
        // On mobile, start with JPG for faster loading and better compatibility
        imgPath = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
        console.log(`[DEBUG-TEAM] First attempt: JPG for ${name} on mobile, path: ${imgPath}`);
      } else {
        // On desktop, try WebP first for better quality/size ratio
        imgPath = `/raade-individual-e-board-photos-webp/${formattedName}-raade-website-image.webp`;
        console.log(`[DEBUG-TEAM] First attempt: WebP for ${name} on desktop, path: ${imgPath}`);
      }
    } else {
      // On retry, use opposite format from what was tried first
      if (isMobile) {
        imgPath = `/raade-individual-e-board-photos-webp/${formattedName}-raade-website-image.webp`;
        console.log(`[DEBUG-TEAM] Retry ${retryCount}: WebP for ${name} on mobile, path: ${imgPath}`);
      } else {
        imgPath = `/raade-individual-e-board-photos/${formattedName}-raade-website-image.jpg`;
        console.log(`[DEBUG-TEAM] Retry ${retryCount}: JPG for ${name} on desktop, path: ${imgPath}`);
      }
    }
    
    console.log(`[DEBUG-TEAM] Starting image load for ${name} from path: ${imgPath}, retry: ${retryCount}`);
    
    // Set the image source - this will be used by the img element
    setImageSrc(imgPath);
    
    // Create an image object to pre-load
    const img = new Image();
    
    // Set up proper event handlers
    img.onload = () => {
      console.log(`[DEBUG-TEAM] Successfully loaded image for ${name}`);
      setImageLoaded(true);
      setImageError(false);
      onImageLoad?.();
    };
    
    img.onerror = (e) => {
      console.error(`[DEBUG-TEAM] Failed to load image for ${name} from ${imgPath}, error:`, e);
      
      // Check if the image actually exists by making a HEAD request
      fetch(imgPath, { method: 'HEAD' })
        .then(response => {
          console.log(`[DEBUG-TEAM] HEAD request for ${imgPath} returned status: ${response.status} (${response.ok ? 'OK' : 'Not Found'})`);
        })
        .catch(error => {
          console.error(`[DEBUG-TEAM] HEAD request for ${imgPath} failed:`, error);
        });
      
      if (retryCount < MAX_RETRIES) {
        // Reduced delay between retries for faster fallback
        const delay = 500 * (retryCount + 1); // Reduced from 1000ms
        console.log(`[DEBUG-TEAM] Will retry loading ${name} in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`);
        
        setTimeout(() => {
          setRetryCount(retryCount + 1);
        }, delay);
      } else {
        console.log(`[DEBUG-TEAM] Max retries reached for ${name}, showing fallback`);
        setImageError(true);
      }
    };
    
    // Start loading the image
    img.src = imgPath;
    
    // Cleanup to prevent memory leaks
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [name, onImageLoad, retryCount, imageError, setImageError, setRetryCount, isMobile, isNetworkActive]);

  // Register image with service worker cache if available
  useEffect(() => {
    if (imageSrc && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // Tell service worker to cache this image
      console.log(`[DEBUG-TEAM] Requesting cache for ${imageSrc}`);
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
