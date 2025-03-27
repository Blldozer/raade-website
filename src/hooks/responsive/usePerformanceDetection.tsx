
import { useState, useEffect } from "react";

// Define the device type as a union type to ensure type safety
export type DeviceType = "mobile" | "tablet" | "desktop" | "large-desktop";

/**
 * Hook to estimate device performance based on device type and screen dimensions
 * 
 * Features:
 * - Estimates performance level based on device type and screen resolution
 * - Adjusts animations and effects based on performance level
 * - Provides fallbacks for low-performance devices
 * - Enhanced with proper SSR handling
 */
export const usePerformanceDetection = (
  deviceType: DeviceType,
  screenWidth: number,
  screenHeight: number
) => {
  // Safe default for SSR and initial render
  const [performanceLevel, setPerformanceLevel] = useState<"high" | "medium" | "low">("medium");

  // Detect performance level based on device type and screen resolution
  useEffect(() => {
    // Determine performance level based on device type and screen resolution
    const calculatePerformanceLevel = () => {
      // High-resolution screens on mobile devices can cause performance issues
      const isHighResolution = screenWidth * screenHeight > 2073600; // More than 1920x1080
      
      if (deviceType === "mobile") {
        return isHighResolution ? "low" : "medium";
      } else if (deviceType === "tablet") {
        return isHighResolution ? "medium" : "high";
      } else {
        // desktop and large-desktop
        return "high";
      }
    };

    setPerformanceLevel(calculatePerformanceLevel());
  }, [deviceType, screenWidth, screenHeight]);

  return { performanceLevel };
};
