
import { cn } from "@/lib/utils";
import { TimeLeft } from "./useCountdown";
import { formatTimeUnit } from "./timerUtils";

interface NavTimerDisplayProps {
  timeLeft: TimeLeft;
  colors: {
    text: string;
    accent: string;
    background?: string;
    dropdownText?: string;
    dropdownBg?: string;
    iconColor?: string;
  };
  className?: string;
}

/**
 * NavTimerDisplay Component - Compact timer for navigation bars
 * 
 * Features:
 * - Minimalist design suitable for navigation headers
 * - Responsive layout that works in limited space
 * - Shows days, hours, minutes until the conference
 */
const NavTimerDisplay = ({ 
  timeLeft,
  colors,
  className
}: NavTimerDisplayProps) => {
  if (timeLeft.expired) {
    return (
      <div className={cn("font-alegreyasans font-bold", colors.accent, className)}>
        Live Now!
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-1 font-alegreyasans", className)}>
      <span className={cn("mr-1 font-bold", colors.text)}>Conference:</span>
      <div className="flex items-baseline">
        <span className={cn("text-sm font-bold", colors.accent)}>{timeLeft.days}</span>
        <span className={cn("text-xs mx-[2px]", colors.text)}>d</span>
      </div>
      <div className="flex items-baseline">
        <span className={cn("text-sm font-bold", colors.accent)}>{formatTimeUnit(timeLeft.hours)}</span>
        <span className={cn("text-xs mx-[2px]", colors.text)}>h</span>
      </div>
      <div className="flex items-baseline">
        <span className={cn("text-sm font-bold", colors.accent)}>{formatTimeUnit(timeLeft.minutes)}</span>
        <span className={cn("text-xs mx-[2px]", colors.text)}>m</span>
      </div>
    </div>
  );
};

export default NavTimerDisplay;
