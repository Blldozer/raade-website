
import { useState, useEffect } from "react";

/**
 * Hook for detecting device performance capabilities
 * 
 * Provides estimated performance level based on:
 * - Device type
 * - Screen resolution (higher resolution = more pixels to render)
 */
export const usePerformanceDetection = (
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'large-desktop', 
  width: number, 
  height: number
) => {
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    // Rough performance estimate based on device type and screen resolution
    if (deviceType === 'mobile' || (width * height > 2000000)) {
      setPerformanceLevel('medium');
    } else if (width * height > 4000000) {
      setPerformanceLevel('low');
    } else {
      setPerformanceLevel('high');
    }
  }, [deviceType, width, height]);

  return { performanceLevel };
};
