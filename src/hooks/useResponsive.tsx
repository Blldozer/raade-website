
import { useDeviceDetection } from "./responsive/useDeviceDetection";
import { useInputCapabilities } from "./responsive/useInputCapabilities";
import { usePerformanceDetection } from "./responsive/usePerformanceDetection";

/**
 * Main responsive hook that combines all device detection capabilities
 * 
 * Provides comprehensive information about:
 * - Device type and screen size
 * - Input capabilities (touch, pointer, hover)
 * - Performance estimation
 * - Accessibility preferences
 * 
 * Enhanced with better error handling and SSR safety
 */
export const useResponsive = () => {
  // Check if we're in a safe environment for React hooks
  const isSafeEnvironment = typeof window !== 'undefined';
                            
  try {
    // Use the device detection hook to get device information
    const deviceInfo = useDeviceDetection();
    
    // Get input capabilities
    const inputCapabilities = useInputCapabilities();
    
    // Get performance level based on device type
    const { performanceLevel } = usePerformanceDetection(
      deviceInfo.deviceType,
      deviceInfo.width,
      deviceInfo.height
    );

    // Combine and return all responsive information
    return {
      ...deviceInfo,
      ...inputCapabilities,
      performanceLevel
    };
  } catch (error) {
    // If any hooks fail, return safe default values
    console.error("Error in useResponsive hook:", error);
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLargeDesktop: false,
      width: 1024,
      height: 768,
      orientation: 'landscape' as const,
      breakpoint: 'lg' as const,
      deviceType: 'desktop' as const,
      hasTouch: false,
      hasPointer: true,
      hasHover: true,
      performanceLevel: 'high' as const
    };
  }
};

// Default export for backward compatibility
export default useResponsive;
