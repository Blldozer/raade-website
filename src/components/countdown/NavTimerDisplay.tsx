
import { cn } from "@/lib/utils";
import { TimeLeft } from "./types";
import { formatTimeUnit } from "./timerUtils";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
 * NavTimerDisplay Component - Compact timer for navigation bars with dropdown
 * 
 * Features:
 * - Minimalist design suitable for navigation headers
 * - Responsive layout that works in limited space
 * - Hover-triggered dropdown with detailed conference information
 * - Shows days, hours, minutes until the conference
 * - Uses transparent background for better integration with navigation
 */
const NavTimerDisplay = ({ 
  timeLeft,
  colors,
  className
}: NavTimerDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  if (timeLeft.expired) {
    return (
      <div className={cn("font-alegreyasans font-bold", colors.accent, className)}>
        Live Now!
      </div>
    );
  }

  // Set dropdown colors with defaults
  const dropdownBg = colors.dropdownBg || "bg-raade-gold-middle";
  const dropdownText = colors.dropdownText || "text-white";
  const iconColor = colors.iconColor || colors.accent;

  return (
    <div
      ref={dropdownRef}
      className={cn("relative", className)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Timer display that shows dropdown on hover */}
      <div 
        className={cn("flex items-center space-x-1 font-alegreyasans cursor-pointer")}
      >
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
        {isExpanded ? (
          <ChevronUp className={cn("h-4 w-4 ml-1", iconColor)} />
        ) : (
          <ChevronDown className={cn("h-4 w-4 ml-1", iconColor)} />
        )}
      </div>
      
      {/* Dropdown content */}
      {isExpanded && (
        <div 
          className={cn(
            "absolute right-0 mt-2 p-4 rounded-lg shadow-lg z-50 min-w-[240px] border border-raade-gold-end/20",
            "bg-gradient-to-br from-raade-gold-start via-raade-gold-middle to-raade-gold-end"
          )}
        >
          <h3 className={cn("text-center font-alegreyasans font-semibold mb-3 text-white")}>
            RAADE Conference 2025
          </h3>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="flex flex-col items-center">
              <div className={cn("text-xl font-bold font-alegreyasans text-white")}>{timeLeft.days}</div>
              <div className={cn("text-xs font-medium text-white/90")}>Days</div>
            </div>
            <div className="flex flex-col items-center">
              <div className={cn("text-xl font-bold font-alegreyasans text-white")}>{formatTimeUnit(timeLeft.hours)}</div>
              <div className={cn("text-xs font-medium text-white/90")}>Hours</div>
            </div>
            <div className="flex flex-col items-center">
              <div className={cn("text-xl font-bold font-alegreyasans text-white")}>{formatTimeUnit(timeLeft.minutes)}</div>
              <div className={cn("text-xs font-medium text-white/90")}>Mins</div>
            </div>
            <div className="flex flex-col items-center">
              <div className={cn("text-xl font-bold font-alegreyasans text-white")}>{formatTimeUnit(timeLeft.seconds)}</div>
              <div className={cn("text-xs font-medium text-white/90")}>Secs</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-xs mb-2 font-medium text-white/80">April 11-12, 2025</div>
            <a 
              href="/conference/register" 
              className="inline-block px-4 py-1.5 bg-raade-navy hover:bg-raade-Thunder text-white rounded-md text-sm font-semibold transition-colors font-alegreyasans"
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavTimerDisplay;
