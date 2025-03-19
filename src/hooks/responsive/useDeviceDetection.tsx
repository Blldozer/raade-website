
import { useState, useEffect } from "react";
import { useIsMobile } from "../use-mobile";
import { DeviceType } from "./usePerformanceDetection";

/**
 * Hook for detecting device type and screen measurements
 * 
 * Features:
 * - Immediate initial values based on window dimensions
 * - Reactive updates when screen size changes
 * - Provides comprehensive device information
 * - Better handling of server-side rendering
 */
export const useDeviceDetection = () => {
  const isMobile = useIsMobile();
  
  // Start with accurate initial values based on window dimensions
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return {
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
        width: 1024,
        height: 768,
        orientation: 'landscape' as const,
        breakpoint: 'lg' as const,
        deviceType: 'desktop' as DeviceType
      };
    }
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024 && width < 1440,
      isLargeDesktop: width >= 1440,
      width,
      height,
      orientation: height > width ? 'portrait' as const : 'landscape' as const,
      breakpoint: getBreakpoint(width),
      deviceType: getDeviceType(width)
    };
  };
  
  // Helper functions for determining breakpoint and device type
  function getBreakpoint(width: number) {
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    if (width < 1440) return 'xl';
    return '2xl';
  }
  
  function getDeviceType(width: number): DeviceType {
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    if (width < 1440) return 'desktop';
    return 'large-desktop';
  }
  
  const initialState = getInitialState();
  const [isTablet, setIsTablet] = useState(initialState.isTablet);
  const [isDesktop, setIsDesktop] = useState(initialState.isDesktop);
  const [isLargeDesktop, setIsLargeDesktop] = useState(initialState.isLargeDesktop);
  const [width, setWidth] = useState(initialState.width);
  const [height, setHeight] = useState(initialState.height);
  const [orientation, setOrientation] = useState(initialState.orientation);
  const [breakpoint, setBreakpoint] = useState(initialState.breakpoint);
  const [deviceType, setDeviceType] = useState<DeviceType>(initialState.deviceType);

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;
    
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

    // Add event listener with debounce for performance
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(checkSize, 100);
    };
    
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
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
