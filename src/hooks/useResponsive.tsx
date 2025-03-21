
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
  const deviceInfo = useDeviceDetection();
  const inputCapabilities = useInputCapabilities();
  const { performanceLevel } = usePerformanceDetection(
    deviceInfo.deviceType,
    deviceInfo.width,
    deviceInfo.height
  );

  return {
    ...deviceInfo,
    ...inputCapabilities,
    performanceLevel
  };
};

// Default export for backward compatibility
const useResponsiveHook = useResponsive;
export default useResponsiveHook;
