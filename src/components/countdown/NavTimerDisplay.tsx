
import { useState } from "react";
import { Timer, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import TimerDigits from "./TimerDigits";
import { formatTimeUnit } from "./timerUtils";

interface NavTimerDisplayProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  colors: {
    text: string;
    highlight: string;
    accent: string;
    iconColor: string;
    hoverBg: string;
    dropdownBg: string;
    dropdownText: string;
    dropdownBorder: string;
  };
}

const NavTimerDisplay = ({ timeLeft, colors }: NavTimerDisplayProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative group">
      <div className={cn(
        "flex items-center gap-2 cursor-pointer font-montserrat px-3 py-2 rounded-md transition-colors",
        colors.text,
        colors.hoverBg
      )}>
        <Timer size={18} className={colors.iconColor} />
        <div className="text-sm font-medium">
          <span className="font-bold">{timeLeft.days}d</span>:{formatTimeUnit(timeLeft.hours)}h:{formatTimeUnit(timeLeft.minutes)}m:{formatTimeUnit(timeLeft.seconds)}s
        </div>
        <ChevronDown size={16} className="group-hover:hidden" />
        <ChevronUp size={16} className="hidden group-hover:block" />
      </div>
      
      {/* Expanded dropdown on hover */}
      <div className="absolute right-0 mt-1 hidden group-hover:block z-50">
        <Card className={cn(
          "backdrop-blur-sm shadow-lg w-60 border",
          colors.dropdownBg,
          colors.dropdownBorder
        )}>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Timer size={18} className={colors.iconColor} />
              <h3 className={cn("text-sm font-bold font-montserrat", colors.highlight)}>Conference Countdown</h3>
            </div>
            
            <TimerDigits 
              days={timeLeft.days}
              hours={timeLeft.hours}
              minutes={timeLeft.minutes}
              seconds={timeLeft.seconds}
              colorClasses={{
                accent: colors.accent,
                dropdownText: colors.dropdownText
              }}
            />
            
            <div className="text-center">
              <p className={cn("text-xs mb-2", colors.dropdownText)}>April 11-12, 2025</p>
              <Button size="sm" onClick={() => navigate("/conference/register")} className="text-white w-full font-lora bg-raade-orange font-semibold text-lg">
                Register Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NavTimerDisplay;
