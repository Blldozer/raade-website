
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface TeamMemberProps {
  member: {
    name: string;
    classYear: string;
    position: string;
    linkedin?: string;
  };
  index: number;
  onImageLoad?: () => void;
}

/**
 * TeamMember component - Displays individual team member information
 * Features:
 * - Optimized image loading with progressive enhancement
 * - Robust error handling with multiple fallback strategies
 * - Mobile-optimized responsive design
 * - Performance-focused animations
 */
const TeamMember = ({ member, index, onImageLoad }: TeamMemberProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const MAX_RETRIES = 2;

  // Check if we're in a low bandwidth situation
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  
  useEffect(() => {
    // Check connection type if available
    if ('connection' in navigator && navigator.connection) {
      const connection = navigator.connection as any;
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        setIsLowBandwidth(true);
      }
      
      // Listen for changes to connection quality
      const updateConnectionStatus = () => {
        setIsLowBandwidth(connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g');
      };
      
      connection.addEventListener('change', updateConnectionStatus);
      return () => connection.removeEventListener('change', updateConnectionStatus);
    }
  }, []);

  // Preload image with retry logic
  useEffect(() => {
    // Prevent unnecessary retries if we already have too many
    if (retryCount >= MAX_RETRIES && imageError) {
      console.log(`Maximum retries reached for ${member.name}, using fallback`);
      return;
    }

    // Create proper image path with safeguards
    const formattedName = member.name.split(" ").join("-");
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
      console.log(`Pre-loaded team member image: ${member.name}`);
      setImageLoaded(true);
      setImageError(false);
      onImageLoad?.();
    };
    
    img.onerror = () => {
      console.error(`Failed to load team member image: ${member.name}, retry: ${retryCount + 1}/${MAX_RETRIES}`);
      
      if (retryCount < MAX_RETRIES) {
        // Wait a bit longer between each retry
        const delay = 1000 * (retryCount + 1);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
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
  }, [member.name, onImageLoad, retryCount, imageError]);

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

  // Animation variants with reduced complexity for better performance on mobile
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.5
      }
    }
  };

  // Placeholder initials for fallback
  const getInitials = () => {
    const nameParts = member.name.split(" ");
    return `${nameParts[0][0]}${nameParts[1]?.[0] || ''}`;
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={item}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#3C403A] rounded-lg" />
      <div className="relative z-10">
        <div className="rounded-t-lg overflow-hidden">
          {/* Render fallback if image failed to load */}
          {imageError ? (
            <div className="w-full aspect-[3/4] bg-[#4C504A] flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                {getInitials()}
              </span>
            </div>
          ) : (
            /* Render image with proper loading states */
            <div className="w-full aspect-[3/4] bg-[#4C504A] relative">
              {/* Show skeleton loading state */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl">Loading...</span>
                </div>
              )}
              
              {/* The actual image with proper error and load handling */}
              {imageSrc && (
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt={member.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    if (retryCount >= MAX_RETRIES) {
                      setImageError(true);
                    }
                  }}
                  // Use lower quality source for low bandwidth situations
                  loading="lazy"
                />
              )}
            </div>
          )}
        </div>
        
        <div className="p-8">
          {member.linkedin ? (
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-simula text-white mb-2 flex items-center gap-3">
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#FBB03B] transition-colors flex items-center gap-2"
              >
                {member.name} <Linkedin className="w-6 h-6 md:w-8 md:h-8 inline text-[#FBB03B]" />
              </a>
            </h3>
          ) : (
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-simula text-white mb-2">
              {member.name}
            </h3>
          )}
          <p className="text-xl md:text-2xl text-gray-300 font-lora">
            {member.position}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
