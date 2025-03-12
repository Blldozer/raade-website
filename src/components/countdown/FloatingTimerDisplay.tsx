
import { Card } from "../ui/card";
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
    iconColor: "text-raade-gold"
  };
  const timerColors = colors || defaultColors;

  // Determine if we need to add a background for light mode
  // If text is dark (indicating we're on a light background), add a navy background
  const needsBackground = timerColors.text?.includes('text-gray') || timerColors.text?.includes('text-black') || timerColors.text?.includes('text-raade-navy');
  const cardBackground = needsBackground ? "bg-raade-navy text-white" : "bg-raade-navy";

  return (
    <div className={`fixed left-0 top-1/3 z-50 transition-all duration-300 ${isExpanded ? 'translate-x-0' : 'translate-x-[-70%]'} ${className || ''}`}>
      <Card className={`${cardBackground} ${timerColors.text} shadow-lg hover:shadow-xl transition-shadow rounded-r-lg ${isExpanded ? 'rounded-l-lg' : 'rounded-l-none'}`}>
        <div className="p-4 flex">
          {isExpanded ? (
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Timer size={18} className="text-[#FF9848]" />
                  <h3 className="text-sm font-bold font-montserrat text-white">Conference Countdown</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleExpanded}
                  className="p-1 text-white hover:bg-white/10"
                >
                  <ChevronLeft size={16} />
                </Button>
              </div>
              
              <TimerDigits 
                days={timeLeft.days} 
                hours={timeLeft.hours} 
                minutes={timeLeft.minutes} 
                seconds={timeLeft.seconds} 
                colorClasses={{
                  accent: "text-[#FF9848]", // Brighter orange that stands out against dark backgrounds
                  dropdownText: "text-white/80"
                }} 
              />
              
              <div className="text-center mt-3">
                <p className="text-xs mb-2 text-white/80">April 11-12, 2025</p>
                <Button size="sm" onClick={() => navigate("/conference/register")} className="text-white w-full font-lora bg-[#FF9848] hover:bg-[#FF8A4D] font-semibold text-lg">
                  Register Now
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleExpanded}
                className="p-1 text-white hover:bg-white/10"
              >
                <ChevronRight size={16} />
              </Button>
              <div className="rotate-90 origin-left whitespace-nowrap mt-16 ml-1 font-bold text-sm text-white">
                CONFERENCE TIMER
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FloatingTimerDisplay;
