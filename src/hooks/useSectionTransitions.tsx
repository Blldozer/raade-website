
import { useEffect, useState } from 'react';
import { useNavBackground } from './useNavBackground';
import { useOptimizedParallax } from './useOptimizedParallax';
import { useTransitionStatAnimation } from './useTransitionStatAnimation';
import { useTransitionHookAnimation } from './useTransitionHookAnimation';
import { useFutureShowcaseAnimation } from './useFutureShowcaseAnimation';
import { useGeneralSectionAnimations } from './useGeneralSectionAnimations';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  
  // Initialization with error handling
  useEffect(() => {
    console.log("Initializing section transitions");
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
      
      // Add an error handling mechanism
      const originalScrollTriggerRefresh = ScrollTrigger.refresh;
      ScrollTrigger.refresh = function() {
        try {
          originalScrollTriggerRefresh.apply(this, arguments);
        } catch (error) {
          console.error("Error in ScrollTrigger.refresh:", error);
        }
      };
      
    } catch (error) {
      console.error("Error in section transitions initialization:", error);
      // Disable animations if there's an error
      setAnimationsEnabled(false);
    }
    
    return () => {
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
  
  // If animations are disabled, skip all animations
  if (!animationsEnabled) {
    console.log("Animations disabled due to previous errors");
    return;
  }
  
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
    useEffect(() => {
      try {
        // Apply minimal CSS-based animations using classes instead of heavy GSAP animations
        document.body.classList.add('low-performance-mode');
        
        return () => {
          document.body.classList.remove('low-performance-mode');
        };
      } catch (error) {
        console.error("Error applying low-performance mode:", error);
      }
    }, []);
    
    // Still use Future Showcase animations even on low performance devices
    try {
      useFutureShowcaseAnimation();
    } catch (error) {
      console.error("Error in Future Showcase animations:", error);
    }
    
    // Still use general section animations but they'll respect the low-performance CSS
    try {
      useGeneralSectionAnimations();
    } catch (error) {
      console.error("Error in General Section animations:", error);
    }
    
    return;
  }
  
  // For higher performance devices, use optimized animations
  // Use the new optimized parallax implementation instead of individual hooks
  // Wrap each animation hook in try-catch to prevent failures from breaking rendering
  try {
    useOptimizedParallax();
  } catch (error) {
    console.error("Error in Optimized Parallax:", error);
  }
  
  try {
    useTransitionStatAnimation();
  } catch (error) {
    console.error("Error in Transition Stat animations:", error);
  }
  
  try {
    useTransitionHookAnimation();
  } catch (error) {
    console.error("Error in Transition Hook animations:", error);
  }
  
  // Future Showcase animations - load this before general animations
  try {
    useFutureShowcaseAnimation();
  } catch (error) {
    console.error("Error in Future Showcase animations:", error);
  }
  
  // General section animations (for non-specific sections)
  try {
    useGeneralSectionAnimations();
  } catch (error) {
    console.error("Error in General Section animations:", error);
  }
};
