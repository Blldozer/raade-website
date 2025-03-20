
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, ChevronDown, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import TimerDigits from "./TimerDigits";
import { ColorScheme } from "./timerUtils";

interface FloatingTimerDisplayProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired?: boolean;
  };
  isExpanded: boolean;
  toggleExpanded: () => void;
  className?: string;
  colors: ColorScheme;
}

const FloatingTimerDisplay = ({
  timeLeft,
  isExpanded,
  toggleExpanded,
  className,
  colors
}: FloatingTimerDisplayProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const isExpired = timeLeft.expired;
  
  // Delay mounting to avoid flash on initial page load
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed bottom-4 right-4 z-40",
          className
        )}
      >
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              "rounded-lg shadow-lg border p-4 w-64",
              colors.dropdownBg || "bg-white dark:bg-gray-800",
              colors.dropdownBorder || "border-gray-200 dark:border-gray-700"
            )}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {isExpired ? (
                  <AlertCircle size={18} className={colors.accent || "text-amber-500"} />
                ) : (
                  <Clock size={18} className={colors.accent || "text-amber-500"} />
                )}
                <span className={cn("ml-2 font-semibold", colors.highlight || "text-gray-900 dark:text-white")}>
                  {isExpired ? "Conference Live!" : "Conference Countdown"}
                </span>
              </div>
              <button
                onClick={toggleExpanded}
                className={cn(
                  "p-1 rounded-full transition-colors",
                  colors.hoverBg || "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <X size={14} className={colors.text || "text-gray-500 dark:text-gray-400"} />
              </button>
            </div>
            
            {isExpired ? (
              <div className={cn("text-center py-2", colors.dropdownText || "text-gray-600 dark:text-gray-300")}>
                <p className="text-sm font-medium">The RAADE Conference is happening now!</p>
                <p className="text-xs mt-1 mb-2">April 11-12, 2025</p>
              </div>
            ) : (
              <TimerDigits
                days={timeLeft.days}
                hours={timeLeft.hours}
                minutes={timeLeft.minutes}
                seconds={timeLeft.seconds}
                colorClasses={{
                  accent: colors.accent,
                  dropdownText: colors.dropdownText
                }}
                size="md"
              />
            )}
            
            <div className="mt-3 text-center">
              <Link
                to={isExpired ? "/conference" : "/conference/register"}
                className={cn(
                  "block w-full py-2 px-4 text-sm font-medium text-white rounded-md bg-amber-500 hover:bg-amber-600 transition-colors"
                )}
              >
                {isExpired ? "View Live Schedule" : "Register Now"}
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={toggleExpanded}
            className={cn(
              "flex items-center space-x-2 rounded-full py-2 px-4 shadow-lg",
              colors.dropdownBg || "bg-white dark:bg-gray-800"
            )}
          >
            {isExpired ? (
              <AlertCircle size={16} className={colors.accent || "text-amber-500"} />
            ) : (
              <Clock size={16} className={colors.accent || "text-amber-500"} />
            )}
            <span className={cn("text-sm font-medium", colors.text || "text-gray-900 dark:text-white")}>
              {isExpired ? "Conference Live!" : `${timeLeft.days}d:${timeLeft.hours}h left`}
            </span>
            <ChevronDown size={14} className={colors.text || "text-gray-500 dark:text-gray-400"} />
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingTimerDisplay;
