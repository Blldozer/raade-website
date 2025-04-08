
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useNavigation } from "../context/useNavigation";

/**
 * useNavigationBackground Hook
 * 
 * Handles dynamic navigation background styling based on:
 * - Scroll position 
 * - Current section
 * - Background color detection
 */
export const useNavigationBackground = () => {
  const { state, dispatch, setIsDarkBackground } = useNavigation();
  const location = useLocation();
  
  // Track whether we've passed the scroll threshold
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Setup scroll event listener to determine if we're scrolled down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newHasScrolled = scrollY > 50;
      
      if (newHasScrolled !== hasScrolled) {
        setHasScrolled(newHasScrolled);
        if (dispatch) {
          dispatch({ type: "SET_SCROLLED", payload: newHasScrolled });
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, hasScrolled]);

  // Update section-specific attributes
  useEffect(() => {
    const currentSection = state.currentSection;
    
    // Set background color based on current section
    if (currentSection && setIsDarkBackground) {
      const needsDarkNav = [
        "hero", 
        "join",
        "future",
        "footer"
      ].includes(currentSection);
      
      setIsDarkBackground(needsDarkNav);
    }
  }, [state.currentSection, setIsDarkBackground]);

  // Set hero page flag when on home page
  useEffect(() => {
    if (dispatch) {
      const isHeroPage = location.pathname === "/";
      dispatch({ type: "SET_HERO_PAGE", payload: isHeroPage });
    }
  }, [location.pathname, dispatch]);

  // Detect device type for responsive navigation
  useEffect(() => {
    if (!dispatch) return;
    
    const handleResize = () => {
      const width = window.innerWidth;
      dispatch({ 
        type: "SET_MOBILE", 
        payload: width < 768 
      });
      dispatch({ 
        type: "SET_TABLET", 
        payload: width >= 768 && width < 1024 
      });
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
};
