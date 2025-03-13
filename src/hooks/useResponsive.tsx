
import { useState, useEffect } from "react";
import { useIsMobile } from "./use-mobile";

export const useResponsive = () => {
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [breakpoint, setBreakpoint] = useState<string>('xs');
  const [hasPrecisePointer, setHasPrecisePointer] = useState(true);
  const [hasHoverCapability, setHasHoverCapability] = useState(true);
  const [hasCoarsePointer, setHasCoarsePointer] = useState(false);
  const [touchCapability, setTouchCapability] = useState<'none' | 'limited' | 'full'>('none');
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('high');
  const [preferReducedMotion, setPreferReducedMotion] = useState(false);
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

    // Check for pointer capabilities
    if (window.matchMedia) {
      // Check if the device has hover capability
      const hasHoverQuery = window.matchMedia('(hover: hover)');
      setHasHoverCapability(hasHoverQuery.matches);
      
      // Check if the device has a coarse pointer (typically touch)
      const hasCoarsePointerQuery = window.matchMedia('(pointer: coarse)');
      setHasCoarsePointer(hasCoarsePointerQuery.matches);
      
      // Check if the device has a fine pointer (mouse, stylus)
      const hasFinePointerQuery = window.matchMedia('(pointer: fine)');
      setHasPrecisePointer(hasFinePointerQuery.matches);
      
      // Check if user prefers reduced motion
      const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPreferReducedMotion(prefersReducedMotionQuery.matches);
    }
    
    // Determine touch capability
    if ('ontouchstart' in window) {
      setTouchCapability(hasCoarsePointer ? 'full' : 'limited');
    } else {
      setTouchCapability('none');
    }
    
    // Rough performance estimate based on device type and screen resolution
    if (deviceType === 'mobile' || (width * height > 2000000)) {
      setPerformanceLevel('medium');
    } else if (width * height > 4000000) {
      setPerformanceLevel('low');
    } else {
      setPerformanceLevel('high');
    }

    // Check immediately
    checkSize();

    // Add event listener
    window.addEventListener("resize", checkSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkSize);
  }, [deviceType, hasCoarsePointer, width, height]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    width,
    height,
    orientation,
    breakpoint,
    deviceType,
    hasPrecisePointer,
    hasHoverCapability,
    hasCoarsePointer,
    touchCapability,
    performanceLevel,
    preferReducedMotion
  };
};

// Default export for backward compatibility
const useResponsiveHook = useResponsive;
export default useResponsiveHook;
