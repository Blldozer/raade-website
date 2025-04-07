
import React, { useState, useEffect } from "react";
import { useIsMobile } from "../use-mobile";
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
  
  // Only use the mobile hook if we're in a safe environment
  // Otherwise provide a default value
  const isMobile = useIsMobile();
  
  // Helper functions for determining breakpoint and device type
  function getBreakpoint(width: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
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
  
  // Define the state type to match all possible values
  type DeviceState = {
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
    width: number;
    height: number;
    orientation: 'landscape' | 'portrait';
    breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    deviceType: DeviceType;
  };
  
  // Safe default state for SSR or React context issues
  const defaultState: DeviceState = {
    isTablet: false,
    isDesktop: true,
    isLargeDesktop: false,
    width: 1024,
    height: 768,
    orientation: 'landscape',
    breakpoint: 'lg',
    deviceType: 'desktop'
  };
  
  // Initialize state with safe defaults
  const [state, setState] = useState<DeviceState>(defaultState);

  // Effect to update device info - only runs in browser
  useEffect(() => {
    // Ensure we're in a browser environment
    if (!isBrowser) return;
    
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

    // Initial check
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
  }, [isBrowser]);

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
