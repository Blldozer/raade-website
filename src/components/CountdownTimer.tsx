
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCountdown } from "./countdown/useCountdown";
import NavTimerDisplay from "./countdown/NavTimerDisplay";
import FloatingTimerDisplay from "./countdown/FloatingTimerDisplay";
import { getColorClasses, hasLightBackground, ColorScheme, isScrollPastHero } from "./countdown/timerUtils";

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
  variant?: "nav" | "floating";
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
 * - Supports both navbar and floating display variants
 * - Auto-detects appropriate color scheme based on background
 * - Enhanced with router context safety checks
 */
const CountdownTimer = ({
  targetDate,
  className,
  variant = "floating",
  colorScheme = "auto",
  accentColor,
  textColor
}: CountdownTimerProps) => {
  // Safe router context access with fallback
  let locationPath = '/';
  let isDarkBackground = false;
  
  try {
    const location = useLocation();
    locationPath = location.pathname;
    
    // Get initial background check based on current route
    isDarkBackground = !hasLightBackground(locationPath);
  } catch (error) {
    // If router context is not available, use safe defaults
    console.log("CountdownTimer: Router context not available, using defaults");
  }
  
  // Use the provided targetDate or fall back to the default
  // Using a clearer date format with explicit year, month, day
  const CONFERENCE_DATE = targetDate ? new Date(targetDate) : new Date('2025-04-11T09:00:00');
  
  // Add debugging for the target date
  useEffect(() => {
    console.log("CountdownTimer initialized with:", {
      providedDate: targetDate,
      parsedDate: CONFERENCE_DATE.toISOString(),
      currentDate: new Date().toISOString(),
      timeDifference: CONFERENCE_DATE.getTime() - new Date().getTime()
    });
  }, [targetDate, CONFERENCE_DATE]);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollPastHero, setScrollPastHero] = useState(false);
  
  // Get time left using custom hook
  const timeLeft = useCountdown(CONFERENCE_DATE);
  
  // Add scroll event listener to detect when user has scrolled past hero section
  useEffect(() => {
    const handleScroll = () => {
      setScrollPastHero(isScrollPastHero());
    };

    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // If we're on index, about, or innovation studios page and have scrolled past hero,
  // we should use light color scheme (for dark text) as background is likely white
  const effectiveDarkBackground = scrollPastHero && 
    (locationPath === '/' || 
     locationPath === '/about' || 
     locationPath === '/studios') 
    ? false : isDarkBackground;
  
  // Create a custom color scheme if specific colors are provided
  const customColorScheme: ColorScheme = {};
  
  if (accentColor) {
    customColorScheme.accent = accentColor;
    customColorScheme.iconColor = accentColor;
  } else {
    // Use bright orange by default for better visibility
    customColorScheme.accent = "text-[#FF9848]";
    customColorScheme.iconColor = "text-[#FF9848]";
  }
  
  if (textColor) {
    customColorScheme.text = textColor;
    customColorScheme.dropdownText = textColor;
  }
  
  // If we have custom colors, merge with the provided colorScheme
  const finalColorScheme = 
    Object.keys(customColorScheme).length > 0 && typeof colorScheme === 'object'
      ? { ...colorScheme, ...customColorScheme }
      : (Object.keys(customColorScheme).length > 0 ? customColorScheme : colorScheme);
  
  const colors = getColorClasses(finalColorScheme, effectiveDarkBackground);

  // Render appropriate timer display based on variant
  if (variant === "nav") {
    return <NavTimerDisplay 
      timeLeft={timeLeft} 
      colors={colors} 
    />;
  }

  // Default to floating display
  return (
    <FloatingTimerDisplay
      timeLeft={timeLeft}
      isExpanded={isExpanded}
      toggleExpanded={toggleExpanded}
      className={className}
      colors={colors}
    />
  );
};

export default CountdownTimer;
