
import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';
type Orientation = 'portrait' | 'landscape';
type OSType = 'iOS' | 'Android' | 'Windows' | 'macOS' | 'Linux' | 'unknown';
type PerformanceLevel = 'low' | 'medium' | 'high';
type TouchCapability = 'none' | 'basic' | 'advanced';

interface ResponsiveData {
  width: number;
  height: number;
  deviceType: DeviceType;
  orientation: Orientation;
  os: OSType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWindowsDevice: boolean;
  isMacDevice: boolean;
  isTouchDevice: boolean;
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  hasPrecisePointer: boolean;
  hasHoverCapability: boolean;
  hasCoarsePointer: boolean;
  performanceLevel: PerformanceLevel;
  touchCapability: TouchCapability;
  preferReducedMotion: boolean;
}

const detectOS = (): OSType => {
  const userAgent = window.navigator.userAgent;
  
  if (/Windows/.test(userAgent)) return 'Windows';
  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) return 'macOS';
  if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
  if (/Android/.test(userAgent)) return 'Android';
  if (/Linux/.test(userAgent)) return 'Linux';
  
  return 'unknown';
};

const getBreakpoint = (width: number): ResponsiveData['breakpoint'] => {
  if (width < 375) return 'xs';
  if (width < 640) return 'sm';
  if (width < 768) return 'md';
  if (width < 1024) return 'lg';
  if (width < 1280) return 'xl';
  if (width < 1400) return '2xl';
  return '3xl';
};

const detectPerformanceLevel = (): PerformanceLevel => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  
  // Removed expensive CPU check that could cause initial render delays
  
  if (isMobile || hasLimitedMemory) {
    return 'low';
  }
  
  if (
    /iPad/.test(navigator.userAgent) || 
    (/Android/.test(navigator.userAgent) && !/Mobile/.test(navigator.userAgent))
  ) {
    return 'medium';
  }
  
  return 'high';
};

const detectTouchCapability = (): TouchCapability => {
  if (!('ontouchstart' in window)) {
    return 'none';
  }
  
  const hasAdvancedTouch = 
    'maxTouchPoints' in navigator && 
    navigator.maxTouchPoints > 1 && 
    ('ontouchforcechange' in window || 'onwebkitmouseforcechanged' in window);
    
  return hasAdvancedTouch ? 'advanced' : 'basic';
};

export const useResponsive = (): ResponsiveData => {
  // Default state now initialized with safer values to prevent flash
  const [state, setState] = useState<ResponsiveData>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0;
    const height = typeof window !== 'undefined' ? window.innerHeight : 0;
    
    // Initial simple device detection
    const isMobileDevice = typeof window !== 'undefined' && 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return {
      width,
      height,
      deviceType: isMobileDevice ? 'mobile' : 'desktop',
      orientation: width > height ? 'landscape' : 'portrait',
      os: 'unknown',
      isMobile: isMobileDevice,
      isTablet: false,
      isDesktop: !isMobileDevice,
      isWindowsDevice: false,
      isMacDevice: false,
      isTouchDevice: isMobileDevice,
      breakpoint: 'lg',
      hasPrecisePointer: !isMobileDevice,
      hasHoverCapability: !isMobileDevice,
      hasCoarsePointer: isMobileDevice,
      performanceLevel: isMobileDevice ? 'low' : 'high',
      touchCapability: isMobileDevice ? 'basic' : 'none',
      preferReducedMotion: false
    };
  });

  useEffect(() => {
    // Defer complex device detection to after first render using a small timeout
    const timer = setTimeout(() => {
      const getDeviceType = (width: number): DeviceType => {
        if (width < 640) return 'mobile';
        if (width < 1024) return 'tablet';
        if (width < 1280) return 'laptop';
        return 'desktop';
      };
  
      const getOrientation = (width: number, height: number): Orientation => {
        return width > height ? 'landscape' : 'portrait';
      };
  
      const detectPointerCapabilities = () => {
        const hasHover = window.matchMedia('(hover: hover)').matches;
        const hasCoarse = window.matchMedia('(pointer: coarse)').matches;
        const hasPrecise = window.matchMedia('(pointer: fine)').matches;
        return { hasHover, hasCoarse, hasPrecise };
      };
      
      const checkReducedMotion = () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      };
  
      const updateState = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const deviceType = getDeviceType(width);
        const orientation = getOrientation(width, height);
        const os = detectOS();
        const breakpoint = getBreakpoint(width);
        const pointerCapabilities = detectPointerCapabilities();
        const performanceLevel = detectPerformanceLevel();
        const touchCapability = detectTouchCapability();
        const preferReducedMotion = checkReducedMotion();
        
        setState({
          width,
          height,
          deviceType,
          orientation,
          os,
          isMobile: deviceType === 'mobile',
          isTablet: deviceType === 'tablet',
          isDesktop: deviceType === 'laptop' || deviceType === 'desktop',
          isWindowsDevice: os === 'Windows',
          isMacDevice: os === 'macOS',
          isTouchDevice: 'ontouchstart' in window,
          breakpoint,
          hasPrecisePointer: pointerCapabilities.hasPrecise,
          hasHoverCapability: pointerCapabilities.hasHover,
          hasCoarsePointer: pointerCapabilities.hasCoarse,
          performanceLevel,
          touchCapability,
          preferReducedMotion
        });
      };
  
      updateState();
  
      window.addEventListener('resize', updateState);
      window.addEventListener('orientationchange', updateState);
      
      const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      motionMediaQuery.addEventListener('change', updateState);
  
      return () => {
        window.removeEventListener('resize', updateState);
        window.removeEventListener('orientationchange', updateState);
        motionMediaQuery.removeEventListener('change', updateState);
      };
    }, 0); // Minimal timeout to let the first render complete
    
    return () => clearTimeout(timer);
  }, []);

  return state;
};

export default useResponsive;
