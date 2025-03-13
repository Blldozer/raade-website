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

// Helper to detect device performance capabilities
const detectLowPerformanceDevice = () => {
  // Check for mobile devices which typically have lower performance
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check if device has limited memory
  const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  
  // Instead of running CPU-intensive tests, assume mobile devices need optimizations
  // This prevents browser hangs on mobile devices
  return isMobile || hasLimitedMemory;
};

export const useSectionTransitions = () => {
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);
  
  // Detect device performance on component mount
  useEffect(() => {
    // Use a try-catch block to prevent any detection errors from breaking the entire page
    try {
      setIsLowPerformanceDevice(detectLowPerformanceDevice());
      
      // Set up ScrollTrigger optimization globally
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize", // Reduce refresh events
      });
    } catch (error) {
      console.error("Error detecting device performance:", error);
      // Default to false in case of errors to avoid potential issues
      setIsLowPerformanceDevice(false);
    }
  }, []);
  
  // Always use navigation background updates (optimized version)
  useNavBackground();
  
  // If device is low performance, apply minimal animations
  if (isLowPerformanceDevice) {
    // Apply only critical animations for user experience
    useEffect(() => {
      // Make sure this won't fail on mobile browsers
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
    // Wrap each animation hook in try-catch to prevent individual failures from breaking the entire page
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
  
  // Add a special effect to indicate scrolling is enabled
  useEffect(() => {
    const addScrollIndicator = () => {
      try {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-performance-indicator';
        indicator.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(indicator);
        
        let scrollTimeout: number | null = null;
        
        window.addEventListener('scroll', () => {
          indicator.style.opacity = '1';
          
          if (scrollTimeout) {
            window.clearTimeout(scrollTimeout);
          }
          
          scrollTimeout = window.setTimeout(() => {
            indicator.style.opacity = '0';
          }, 500);
        });
        
        return () => {
          if (document.body.contains(indicator)) {
            document.body.removeChild(indicator);
          }
          window.removeEventListener('scroll', () => {});
          if (scrollTimeout) window.clearTimeout(scrollTimeout);
        };
      } catch (error) {
        console.error("Error adding scroll indicator:", error);
        return () => {};
      }
    };
    
    return addScrollIndicator();
  }, []);
  
  // Add global ScrollTrigger cleanup
  useEffect(() => {
    return () => {
      try {
        // Clean up all ScrollTrigger instances when component unmounts
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        ScrollTrigger.clearMatchMedia();
      } catch (error) {
        console.error("Error cleaning up ScrollTrigger:", error);
      }
    };
  }, []);
};
