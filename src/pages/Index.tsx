import React, { useEffect, Suspense, useLayoutEffect, useState, useRef } from 'react';
import { lazy } from 'react';
import Hero from "@/components/hero/Hero";
import { useSectionTransitions } from "@/hooks/useSectionTransitions";
import { useResponsive } from "@/hooks/useResponsive";
import { useLocation } from 'react-router-dom';
import { useNavBackground } from "@/hooks/useNavBackground";

// Performance monitoring helper
const logPerf = (id: string, message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance][${id}] ${message}`);
  }
};

// Lazy load components with custom retry logic
const retry = (fn: () => Promise<any>, retriesLeft = 3, interval = 1000): Promise<any> => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            logPerf('LazyLoad', `Failed to load component after retries: ${error}`);
            reject(error);
            return;
          }
          
          logPerf('LazyLoad', `Retrying component load, ${retriesLeft - 1} attempts left`);
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};

// Lazy load components with retry capability
const ConferencePromo = lazy(() => retry(() => import("@/components/sections/ConferencePromo")));
const TransitionStat = lazy(() => retry(() => import("@/components/sections/TransitionStat")));
const FutureShowcase = lazy(() => retry(() => import("@/components/sections/FutureShowcase")));
const TransitionHook = lazy(() => retry(() => import("@/components/sections/TransitionHook")));
const JoinSection = lazy(() => retry(() => import("@/components/sections/JoinSection")));

/**
 * Index Component - Main landing page of the website
 * 
 * This component serves as the main entry point for users.
 * It explicitly initializes the navbar with a light background setting
 * to ensure proper contrast over the dark hero section.
 */
const Index = () => {
  // Performance monitoring
  const renderCount = useRef(0);
  const mountTime = useRef(Date.now());
  const perfObserver = useRef<PerformanceObserver | null>(null);
  
  // Use our optimized hook for section transitions
  useSectionTransitions();
  const { isMobile, width } = useResponsive();
  const location = useLocation();
  const [pageReady, setPageReady] = useState(false);
  
  // Use the hook to manage navbar background colors based on section visibility
  // Initialize with 'light' since the hero section has a dark background
  // This ensures the navbar is immediately visible with proper contrast
  useNavBackground('light');
  
  // Performance measurement
  useEffect(() => {
    renderCount.current += 1;
    logPerf('Index', `Render #${renderCount.current}`);
    
    // Set up performance observer to track rendering metrics
    if (typeof PerformanceObserver !== 'undefined' && process.env.NODE_ENV === 'development') {
      try {
        perfObserver.current = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            logPerf('Metrics', `${entry.name}: ${entry.startTime.toFixed(1)}ms (duration: ${entry.duration.toFixed(1)}ms)`);
          });
        });
        
        perfObserver.current.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });
      } catch(e) {
        console.error('PerformanceObserver error:', e);
      }
    }
    
    return () => {
      // Log performance metrics on unmount
      const renderTime = Date.now() - mountTime.current;
      logPerf('Index', `Total render time: ${renderTime}ms`);
      
      // Clean up performance observer
      if (perfObserver.current) {
        perfObserver.current.disconnect();
      }
    };
  }, []);
  
  // Set initial background state before any scroll happens
  useLayoutEffect(() => {
    // Force light navbar for index page hero section
    document.body.setAttribute('data-nav-background', 'light');
    
    return () => {
      // Clean up when unmounting to prevent state persistence issues on mobile
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  // Handle page initialization with a slight delay for mobile devices
  useEffect(() => {
    // Mark page load start for performance measurement
    if (window.performance && 'mark' in window.performance) {
      window.performance.mark('page-init-start');
    }
    
    // Set a short timeout to allow browser to stabilize rendering
    // This helps prevent layout shifts and rendering issues on mobile
    const timer = setTimeout(() => {
      setPageReady(true);
      // Mark page load complete for performance measurement
      if (window.performance && 'mark' in window.performance) {
        window.performance.mark('page-init-end');
        window.performance.measure('page-init', 'page-init-start', 'page-init-end');
      }
    }, isMobile ? 100 : 50); // Slightly longer delay on mobile
    
    return () => clearTimeout(timer);
  }, [isMobile]);
  
  useEffect(() => {
    // Add passive:true to touch events for better scroll performance
    const options = {
      passive: true
    };
    
    // Create actual handler functions so they can be properly removed
    const handleTouchStart = () => {};
    const handleTouchMove = () => {};
    
    document.addEventListener('touchstart', handleTouchStart, options);
    document.addEventListener('touchmove', handleTouchMove, options);
    
    // Apply hardware acceleration and performance optimizations
    if (isMobile) {
      // Add specific fixes for mobile rendering
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.body.style.width = '100%';
      
      // Add hardware acceleration class to critical containers
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.classList.add('hw-accelerate');
      }
      
      // Temporarily disable animations during initial render for better performance
      document.body.classList.add('reduce-motion');
      setTimeout(() => {
        document.body.classList.remove('reduce-motion');
      }, 2000); // Re-enable animations after 2 seconds
    }
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.body.removeAttribute('data-nav-background');
      
      // Clean up mobile-specific styles
      if (isMobile) {
        document.documentElement.style.overflowX = '';
        document.body.style.overflowX = '';
        document.body.style.width = '';
        document.body.classList.remove('reduce-motion');
      }
    };
  }, [isMobile]);
  
  // Optimize scroll-linked animations using requestAnimationFrame
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        
        // Use requestAnimationFrame for smoother scrolling updates
        requestAnimationFrame(() => {
          // Perform any scroll-linked animations here
          isScrolling = false;
        });
      }
      
      // Clear and reset scroll end detection timer
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Perform any cleanup or post-scroll adjustments here
        logPerf('Scroll', 'Scroll event ended');
      }, 150);
    };
    
    // Add a passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  // Handle scrolling to the join section when navigating from another page
  useEffect(() => {
    if (location.state && location.state.scrollToJoin) {
      // Small delay to ensure the section is rendered
      const timer = setTimeout(() => {
        const joinSection = document.getElementById('join');
        if (joinSection) {
          // Use scrollIntoView only when needed to avoid unnecessary repaints
          requestAnimationFrame(() => {
            joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            logPerf('Navigation', 'Scrolled to join section');
          });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // Check if URL has #join hash
    if (window.location.hash === '#join') {
      // Small delay to ensure the section is rendered
      const timer = setTimeout(() => {
        const joinSection = document.getElementById('join');
        if (joinSection) {
          requestAnimationFrame(() => {
            joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            logPerf('Navigation', 'Scrolled to join section (from hash)');
          });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [location]);
  
  // Add visibility classes based on the page's readiness state
  const pageVisibility = pageReady ? "opacity-100" : "opacity-0";
  
  return (
    <div 
      className={`min-h-screen overflow-hidden transition-opacity duration-300 ${pageVisibility}`}
      style={{
        // Apply hardware acceleration to the root element
        transform: 'translateZ(0)',
        willChange: 'opacity', 
        backfaceVisibility: 'hidden'
      }}
    >
      <section 
        className="relative w-full min-h-screen" 
        id="hero" 
        data-background="dark"
        style={{ 
          // Apply hardware acceleration to critical hero section
          transform: 'translateZ(0)',
          willChange: 'transform', 
          zIndex: 1 
        }}
      >
        <Hero />
      </section>
      
      <Suspense fallback={
        <div className="h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="animate-pulse mb-4">Loading sections...</div>
            <div className="h-2 bg-gray-300 rounded w-32 mx-auto"></div>
          </div>
        </div>
      }>
        <section className="relative w-full min-h-screen" id="conference-promo" data-background="light">
          <ConferencePromo />
        </section>
        
        <section className="relative w-full min-h-screen" id="transition-stat" data-background="dark">
          <TransitionStat />
        </section>
        
        <section className="relative w-full min-h-screen bg-white" id="future-showcase" data-background="light">
          <FutureShowcase />
        </section>
        
        <section className="relative w-full min-h-screen bg-[#3C403A]" id="transition-hook" data-background="dark">
          <TransitionHook />
        </section>
        
        <section className="relative w-full min-h-screen" id="join" data-background="light">
          <JoinSection />
        </section>
      </Suspense>
    </div>
  );
};

export default Index;
