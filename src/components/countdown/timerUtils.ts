
export const formatTimeUnit = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};

/**
 * Calculates time remaining until target date
 * 
 * Features:
 * - Handles time zone differences correctly
 * - Prevents negative time values
 * - Enhanced logging for debugging
 * - Returns clear expired flag when event has passed
 * 
 * @param targetDate The future date to count down to
 * @returns Object with days, hours, minutes, seconds and expired flag
 */
export const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date();
  
  // Ensure both dates are valid
  if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
    console.error("Invalid target date provided to calculateTimeLeft:", targetDate);
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true
    };
  }
  
  const difference = targetDate.getTime() - now.getTime();
  
  // Handle negative time differences (event has passed)
  if (difference <= 0) {
    console.log("Target date has passed:", { 
      target: targetDate.toISOString(), 
      now: now.toISOString(), 
      difference 
    });
    
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true
    };
  }
  
  // Calculate time units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  
  return {
    days,
    hours,
    minutes,
    seconds,
    expired: false
  };
};

/**
 * Calculates progress percentage between start and end dates
 * 
 * @param startDate The start date of the period
 * @param endDate The end date of the period
 * @returns Progress percentage (0-100)
 */
export const calculateProgress = (startDate: Date, endDate: Date): number => {
  const now = new Date();
  
  // Validate dates
  if (!(startDate instanceof Date) || isNaN(startDate.getTime()) ||
      !(endDate instanceof Date) || isNaN(endDate.getTime())) {
    console.error("Invalid dates provided to calculateProgress:", { startDate, endDate });
    return 0;
  }
  
  const totalDuration = endDate.getTime() - startDate.getTime();
  
  // Handle invalid date ranges
  if (totalDuration <= 0) {
    console.error("Invalid date range in calculateProgress - end date is before or same as start date");
    return 0;
  }
  
  const elapsedDuration = now.getTime() - startDate.getTime();
  
  // Ensure progress is between 0 and 100
  const progress = Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100);
  
  return Math.round(progress);
};

// Modified the interface to make all properties optional
export interface ColorScheme {
  text?: string;
  highlight?: string;
  accent?: string;
  iconColor?: string;
  hoverBg?: string;
  dropdownBg?: string;
  dropdownText?: string;
  dropdownBorder?: string;
  progressBg?: string;
  progressFill?: string;
}

/**
 * Gets the appropriate color classes based on color scheme and background
 * 
 * @param colorScheme Color scheme to use ('light', 'dark', 'auto', or custom object)
 * @param isDarkBackground Whether the current background is dark
 * @returns Object with color classes for each element
 */
export const getColorClasses = (
  colorScheme: 'light' | 'dark' | 'auto' | ColorScheme, 
  isDarkBackground: boolean
): ColorScheme => {
  // Updated default color schemes with higher contrast colors
  const lightColorScheme: ColorScheme = {
    text: "text-gray-800",
    highlight: "text-raade-navy",
    accent: "text-[#FF9848]", // Changed from gold to bright orange for better visibility
    iconColor: "text-[#FF9848]", // Changed from gold to bright orange for better visibility
    hoverBg: "hover:bg-gray-100",
    dropdownBg: "bg-white/95",
    dropdownText: "text-gray-800",
    dropdownBorder: "border-gray-200",
    progressBg: "bg-gray-200",
    progressFill: "bg-[#FF9848]" // Changed from gold to bright orange for better visibility
  };

  const darkColorScheme: ColorScheme = {
    text: "text-white",
    highlight: "text-white",
    accent: "text-[#FF9848]", // Changed from gold to bright orange for better visibility
    iconColor: "text-[#FF9848]", // Changed from gold to bright orange for better visibility
    hoverBg: "hover:bg-white/10",
    dropdownBg: "bg-raade-navy/95",
    dropdownText: "text-white",
    dropdownBorder: "border-gray-700",
    progressBg: "bg-white/20",
    progressFill: "bg-[#FF9848]" // Changed from gold to bright orange for better visibility
  };

  // If a custom color scheme is provided, use it
  if (typeof colorScheme === 'object') {
    // Provide defaults for any missing colors from the appropriate base scheme
    const baseScheme = isDarkBackground ? darkColorScheme : lightColorScheme;
    return {
      ...baseScheme,
      ...colorScheme
    };
  }

  if (colorScheme === "light") {
    return lightColorScheme;
  } else if (colorScheme === "dark") {
    return darkColorScheme;
  } else {
    // Auto mode - adapt based on current route background
    return isDarkBackground ? darkColorScheme : lightColorScheme;
  }
};

/**
 * Determines if the current route has a light background
 * 
 * @param pathname Current route path
 * @returns True if the route has a light background
 */
export const hasLightBackground = (pathname: string) => {
  // Check specific routes that have light backgrounds
  const lightBackgroundRoutes = [
    '/conference',
    '/conference/register',
  ];
  
  // Check if current path matches any light background routes
  return lightBackgroundRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
};

/**
 * Determines if the user has scrolled past the hero section
 * 
 * @returns True if scrolled past hero section threshold
 */
export const isScrollPastHero = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if scrolled past typical hero section height (70% of viewport height)
  return window.scrollY > window.innerHeight * 0.7;
};
