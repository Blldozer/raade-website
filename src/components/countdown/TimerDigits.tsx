
import { formatTimeUnit } from "./timerUtils";

interface TimerDigitsProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  showLabels?: boolean;
  colorClasses: {
    accent?: string;
    dropdownText?: string;
  };
  compact?: boolean;
  size?: "sm" | "md" | "lg";
  expired?: boolean;
}

const TimerDigits = ({ 
  days, 
  hours, 
  minutes, 
  seconds, 
  showLabels = true,
  colorClasses,
  compact = false,
  size = "md",
  expired = false
}: TimerDigitsProps) => {
  // Default accent color if none provided
  const accentColor = colorClasses.accent || 'text-[#FF9848]';
  // Default text color if none provided
  const textColor = colorClasses.dropdownText || 'text-white/80';
  
  // Dynamic sizing based on size prop
  const getSizeClasses = () => {
    switch(size) {
      case "sm":
        return {
          digit: compact ? "text-base" : "text-sm",
          label: "text-xs",
          gap: "gap-1",
          padding: "p-0.5"
        };
      case "lg":
        return {
          digit: compact ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
          label: "text-sm",
          gap: "gap-3",
          padding: "p-1.5"
        };
      case "md":
      default:
        return {
          digit: compact ? "text-xl" : "text-lg",
          label: "text-xs",
          gap: "gap-2",
          padding: "p-1"
        };
    }
  };

  const sizeClasses = getSizeClasses();

  // Create a reusable time unit component
  const TimeUnit = ({ value, label }: { value: number | string, label: string }) => (
    <div className={sizeClasses.padding}>
      <div className={`${sizeClasses.digit} font-montserrat font-bold ${accentColor}`}>
        {value}
      </div>
      {showLabels && (
        <div className={`${sizeClasses.label} capitalize ${textColor}`}>
          {compact ? label.slice(0, 3) : label}
        </div>
      )}
    </div>
  );

  return (
    <div className={`grid grid-cols-4 ${sizeClasses.gap} text-center`}>
      <TimeUnit value={days} label="days" />
      <TimeUnit value={formatTimeUnit(hours)} label="hours" />
      <TimeUnit value={formatTimeUnit(minutes)} label="minutes" />
      <TimeUnit value={formatTimeUnit(seconds)} label="seconds" />
    </div>
  );
};

export default TimerDigits;
