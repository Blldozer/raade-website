
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCountdown } from "./countdown/useCountdown";
import NavTimerDisplay from "./countdown/NavTimerDisplay";
import FloatingTimerDisplay from "./countdown/FloatingTimerDisplay";
import { getColorClasses, hasLightBackground } from "./countdown/timerUtils";

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
  variant?: "nav" | "floating";
  colorScheme?: "light" | "dark" | "auto";
}

const CountdownTimer = ({
  targetDate,
  className,
  variant = "floating",
  colorScheme = "auto"
}: CountdownTimerProps) => {
  const location = useLocation();
  
  // Use the provided targetDate or fall back to the default
  const CONFERENCE_DATE = targetDate ? new Date(targetDate) : new Date('2025-04-11T09:00:00');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get time left using custom hook
  const timeLeft = useCountdown(CONFERENCE_DATE);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Get color classes based on current route and color scheme
  const isDarkBackground = !hasLightBackground(location.pathname);
  const colors = getColorClasses(colorScheme, isDarkBackground);

  // Render appropriate timer display based on variant
  if (variant === "nav") {
    return <NavTimerDisplay timeLeft={timeLeft} colors={colors} />;
  }

  // Default to floating display
  return (
    <FloatingTimerDisplay
      timeLeft={timeLeft}
      isExpanded={isExpanded}
      toggleExpanded={toggleExpanded}
      className={className}
    />
  );
};

export default CountdownTimer;
