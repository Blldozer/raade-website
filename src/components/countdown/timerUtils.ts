
export const formatTimeUnit = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(difference / 1000 / 60 % 60);
  const seconds = Math.floor(difference / 1000 % 60);
  
  return {
    days,
    hours,
    minutes,
    seconds
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

export const getColorClasses = (
  colorScheme: 'light' | 'dark' | 'auto', 
  isDarkBackground: boolean
) => {
  if (colorScheme === "light") {
    return {
      text: "text-gray-800",
      highlight: "text-raade-navy",
      accent: "text-raade-gold",
      iconColor: "text-raade-gold",
      hoverBg: "hover:bg-gray-100",
      dropdownBg: "bg-white/95",
      dropdownText: "text-gray-800",
      dropdownBorder: "border-gray-200"
    };
  } else if (colorScheme === "dark") {
    return {
      text: "text-white",
      highlight: "text-white",
      accent: "text-raade-gold",
      iconColor: "text-raade-gold",
      hoverBg: "hover:bg-white/10",
      dropdownBg: "bg-raade-navy/95",
      dropdownText: "text-white",
      dropdownBorder: "border-gray-700"
    };
  } else {
    // Auto mode - adapt based on current route background
    return isDarkBackground ? {
      text: "text-white",
      highlight: "text-white",
      accent: "text-raade-gold",
      iconColor: "text-raade-gold",
      hoverBg: "hover:bg-white/10",
      dropdownBg: "bg-raade-navy/95",
      dropdownText: "text-white",
      dropdownBorder: "border-gray-700"
    } : {
      text: "text-gray-800",
      highlight: "text-raade-navy",
      accent: "text-raade-gold",
      iconColor: "text-raade-gold",
      hoverBg: "hover:bg-gray-100",
      dropdownBg: "bg-white/95",
      dropdownText: "text-gray-800",
      dropdownBorder: "border-gray-200"
    };
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
