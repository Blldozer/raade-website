
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Timer, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TimerDigits from "./TimerDigits";

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
  progressPercentage?: number;
}

const FloatingTimerDisplay = ({
  timeLeft,
  isExpanded,
  toggleExpanded,
  className,
  progressPercentage = 0
}: FloatingTimerDisplayProps) => {
  const navigate = useNavigate();

  return (
    <div className={`fixed left-0 top-1/3 z-50 transition-all duration-300 ${isExpanded ? 'translate-x-0' : 'translate-x-[-70%]'} ${className || ''}`}>
      <Card className={`bg-raade-navy text-white shadow-lg hover:shadow-xl transition-shadow rounded-r-lg ${isExpanded ? 'rounded-l-lg' : 'rounded-l-none'}`}>
        <CardContent className={`p-4 transition-all duration-300 ${isExpanded ? 'w-[320px]' : 'w-[170px]'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-raade-gold" />
              <h2 className="text-lg font-bold">Countdown</h2>
            </div>
            <button onClick={toggleExpanded} className="text-white hover:text-raade-gold transition-colors" aria-label={isExpanded ? "Collapse countdown" : "Expand countdown"}>
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          
          <TimerDigits 
            days={timeLeft.days}
            hours={timeLeft.hours}
            minutes={timeLeft.minutes}
            seconds={timeLeft.seconds}
            colorClasses={{
              accent: "text-raade-gold"
            }}
            compact={true}
          />
          
          {/* Progress bar */}
          <div className="mt-3">
            <Progress value={progressPercentage} className="h-2 bg-white/20">
              <div 
                className="h-full bg-raade-gold rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              />
            </Progress>
            <p className="text-xs mt-1 text-right text-white/80">
              {progressPercentage}% to conference day
            </p>
          </div>

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
