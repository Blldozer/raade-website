
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCountdown } from "./countdown/useCountdown";
import NavTimerDisplay from "./countdown/NavTimerDisplay";
import FloatingTimerDisplay from "./countdown/FloatingTimerDisplay";
import { getColorClasses, hasLightBackground, calculateProgress, ColorScheme } from "./countdown/timerUtils";

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
  variant?: "nav" | "floating";
  colorScheme?: 'light' | 'dark' | 'auto' | ColorScheme;
  announcementDate?: string; // Optional date when the countdown was announced
  progressBarColors?: {
    background?: string;
    fill?: string;
  };
  accentColor?: string;
  textColor?: string;
}

const CountdownTimer = ({
  targetDate,
  className,
  variant = "floating",
  colorScheme = "auto",
  announcementDate,
  progressBarColors,
  accentColor,
  textColor
}: CountdownTimerProps) => {
  const location = useLocation();
  
  // Use the provided targetDate or fall back to the default
  const CONFERENCE_DATE = targetDate ? new Date(targetDate) : new Date('2025-04-11T09:00:00');
  
  // Use provided announcement date or fall back to 6 months before conference
  const ANNOUNCEMENT_DATE = announcementDate 
    ? new Date(announcementDate) 
    : new Date(new Date('2025-04-11T09:00:00').setMonth(new Date('2025-04-11T09:00:00').getMonth() - 6));
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get time left using custom hook
  const timeLeft = useCountdown(CONFERENCE_DATE);
  
  // Calculate progress percentage
  const progressPercentage = calculateProgress(ANNOUNCEMENT_DATE, CONFERENCE_DATE);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Get color classes based on current route and color scheme
  const isDarkBackground = !hasLightBackground(location.pathname);
  
  // Create a custom color scheme if specific colors are provided
  const customColorScheme: ColorScheme = {};
  
  if (accentColor) {
    customColorScheme.accent = accentColor;
    customColorScheme.iconColor = accentColor;
  }
  
  if (textColor) {
    customColorScheme.text = textColor;
    customColorScheme.dropdownText = textColor;
  }
  
  if (progressBarColors?.background) {
    customColorScheme.progressBg = progressBarColors.background;
  }
  
  if (progressBarColors?.fill) {
    customColorScheme.progressFill = progressBarColors.fill;
  }
  
  // If we have custom colors, merge with the provided colorScheme
  const finalColorScheme = 
    Object.keys(customColorScheme).length > 0 && typeof colorScheme === 'object'
      ? { ...colorScheme, ...customColorScheme }
      : (Object.keys(customColorScheme).length > 0 ? customColorScheme : colorScheme);
  
  const colors = getColorClasses(finalColorScheme, isDarkBackground);

  // Render appropriate timer display based on variant
  if (variant === "nav") {
    return <NavTimerDisplay 
      timeLeft={timeLeft} 
      colors={colors} 
      progressPercentage={progressPercentage} 
    />;
  }

  // Default to floating display
  return (
    <FloatingTimerDisplay
      timeLeft={timeLeft}
      isExpanded={isExpanded}
      toggleExpanded={toggleExpanded}
      className={className}
      progressPercentage={progressPercentage}
      colors={colors}
    />
  );
};

export default CountdownTimer;
