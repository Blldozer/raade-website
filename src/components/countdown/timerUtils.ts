
export const formatTimeUnit = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date();
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
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(difference / 1000 / 60 % 60);
  const seconds = Math.floor(difference / 1000 % 60);
  
  return {
    days,
    hours,
    minutes,
    seconds,
    expired: false
  };
};

export const calculateProgress = (startDate: Date, endDate: Date): number => {
  const now = new Date();
  const totalDuration = endDate.getTime() - startDate.getTime();
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

// New function to handle scroll-based background detection
export const isScrollPastHero = (): boolean => {
  // Check if scrolled past typical hero section height (100vh)
  return window.scrollY > window.innerHeight * 0.7;
};
