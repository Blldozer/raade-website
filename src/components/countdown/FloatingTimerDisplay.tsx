
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Timer, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TimerDigits from "./TimerDigits";
import { cn } from "@/lib/utils";
import { ColorScheme } from "./timerUtils";

interface FloatingTimerDisplayProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isExpanded: boolean;
  toggleExpanded: () => void;
  className?: string;
  colors?: ColorScheme;
}

const FloatingTimerDisplay = ({
  timeLeft,
  isExpanded,
  toggleExpanded,
  className,
  colors
}: FloatingTimerDisplayProps) => {
  const navigate = useNavigate();
  
  // Default colors if none provided
  const defaultColors = {
    text: "text-white",
    accent: "text-raade-gold",
    iconColor: "text-raade-gold",
  };

  const timerColors = colors || defaultColors;
  
  // Determine if we need to add a background for light mode
  // If text is dark (indicating we're on a light background), add a navy background
  const needsBackground = timerColors.text?.includes('text-gray') || 
                          timerColors.text?.includes('text-black') ||
                          timerColors.text?.includes('text-raade-navy');
  
  const cardBackground = needsBackground 
    ? "bg-raade-navy text-white" 
    : "bg-raade-navy";

  return (
    <div className={`fixed left-0 top-1/3 z-50 transition-all duration-300 ${isExpanded ? 'translate-x-0' : 'translate-x-[-70%]'} ${className || ''}`}>
      <Card className={`${cardBackground} ${timerColors.text} shadow-lg hover:shadow-xl transition-shadow rounded-r-lg ${isExpanded ? 'rounded-l-lg' : 'rounded-l-none'}`}>
        <CardContent className={`p-4 transition-all duration-300 ${isExpanded ? 'w-[320px]' : 'w-[170px]'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Timer className={`w-5 h-5 ${needsBackground ? 'text-raade-gold' : timerColors.iconColor}`} />
              <h2 className="text-lg font-bold">Countdown</h2>
            </div>
            <button onClick={toggleExpanded} className={`${needsBackground ? 'text-white hover:text-raade-gold' : `${timerColors.text} hover:${timerColors.accent}`} transition-colors`} aria-label={isExpanded ? "Collapse countdown" : "Expand countdown"}>
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          
          <TimerDigits 
            days={timeLeft.days}
            hours={timeLeft.hours}
            minutes={timeLeft.minutes}
            seconds={timeLeft.seconds}
            colorClasses={{
              accent: needsBackground ? 'text-raade-gold' : timerColors.accent
            }}
            compact={true}
          />
          
          {isExpanded && <div className="mt-4 text-center">
              <p className="text-xs mb-2">Join us April 11-12, 2025</p>
              <Button size="sm" className="bg-raade-gold hover:bg-raade-gold/90 text-white w-full" onClick={() => navigate("/conference/register")}>
                Register Now
              </Button>
            </div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingTimerDisplay;
