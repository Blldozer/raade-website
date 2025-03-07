
import { formatTimeUnit } from "./timerUtils";

interface TimerDigitsProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  showLabels?: boolean;
  colorClasses: {
    accent: string;
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
  return (
    <div className={`grid grid-cols-4 gap-${compact ? '1' : '2'} text-center`}>
      <div className="p-1">
        <div className={`${compact ? 'text-xl' : 'text-lg'} font-montserrat font-bold ${colorClasses.accent}`}>
          {days}
        </div>
        {showLabels && (
          <div className={`text-xs capitalize ${colorClasses.dropdownText || ''}`}>
            {compact ? 'days' : 'days'}
          </div>
        )}
      </div>
      <div className="p-1">
        <div className={`${compact ? 'text-xl' : 'text-lg'} font-montserrat font-bold ${colorClasses.accent}`}>
          {formatTimeUnit(hours)}
        </div>
        {showLabels && (
          <div className={`text-xs capitalize ${colorClasses.dropdownText || ''}`}>
            {compact ? 'hrs' : 'hours'}
          </div>
        )}
      </div>
      <div className="p-1">
        <div className={`${compact ? 'text-xl' : 'text-lg'} font-montserrat font-bold ${colorClasses.accent}`}>
          {formatTimeUnit(minutes)}
        </div>
        {showLabels && (
          <div className={`text-xs capitalize ${colorClasses.dropdownText || ''}`}>
            {compact ? 'min' : 'minutes'}
          </div>
        )}
      </div>
      <div className="p-1">
        <div className={`${compact ? 'text-xl' : 'text-lg'} font-montserrat font-bold ${colorClasses.accent}`}>
          {formatTimeUnit(seconds)}
        </div>
        {showLabels && (
          <div className={`text-xs capitalize ${colorClasses.dropdownText || ''}`}>
            {compact ? 'sec' : 'seconds'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerDigits;
