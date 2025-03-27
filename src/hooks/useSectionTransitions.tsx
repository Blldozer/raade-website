
import React, { useEffect, useState } from 'react';
import { useNavBackground } from './useNavBackground';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { registerGsapPlugins } from '@/utils/gsapUtils';
import { useSafeHook } from '@/utils/reactContextError';

/**
 * useSectionTransitions Hook
 * 
 * Manages global section transitions and animations
 * Detects device performance and adjusts accordingly
 * Enhanced with better error handling for React context issues
 */
export const useSectionTransitions = () => {
  // First check if we can safely access React hooks
  if (typeof React === 'undefined' || typeof useState !== 'function') {
    console.warn("useSectionTransitions: React hooks not available");
    return { 
      isLowPerformanceDevice: false, 
      animationsEnabled: false 
    };
  }
  
  try {
    // Use state hooks to track performance & animation state
    const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);
    const [animationsEnabled, setAnimationsEnabled] = useState(true);
    
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
      
      // Local variables for tracking state during this effect
      let isInitialized = false;
      
      try {
        // Register GSAP plugins centrally
        registerGsapPlugins();
        
        // Detect device performance
        const isLowPerfDevice = detectLowPerformanceDevice();
        setIsLowPerformanceDevice(isLowPerfDevice);
        console.log("Low performance device detected:", isLowPerfDevice);
        
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
        setAnimationsEnabled(false);
      }
      
      // If device is low performance, apply minimal animations
      if (isLowPerformanceDevice) {
        console.log("Using minimal animations for low-performance device");
        document.body.classList.add('low-performance-mode');
      }
      
      return () => {
        // Signal component unmount
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
  } catch (error) {
    console.error("useSectionTransitions: Critical error:", error);
    // Return sensible defaults if the hook fails
    return { 
      isLowPerformanceDevice: false, 
      animationsEnabled: false 
    };
  }
};
