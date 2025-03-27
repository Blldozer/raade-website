
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
 * - Dropdown with detailed conference information
 * - Shows days, hours, minutes until the conference
 */
const NavTimerDisplay = ({ 
  timeLeft,
  colors,
  className
}: NavTimerDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Toggle dropdown visibility
  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };
  
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

  // Background and dropdown colors with defaults
  const bgColor = colors.background || "bg-transparent";
  const dropdownBg = colors.dropdownBg || "bg-white/95";
  const dropdownText = colors.dropdownText || colors.text;
  const iconColor = colors.iconColor || colors.accent;

  return (
    <div
      ref={dropdownRef}
      className={cn("relative", className)}
    >
      {/* Timer display that toggles dropdown */}
      <div 
        className={cn("flex items-center space-x-1 font-alegreyasans cursor-pointer", bgColor)}
        onClick={toggleExpanded}
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
            "absolute right-0 mt-2 p-3 rounded-lg shadow-lg z-50 min-w-[200px]",
            dropdownBg
          )}
        >
          <h3 className={cn("text-center font-semibold mb-2", dropdownText)}>
            RAADE Conference 2025
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className={cn("text-xl font-bold", colors.accent)}>{timeLeft.days}</div>
              <div className={cn("text-xs", dropdownText)}>Days</div>
            </div>
            <div>
              <div className={cn("text-xl font-bold", colors.accent)}>{formatTimeUnit(timeLeft.hours)}</div>
              <div className={cn("text-xs", dropdownText)}>Hours</div>
            </div>
            <div>
              <div className={cn("text-xl font-bold", colors.accent)}>{formatTimeUnit(timeLeft.minutes)}</div>
              <div className={cn("text-xs", dropdownText)}>Mins</div>
            </div>
            <div>
              <div className={cn("text-xl font-bold", colors.accent)}>{formatTimeUnit(timeLeft.seconds)}</div>
              <div className={cn("text-xs", dropdownText)}>Secs</div>
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

export default NavTimerDisplay;
