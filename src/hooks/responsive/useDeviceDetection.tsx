
import { useState, useEffect } from "react";
import { useIsMobile } from "../use-mobile";
import { DeviceType } from "./usePerformanceDetection";

/**
 * Hook for detecting device type and screen measurements
 * 
 * Features:
 * - Reactive updates when screen size changes
 * - Provides comprehensive device information
 * - Better handling of server-side rendering
 */
export const useDeviceDetection = () => {
  // Get mobile state from our dedicated hook
  const isMobile = useIsMobile();
  
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
  
  // Get initial state within the component function
  const [state, setState] = useState(() => {
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
  });

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;
    
    const checkSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setState({
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1440,
        isLargeDesktop: width >= 1440,
        width,
        height,
        orientation: height > width ? 'portrait' : 'landscape',
        breakpoint: getBreakpoint(width),
        deviceType: getDeviceType(width)
      });
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
    isTablet: state.isTablet,
    isDesktop: state.isDesktop,
    isLargeDesktop: state.isLargeDesktop,
    width: state.width,
    height: state.height,
    orientation: state.orientation,
    breakpoint: state.breakpoint,
    deviceType: state.deviceType
  };
};
