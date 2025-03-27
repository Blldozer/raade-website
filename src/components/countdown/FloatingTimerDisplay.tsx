
import { useState, useEffect, useRef } from "react";
import { TimeLeft } from "./useCountdown";
import { formatTimeUnit } from "./timerUtils";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FloatingTimerDisplayProps {
  timeLeft: TimeLeft;
  isExpanded: boolean;
  toggleExpanded: () => void;
  className?: string;
  colors: {
    text: string;
    accent: string;
    background: string;
    dropdownText: string;
    dropdownBg: string;
    iconColor: string;
  };
}

/**
 * FloatingTimerDisplay Component - Expandable floating countdown
 * 
 * Features:
 * - Collapsible interface that expands on click
 * - Animated transitions for smooth user experience
 * - Proper cleanup of timers to prevent memory leaks
 * - Hardware acceleration for animations
 */
const FloatingTimerDisplay = ({
  timeLeft,
  isExpanded,
  toggleExpanded,
  className,
  colors
}: FloatingTimerDisplayProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  // Effect to handle clicks outside the timer
  useEffect(() => {
    // Skip this effect in SSR
    if (typeof window === 'undefined') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isExpanded) {
        toggleExpanded();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, toggleExpanded]);
  
  // Conditionally hide the timer (e.g., when target date has passed)
  useEffect(() => {
    setIsVisible(!timeLeft.expired);
  }, [timeLeft.expired]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 transition-all duration-300 overflow-hidden rounded-lg shadow-lg",
        colors.background,
        className
      )}
      style={{
        transform: "translateZ(0)", // Hardware acceleration
        willChange: "transform, opacity, height"
      }}
    >
      {/* Collapsed state display */}
      <div 
        className="p-2 cursor-pointer flex items-center gap-2"
        onClick={toggleExpanded}
      >
        <div className={cn("font-bold text-sm", colors.text)}>
          Conference in:
        </div>
        <div className={cn("font-bold", colors.accent)}>
          {timeLeft.days}d {formatTimeUnit(timeLeft.hours)}h {formatTimeUnit(timeLeft.minutes)}m
        </div>
        {isExpanded ? (
          <ChevronDown className={cn("h-4 w-4", colors.iconColor)} />
        ) : (
          <ChevronUp className={cn("h-4 w-4", colors.iconColor)} />
        )}
      </div>
      
      {/* Expanded state dropdown */}
      {isExpanded && (
        <div 
          className={cn(
            "p-3 border-t border-gray-200/20",
            colors.dropdownBg
          )}
        >
          <h3 className={cn("text-center font-semibold mb-2", colors.dropdownText)}>
            RAADE Conference 2025
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className={cn("text-xl font-bold", colors.accent)}>{timeLeft.days}</div>
              <div className={cn("text-xs", colors.dropdownText)}>Days</div>
            </div>
            <div>
              <div className={cn("text-xl font-bold", colors.accent)}>{formatTimeUnit(timeLeft.hours)}</div>
              <div className={cn("text-xs", colors.dropdownText)}>Hours</div>
            </div>
            <div>
              <div className={cn("text-xl font-bold", colors.accent)}>{formatTimeUnit(timeLeft.minutes)}</div>
              <div className={cn("text-xs", colors.dropdownText)}>Mins</div>
            </div>
            <div>
              <div className={cn("text-xl font-bold", colors.accent)}>{formatTimeUnit(timeLeft.seconds)}</div>
              <div className={cn("text-xs", colors.dropdownText)}>Secs</div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <a 
              href="/conference/register" 
              className="inline-block px-4 py-1 bg-[#FBB03B] hover:bg-[#FF9848] text-white rounded-md text-sm font-semibold transition-colors"
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingTimerDisplay;
