
import { useEffect, useState, useRef } from 'react';
import { useNavBackground } from './useNavBackground';
import { useOptimizedParallax } from './useOptimizedParallax';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { registerGsapPlugins } from '@/utils/gsapUtils';

// Register plugins centrally
registerGsapPlugins();

// Add type declaration for Device Memory API
declare global {
  interface Navigator {
    deviceMemory?: number;
  }
}

// Helper to detect device performance capabilities safely
const detectLowPerformanceDevice = () => {
  try {
    // Check for mobile devices which typically have lower performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check if device has limited memory
    const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    
    return isMobile || hasLimitedMemory;
  } catch (error) {
    console.error("Error detecting device performance:", error);
    // Default to false to avoid breaking functionality
    return false;
  }
};

export const useSectionTransitions = () => {
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const mountedRef = useRef(true);
  const initializeRef = useRef(false);
  const abortController = useRef(new AbortController());
  
  // Initialization with error handling
  useEffect(() => {
    console.log("Initializing section transitions");
    
    // Create a new abort controller for this mount cycle
    abortController.current = new AbortController();
    
    // Mark component as mounted
    mountedRef.current = true;
    
    try {
      // Detect device performance
      const isLowPerf = detectLowPerformanceDevice();
      console.log("Low performance device detected:", isLowPerf);
      setIsLowPerformanceDevice(isLowPerf);
      
      // Set up ScrollTrigger optimization globally
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize", // Reduce refresh events
      });
      
      // Only initialize animations when document is fully loaded
      if (document.readyState === 'complete') {
        initializeAnimations();
      } else {
        // Wait for document to be fully loaded before initializing animations
        const handleLoad = () => {
          if (mountedRef.current) {
            initializeAnimations();
          }
        };
        
        window.addEventListener('load', handleLoad);
        return () => {
          window.removeEventListener('load', handleLoad);
        };
      }
    } catch (error) {
      console.error("Error in section transitions initialization:", error);
      // Disable animations if there's an error
      setAnimationsEnabled(false);
    }
    
    // Setup initialization
    function initializeAnimations() {
      try {
        // Add an error handling mechanism
        const originalScrollTriggerRefresh = ScrollTrigger.refresh;
        ScrollTrigger.refresh = function() {
          try {
            // @ts-ignore - applying arguments in a safe way
            originalScrollTriggerRefresh.apply(this, arguments);
          } catch (error) {
            console.error("Error in ScrollTrigger.refresh:", error);
          }
        };
        
        // Mark as initialized
        initializeRef.current = true;
      } catch (error) {
        console.error("Error in animation initialization:", error);
      }
    }
    
    return () => {
      // Signal component unmount
      mountedRef.current = false;
      
      // Abort any pending operations
      abortController.current.abort("Component unmounting");
      
      try {
        // Clean up ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => {
          try {
            trigger.kill();
          } catch (e) {
            console.error("Error killing ScrollTrigger:", e);
          }
        });
        ScrollTrigger.clearMatchMedia();
      } catch (error) {
        console.error("Error cleaning up ScrollTrigger:", error);
      }
    };
  }, []);
  
  // Load core animations
  useEffect(() => {
    // If animations are disabled, skip all animations
    if (!animationsEnabled || !initializeRef.current || !mountedRef.current) {
      return;
    }
    
    const signal = abortController.current.signal;
    
    // Always use navigation background updates (optimized version)
    try {
      useNavBackground();
    } catch (error) {
      console.error("Error in NavBackground:", error);
    }
    
    // If device is low performance, apply minimal animations
    if (isLowPerformanceDevice) {
      console.log("Using minimal animations for low-performance device");
      
      // Apply only critical animations for user experience
      document.body.classList.add('low-performance-mode');
      
      return () => {
        if (mountedRef.current) {
          document.body.classList.remove('low-performance-mode');
        }
      };
    }
    
    // For higher performance devices, use optimized parallax
    try {
      useOptimizedParallax(signal);
    } catch (error) {
      console.error("Error in Optimized Parallax:", error);
    }
    
    // Load Future Showcase and General animations
    // Now handled directly in the components themselves
    
    // Nothing to clean up in this effect
  }, [animationsEnabled, isLowPerformanceDevice]);
  
  // Return nothing as this is just setting up global animations
};
