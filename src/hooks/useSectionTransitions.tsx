
import { useEffect, useState, useRef } from 'react';
import { useNavBackground } from './useNavBackground';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { registerGsapPlugins } from '@/utils/gsapUtils';

/**
 * useSectionTransitions Hook
 * 
 * Manages global section transitions and animations
 * Detects device performance and adjusts accordingly
 */
export const useSectionTransitions = () => {
  // Initialize state inside the hook function body
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const mountedRef = useRef(true);
  const isInitializedRef = useRef(false);
  
  // Helper to detect device performance capabilities
  const detectLowPerformanceDevice = () => {
    try {
      // Check if mobile based on user agent
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Safely check for deviceMemory using optional chaining and type assertion
      // Note: deviceMemory is experimental and not available in all browsers
      const hasLimitedMemory = ('deviceMemory' in navigator) && 
        ((navigator as any).deviceMemory < 4);
      
      return isMobile || hasLimitedMemory;
    } catch (error) {
      console.error("Error detecting device performance:", error);
      return false;
    }
  };
  
  // Setup transitions on component mount
  useEffect(() => {
    console.log("useSectionTransitions: Initializing");
    
    // Mark component as mounted
    mountedRef.current = true;
    
    try {
      // Register GSAP plugins centrally
      registerGsapPlugins();
      
      // Detect device performance
      const isLowPerf = detectLowPerformanceDevice();
      console.log("Low performance device detected:", isLowPerf);
      setIsLowPerformanceDevice(isLowPerf);
      
      // Set up ScrollTrigger optimization globally
      if (gsap.utils.checkPrefix("ScrollTrigger")) {
        ScrollTrigger.config({
          ignoreMobileResize: true,
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
        });
      }
      
      // Mark as initialized
      isInitializedRef.current = true;
    } catch (error) {
      console.error("Error in section transitions initialization:", error);
      setAnimationsEnabled(false);
    }
    
    return () => {
      // Signal component unmount
      mountedRef.current = false;
      console.log("useSectionTransitions: Cleanup");
      
      try {
        // Clean up ScrollTrigger instances
        if (gsap.utils.checkPrefix("ScrollTrigger")) {
          ScrollTrigger.getAll().forEach(trigger => {
            try {
              trigger.kill();
            } catch (e) {
              console.error("Error killing ScrollTrigger:", e);
            }
          });
          ScrollTrigger.clearMatchMedia();
        }
      } catch (error) {
        console.error("Error cleaning up ScrollTrigger:", error);
      }
    };
  }, []);
  
  // Load core animations based on device performance
  useEffect(() => {
    // Skip if animations are disabled or not initialized
    if (!animationsEnabled || !isInitializedRef.current || !mountedRef.current) {
      return;
    }
    
    // Always use navigation background updates
    try {
      useNavBackground();
    } catch (error) {
      console.error("Error in NavBackground:", error);
    }
    
    // If device is low performance, apply minimal animations
    if (isLowPerformanceDevice) {
      console.log("Using minimal animations for low-performance device");
      document.body.classList.add('low-performance-mode');
      
      return () => {
        if (mountedRef.current) {
          document.body.classList.remove('low-performance-mode');
        }
      };
    }
    
    // Nothing to clean up for this effect
  }, [animationsEnabled, isLowPerformanceDevice]);
  
  // Return the state values that might be useful for consumers
  return { isLowPerformanceDevice, animationsEnabled };
};
