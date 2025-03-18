
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavBackground } from "@/hooks/useNavBackground";

/**
 * Hook for managing Innovation Studios page functionality
 * 
 * Handles:
 * - Section references for scrolling
 * - Current section tracking 
 * - Navigation background color based on scroll position
 * - Scroll behavior and section navigation
 */
export const useInnovationStudios = () => {
  const location = useLocation();
  const overviewRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string>("hero");

  // Initialize with 'light' for proper contrast over the dark purple hero background
  useLayoutEffect(() => {
    document.body.setAttribute('data-nav-background', 'light');
    
    return () => {
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  // Use the hook to manage scroll-based background changes
  useNavBackground('light');

  // Track scroll position to determine current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Set section based on scroll position
      if (scrollPosition < viewportHeight * 0.7) {
        setCurrentSection("hero");
      } 
      // Check if we're in overview section
      else if (overviewRef.current && 
          scrollPosition >= overviewRef.current.offsetTop - 100 && 
          scrollPosition < projectsRef.current?.offsetTop! - 100) {
        setCurrentSection("overview");
      }
      // Check if we're in projects section
      else if (projectsRef.current && 
          scrollPosition >= projectsRef.current.offsetTop - 100 && 
          scrollPosition < applyRef.current?.offsetTop! - 100) {
        setCurrentSection("projects");
      }
      // Check if we're in apply section
      else if (applyRef.current && 
          scrollPosition >= applyRef.current.offsetTop - 100) {
        setCurrentSection("apply");
      }
    };

    // Initial call to set the correct section
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Handle scrolling to sections based on hash
    if (location.hash) {
      setTimeout(() => {
        const hash = location.hash.replace('#', '');
        if (hash === 'overview' && overviewRef.current) {
          overviewRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        } else if (hash === 'projects' && projectsRef.current) {
          projectsRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        } else if (hash === 'apply' && applyRef.current) {
          applyRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 300);
    }
    
    // Also handle navigation via state (when coming from another page)
    else if (location.state && location.state.scrollToSection) {
      setTimeout(() => {
        const sectionId = location.state.scrollToSection;
        if (sectionId === 'overview' && overviewRef.current) {
          overviewRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        } else if (sectionId === 'projects' && projectsRef.current) {
          projectsRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        } else if (sectionId === 'apply' && applyRef.current) {
          applyRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 300);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const scrollToContent = () => {
    if (overviewRef.current) {
      overviewRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return {
    overviewRef,
    projectsRef,
    applyRef,
    currentSection,
    scrollToContent
  };
};

export default useInnovationStudios;
