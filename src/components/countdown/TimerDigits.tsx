
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
}

const TimerDigits = ({ 
  days, 
  hours, 
  minutes, 
  seconds, 
  showLabels = true,
  colorClasses,
  compact = false
}: TimerDigitsProps) => {
  // Default accent color (bright orange) if none provided
  const accentColor = colorClasses.accent || 'text-[#FF9848]';
  // Default text color (white with opacity) if none provided
  const textColor = colorClasses.dropdownText || 'text-white/80';

  return (
    <div className={`grid grid-cols-4 gap-${compact ? '1' : '2'} text-center`}>
      <div className="p-1">
        <div className={`${compact ? 'text-xl' : 'text-lg'} font-montserrat font-bold ${accentColor}`}>
          {days}
        </div>
        {showLabels && (
          <div className={`text-xs capitalize ${textColor}`}>
            {compact ? 'days' : 'days'}
          </div>
        )}
      </div>
      <div className="p-1">
        <div className={`${compact ? 'text-xl' : 'text-lg'} font-montserrat font-bold ${accentColor}`}>
          {formatTimeUnit(hours)}
        </div>
        {showLabels && (
          <div className={`text-xs capitalize ${textColor}`}>
            {compact ? 'hrs' : 'hours'}
          </div>
        )}
      </div>
      <div className="p-1">
        <div className={`${compact ? 'text-xl' : 'text-lg'} font-montserrat font-bold ${accentColor}`}>
          {formatTimeUnit(minutes)}
        </div>
        {showLabels && (
          <div className={`text-xs capitalize ${textColor}`}>
            {compact ? 'min' : 'minutes'}
          </div>
        )}
      </div>
      <div className="p-1">
        <div className={`${compact ? 'text-xl' : 'text-lg'} font-montserrat font-bold ${accentColor}`}>
          {formatTimeUnit(seconds)}
        </div>
        {showLabels && (
          <div className={`text-xs capitalize ${textColor}`}>
            {compact ? 'sec' : 'seconds'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerDigits;
