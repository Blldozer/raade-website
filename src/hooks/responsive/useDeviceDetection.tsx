
import { useState, useEffect } from "react";
import { useIsMobile } from "../use-mobile";

/**
 * Hook for detecting device type and screen measurements
 * 
 * Provides information about:
 * - Device type (mobile, tablet, desktop, large-desktop)
 * - Screen dimensions and orientation
 * - Tailwind breakpoint detection
 */
export const useDeviceDetection = () => {
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [breakpoint, setBreakpoint] = useState<string>('xs');
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop' | 'large-desktop'>('desktop');

  useEffect(() => {
    const checkSize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      
      setWidth(currentWidth);
      setHeight(currentHeight);
      setOrientation(currentHeight > currentWidth ? 'portrait' : 'landscape');
      
      // Set device types and breakpoints
      if (currentWidth < 640) {
        setDeviceType('mobile');
        setBreakpoint('xs');
      } else if (currentWidth >= 640 && currentWidth < 768) {
        setDeviceType('mobile');
        setBreakpoint('sm');
      } else if (currentWidth >= 768 && currentWidth < 1024) {
        setIsTablet(true);
        setDeviceType('tablet');
        setBreakpoint('md');
      } else if (currentWidth >= 1024 && currentWidth < 1280) {
        setIsDesktop(true);
        setDeviceType('desktop');
        setBreakpoint('lg');
      } else if (currentWidth >= 1280 && currentWidth < 1440) {
        setIsDesktop(true);
        setDeviceType('desktop');
        setBreakpoint('xl');
      } else {
        setIsLargeDesktop(true);
        setDeviceType('large-desktop');
        setBreakpoint('2xl');
      }
    };

    // Check immediately
    checkSize();

    // Add event listener
    window.addEventListener("resize", checkSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    width,
    height,
    orientation,
    breakpoint,
    deviceType
  };
};
