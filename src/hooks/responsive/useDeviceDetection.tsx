import React, { useState, useEffect } from "react";
import { useMobile } from "../use-mobile";
import { DeviceType } from "./usePerformanceDetection";

/**
 * Hook for detecting device type and screen measurements
 * 
 * Features:
 * - Reactive updates when screen size changes
 * - Provides comprehensive device information
 * - Enhanced SSR handling to prevent React hook errors
 * - Resilient to React context issues
 */
export const useDeviceDetection = () => {
  // Check if we're in a browser environment first
  const isBrowser = typeof window !== 'undefined';
  
  // Check if React is properly initialized
  const isReactInitialized = typeof React !== 'undefined' && React !== null;
  
  // Get current window dimensions
  const [windowSize, setWindowSize] = useState({ 
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0
  });
  
  // Simplified use of the mobile hook
  const isMobile = useMobile();
  
  // Update window size on resize
  useEffect(() => {
    if (!isBrowser) return;
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isBrowser]);
  
  // Compute device properties
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;
  
  // Compute device type
  const deviceType: DeviceType = 
    isMobile ? 'mobile' :
    isTablet ? 'tablet' : 
    'desktop';
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    width: windowSize.width,
    height: windowSize.height,
    deviceType
  };
};
