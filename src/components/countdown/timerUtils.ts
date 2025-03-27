
import { TimeLeft } from './useCountdown';

export interface ColorScheme {
  text?: string;
  accent?: string;
  background?: string;
  dropdownText?: string;
  dropdownBg?: string;
  iconColor?: string;
}

/**
 * Format a time unit by adding leading zeros if needed
 * @param value The time value to format
 * @returns Formatted time string
 */
export const formatTimeUnit = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};

/**
 * Calculate time left until a target date
 * @param targetDate The future date to count down to
 * @returns Object with days, hours, minutes, seconds and expired flag
 */
export const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  try {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  } catch (error) {
    console.error("Error calculating time left:", error);
    // Safe fallback
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true
    };
  }
};

/**
 * Safe check for whether we've scrolled past the hero section
 * @returns Boolean indicating if page is scrolled past the hero
 */
export const isScrollPastHero = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const viewportHeight = window.innerHeight;
  const scrollPosition = window.scrollY;
  return scrollPosition > viewportHeight * 0.7;
};

/**
 * Get color classes based on the provided color scheme and background type
 * @param colorScheme Color scheme to use or 'light'/'dark'/'auto'
 * @param isDarkBackground Whether the background is dark
 * @returns Tailwind classes for timer colors
 */
export const getColorClasses = (
  colorScheme: 'light' | 'dark' | 'auto' | ColorScheme, 
  isDarkBackground: boolean
) => {
  // If string type was passed, convert to object
  if (typeof colorScheme === 'string') {
    if (colorScheme === 'auto') {
      colorScheme = isDarkBackground ? 'light' : 'dark';
    }
    
    // Convert string schemes to objects
    if (colorScheme === 'light') {
      return {
        text: 'text-white',
        accent: 'text-[#FF9848]',
        background: 'bg-[#274675]/80',
        dropdownText: 'text-white',
        dropdownBg: 'bg-[#1A365D]/90',
        iconColor: 'text-[#FF9848]'
      };
    } else {
      return {
        text: 'text-[#274675]',
        accent: 'text-[#FF9848]',
        background: 'bg-white/90',
        dropdownText: 'text-[#1A365D]',
        dropdownBg: 'bg-white/90',
        iconColor: 'text-[#FF9848]'
      };
    }
  }
  
  // If we have a custom color scheme object, use it with defaults for missing values
  return {
    text: colorScheme.text || (isDarkBackground ? 'text-white' : 'text-[#274675]'),
    accent: colorScheme.accent || 'text-[#FF9848]',
    background: colorScheme.background || (isDarkBackground ? 'bg-[#274675]/80' : 'bg-white/90'),
    dropdownText: colorScheme.dropdownText || (isDarkBackground ? 'text-white' : 'text-[#1A365D]'),
    dropdownBg: colorScheme.dropdownBg || (isDarkBackground ? 'bg-[#1A365D]/90' : 'bg-white/90'),
    iconColor: colorScheme.iconColor || 'text-[#FF9848]'
  };
};

/**
 * Determine if a route has a light background
 * Used for automatic color scheme selection
 * @param pathname Current route path
 * @returns Boolean indicating if the page has a light background
 */
export const hasLightBackground = (pathname: string): boolean => {
  // Safe check for SSR
  if (typeof window === 'undefined') return true;
  
  // Pages with dark backgrounds return false
  const darkBackgroundPages = [
    '/conference/register',
    '/apply/student',
    '/apply/partner'
  ];
  
  // Special case for hero sections on certain pages
  // If we're at the top of these pages, they have dark backgrounds
  const pagesWithDarkHeroes = ['/', '/about', '/studios', '/conference'];
  
  if (darkBackgroundPages.includes(pathname)) {
    return false;
  }
  
  if (pagesWithDarkHeroes.includes(pathname)) {
    // Only consider it dark if we're near the top of the page (in hero section)
    return window.scrollY > window.innerHeight * 0.7;
  }
  
  // Project detail pages have dark headers
  if (pathname.startsWith('/projects/')) {
    return window.scrollY > 300;
  }
  
  // Default to light background
  return true;
};
