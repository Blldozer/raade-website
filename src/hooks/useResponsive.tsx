
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
 */
export const useResponsive = () => {
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
};

// Default export for backward compatibility
export default useResponsive;
