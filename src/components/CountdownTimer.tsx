
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useCountdown } from "./countdown/useCountdown";
import NavTimerDisplay from "./countdown/NavTimerDisplay";
import { getColorClasses, hasLightBackground, ColorScheme, isScrollPastHero } from "./countdown/timerUtils";

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
  variant?: "nav";
  colorScheme?: 'light' | 'dark' | 'auto' | ColorScheme;
  accentColor?: string;
  textColor?: string;
}

/**
 * CountdownTimer Component - Displays a countdown to the conference date
 * 
 * Features:
 * - Handles countdown expiration gracefully
 * - Adapts display based on whether the event has passed
 * - Supports navbar display with hover dropdown functionality
 * - Auto-detects appropriate color scheme based on background
 * - Enhanced with router context safety checks
 * - Uses transparent background for seamless navigation integration
 * - Uses Alegreya Sans font for RAADE brand consistency
 */
const CountdownTimer = ({
  targetDate,
  className,
  variant = "nav",
  colorScheme = "auto",
  accentColor,
  textColor
}: CountdownTimerProps) => {
  // Check if React is properly initialized before using hooks
  const isReactAvailable = typeof window !== 'undefined' && window.__REACT_INITIALIZED === true;
                         
  if (!isReactAvailable) {
    console.warn("CountdownTimer: React hooks unavailable, rendering fallback");
    return (
      <div className={cn("inline-flex items-center rounded-md px-2 py-1", className)}>
        <span className="text-sm font-medium">Conference April 11-12, 2025</span>
      </div>
    );
  }
  
  // Safe router context access with fallback
  const [locationPath, setLocationPath] = useState('/');
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [scrollPastHero, setScrollPastHero] = useState(false);
  
  // Initialize router-related state safely
  useEffect(() => {
    try {
      // Try to access router context safely
      if (typeof window !== 'undefined' && window.location) {
        // Fallback to window.location if React Router isn't available
        setLocationPath(window.location.pathname);
      }
      
      // Get initial background check based on current route
      setIsDarkBackground(!hasLightBackground(locationPath));
    } catch (error) {
      // If router context is not available, use safe defaults
      console.log("CountdownTimer: Router context not available, using defaults");
    }
  }, [locationPath]);
  
  // Use the provided targetDate or fall back to the default
  // Using a clearer date format with explicit year, month, day
  const CONFERENCE_DATE = useMemo(() => {
    return targetDate ? new Date(targetDate) : new Date('2025-04-11T09:00:00');
  }, [targetDate]);
  
  // Add debugging for the target date (only once on mount)
  useEffect(() => {
    console.log("CountdownTimer initialized with:", {
      providedDate: targetDate,
      parsedDate: CONFERENCE_DATE.toISOString(),
      currentDate: new Date().toISOString(),
      timeDifference: CONFERENCE_DATE.getTime() - new Date().getTime()
    });
  }, []);
  
  // Get time left using custom hook
  const timeLeft = useCountdown(CONFERENCE_DATE);
  
  // Memoize the scroll handler to prevent recreation on each render
  const handleScroll = useCallback(() => {
    const isPastHero = isScrollPastHero();
    if (scrollPastHero !== isPastHero) {
      setScrollPastHero(isPastHero);
    }
  }, [scrollPastHero]);
  
  // Add scroll event listener to detect when user has scrolled past hero section
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);
  
  // Calculate effective dark background state once per relevant state change
  const effectiveDarkBackground = useMemo(() => {
    return scrollPastHero && 
      (locationPath === '/' || 
       locationPath === '/about' || 
       locationPath === '/studios') 
      ? false : isDarkBackground;
  }, [scrollPastHero, locationPath, isDarkBackground]);
  
  // Create custom color scheme - memoized to prevent unnecessary recalculations
  const customColorScheme = useMemo(() => {
    const scheme: ColorScheme = {};
    
    if (accentColor) {
      scheme.accent = accentColor;
      scheme.iconColor = accentColor;
    } else {
      // Use RAADE's yellow-orange by default for better visibility and brand consistency
      scheme.accent = "text-raade-yellow-orange";
      scheme.iconColor = "text-raade-yellow-orange";
    }
    
    if (textColor) {
      scheme.text = textColor;
      scheme.dropdownText = textColor;
    }
    
    return scheme;
  }, [accentColor, textColor]);
  
  // Calculate final color scheme - memoized to prevent unnecessary recalculations
  const finalColorScheme = useMemo(() => {
    return Object.keys(customColorScheme).length > 0 && typeof colorScheme === 'object'
      ? { ...colorScheme, ...customColorScheme }
      : (Object.keys(customColorScheme).length > 0 ? customColorScheme : colorScheme);
  }, [colorScheme, customColorScheme]);
  
  // Calculate final colors - memoized to prevent unnecessary recalculations
  const colors = useMemo(() => {
    const baseColors = getColorClasses(finalColorScheme, effectiveDarkBackground);
    
    // Ensure background is transparent
    baseColors.background = "bg-transparent";
    
    // Set dropdown styling - override with RAADE gold gradient
    baseColors.dropdownBg = "bg-gradient-to-br from-raade-gold-start via-raade-gold-middle to-raade-gold-end";
    baseColors.dropdownText = "text-white";
    
    return baseColors;
  }, [finalColorScheme, effectiveDarkBackground]);
  
  // Render the NavTimerDisplay with hover dropdown
  return (
    <NavTimerDisplay 
      timeLeft={timeLeft} 
      colors={colors}
      className={className}
    />
  );
};

export default CountdownTimer;
