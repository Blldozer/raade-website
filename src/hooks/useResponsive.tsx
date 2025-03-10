
import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';
type Orientation = 'portrait' | 'landscape';
type OSType = 'iOS' | 'Android' | 'Windows' | 'macOS' | 'Linux' | 'unknown';

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

export const useResponsive = (): ResponsiveData => {
  const [state, setState] = useState<ResponsiveData>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    deviceType: 'desktop',
    orientation: 'landscape',
    os: 'unknown',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isWindowsDevice: false,
    isMacDevice: false,
    isTouchDevice: false,
    breakpoint: 'lg',
  });

  useEffect(() => {
    const getDeviceType = (width: number): DeviceType => {
      if (width < 640) return 'mobile';
      if (width < 1024) return 'tablet';
      if (width < 1280) return 'laptop';
      return 'desktop';
    };

    const getOrientation = (width: number, height: number): Orientation => {
      return width > height ? 'landscape' : 'portrait';
    };

    const updateState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const deviceType = getDeviceType(width);
      const orientation = getOrientation(width, height);
      const os = detectOS();
      const breakpoint = getBreakpoint(width);
      
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
      });
    };

    // Initial update
    updateState();

    // Add event listener for resize
    window.addEventListener('resize', updateState);
    
    // Add event listener for orientation change
    window.addEventListener('orientationchange', updateState);

    // Clean up
    return () => {
      window.removeEventListener('resize', updateState);
      window.removeEventListener('orientationchange', updateState);
    };
  }, []);

  return state;
};

export default useResponsive;
