import { useEffect, useState } from 'react';
import { useNavBackground } from './useNavBackground';
import { useSectionParallax } from './useSectionParallax';
import { useTransitionStatAnimation } from './useTransitionStatAnimation';
import { useTransitionHookAnimation } from './useTransitionHookAnimation';
import { useFutureShowcaseAnimation } from './useFutureShowcaseAnimation';
import { useGeneralSectionAnimations } from './useGeneralSectionAnimations';

// Helper to detect device performance capabilities
const detectLowPerformanceDevice = () => {
  // Check for mobile devices which typically have lower performance
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check if device has limited memory
  const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  
  // Check for slower CPU by measuring processing speed
  const cpuCheck = () => {
    const startTime = performance.now();
    let count = 0;
    for (let i = 0; i < 1000000; i++) {
      count += i;
    }
    const endTime = performance.now();
    return endTime - startTime > 100; // If the operation takes more than 100ms, it's likely a slower device
  };
  
  return isMobile || hasLimitedMemory || cpuCheck();
};

export const useSectionTransitions = () => {
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);
  
  // Detect device performance on component mount
  useEffect(() => {
    setIsLowPerformanceDevice(detectLowPerformanceDevice());
  }, []);
  
  // Always use navigation background updates (optimized version)
  useNavBackground();
  
  // If device is low performance, apply minimal animations
  if (isLowPerformanceDevice) {
    // Apply only critical animations for user experience
    useEffect(() => {
      // Apply minimal CSS-based animations using classes instead of heavy GSAP animations
      document.body.classList.add('low-performance-mode');
      
      return () => {
        document.body.classList.remove('low-performance-mode');
      };
    }, []);
    
    return;
  }
  
  // For higher performance devices, use optimized animations
  // Apply parallax with reduced intensity
  useSectionParallax('conference-promo', 0.1); // Reduced from 0.2
  useSectionParallax('transition-stat', 0.05); // Reduced from 0.15
  useSectionParallax('future-showcase', 0.1); // Reduced from 0.25
  
  useTransitionStatAnimation();
  useTransitionHookAnimation();
  useFutureShowcaseAnimation();
  useGeneralSectionAnimations();
  
  // Add a special effect to indicate scrolling is enabled
  useEffect(() => {
    const addScrollIndicator = () => {
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
        document.body.removeChild(indicator);
        window.removeEventListener('scroll', () => {});
        if (scrollTimeout) window.clearTimeout(scrollTimeout);
      };
    };
    
    return addScrollIndicator();
  }, []);
};
