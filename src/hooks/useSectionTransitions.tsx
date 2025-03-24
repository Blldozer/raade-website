
import { useEffect } from 'react';
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
  // Move state declarations outside the component to avoid React hook errors
  let isLowPerformanceDevice = false;
  let animationsEnabled = true;
  
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
    
    // Create local mutable state
    let mountedRef = true;
    let isInitialized = false;
    
    try {
      // Register GSAP plugins centrally
      registerGsapPlugins();
      
      // Detect device performance
      isLowPerformanceDevice = detectLowPerformanceDevice();
      console.log("Low performance device detected:", isLowPerformanceDevice);
      
      // Set up ScrollTrigger optimization globally
      if (gsap.utils.checkPrefix("ScrollTrigger")) {
        ScrollTrigger.config({
          ignoreMobileResize: true,
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
        });
      }
      
      // Mark as initialized
      isInitialized = true;
    } catch (error) {
      console.error("Error in section transitions initialization:", error);
      animationsEnabled = false;
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
    }
    
    return () => {
      // Signal component unmount
      mountedRef = false;
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
        
        // Remove performance mode class if it was added
        if (isLowPerformanceDevice) {
          document.body.classList.remove('low-performance-mode');
        }
      } catch (error) {
        console.error("Error cleaning up ScrollTrigger:", error);
      }
    };
  }, []); // Only run once on mount
  
  // Return the state values that might be useful for consumers
  return { isLowPerformanceDevice, animationsEnabled };
};
