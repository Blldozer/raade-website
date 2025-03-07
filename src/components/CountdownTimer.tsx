
import { useEffect, useState } from "react";
import { Timer, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
  variant?: "nav" | "floating";
  colorScheme?: "light" | "dark" | "auto";
}

const CountdownTimer = ({
  targetDate,
  className,
  variant = "floating",
  colorScheme = "auto"
}: CountdownTimerProps) => {
  const navigate = useNavigate();
  // Use the provided targetDate or fall back to the default
  const CONFERENCE_DATE = targetDate ? new Date(targetDate) : new Date('2025-04-11T09:00:00');
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = CONFERENCE_DATE.getTime() - now.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
      const minutes = Math.floor(difference / 1000 / 60 % 60);
      const seconds = Math.floor(difference / 1000 % 60);
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [CONFERENCE_DATE]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Get context-aware color classes based on colorScheme
  const getColorClasses = (bgIsDark: boolean) => {
    if (colorScheme === "light") {
      return {
        text: "text-gray-800",
        highlight: "text-raade-navy",
        accent: "text-raade-gold",
        iconColor: "text-raade-gold",
        hoverBg: "hover:bg-gray-100",
        dropdownBg: "bg-white/95",
        dropdownText: "text-gray-800",
        dropdownBorder: "border-gray-200"
      };
    } else if (colorScheme === "dark") {
      return {
        text: "text-white",
        highlight: "text-white",
        accent: "text-raade-gold",
        iconColor: "text-raade-gold",
        hoverBg: "hover:bg-white/10",
        dropdownBg: "bg-raade-navy/95",
        dropdownText: "text-white",
        dropdownBorder: "border-gray-700"
      };
    } else {
      // Auto mode - adapt based on current route background
      return bgIsDark ? {
        text: "text-white",
        highlight: "text-white",
        accent: "text-raade-gold",
        iconColor: "text-raade-gold",
        hoverBg: "hover:bg-white/10",
        dropdownBg: "bg-raade-navy/95",
        dropdownText: "text-white",
        dropdownBorder: "border-gray-700"
      } : {
        text: "text-gray-800",
        highlight: "text-raade-navy",
        accent: "text-raade-gold",
        iconColor: "text-raade-gold",
        hoverBg: "hover:bg-gray-100",
        dropdownBg: "bg-white/95",
        dropdownText: "text-gray-800",
        dropdownBorder: "border-gray-200"
      };
    }
  };

  // Determine if we're on a page with a dark background
  // This is a simplified approach - we're checking the route to determine
  // if the background is dark or light
  const route = window.location.pathname;
  const isDarkBackground = route === "/" || route.includes("/about");
  
  const colors = getColorClasses(isDarkBackground);

  // Navigation variant (minimal in nav bar)
  if (variant === "nav") {
    return <div className="relative group">
        <div className={cn(
          "flex items-center gap-2 cursor-pointer font-montserrat px-3 py-2 rounded-md transition-colors",
          colors.text,
          colors.hoverBg
        )}>
          <Timer size={18} className={colors.iconColor} />
          <div className="text-sm font-medium">
            <span className="font-bold">{timeLeft.days}d</span>:{timeLeft.hours}h
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
              
              <div className="grid grid-cols-4 gap-1 text-center mb-3">
                {Object.entries(timeLeft).map(([unit, value]) => <div key={unit} className="p-1">
                    <div className={cn("text-lg font-montserrat font-bold", colors.accent)}>
                      {value}
                    </div>
                    <div className={cn("text-xs capitalize", colors.dropdownText)}>{unit}</div>
                  </div>)}
              </div>
              
              <div className="text-center">
                <p className={cn("text-xs mb-2", colors.dropdownText)}>April 11-12, 2025</p>
                <Button size="sm" onClick={() => navigate("/conference/register")} className="text-white w-full font-lora bg-raade-orange font-semibold text-lg">
                  Register Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>;
  }

  // Floating bubble variant (original)
  return <div className={`fixed left-0 top-1/3 z-50 transition-all duration-300 ${isExpanded ? 'translate-x-0' : 'translate-x-[-70%]'} ${className || ''}`}>
      <Card className={`bg-raade-navy text-white shadow-lg hover:shadow-xl transition-shadow rounded-r-lg ${isExpanded ? 'rounded-l-lg' : 'rounded-l-none'}`}>
        <CardContent className={`p-4 transition-all duration-300 ${isExpanded ? 'w-[320px]' : 'w-[150px]'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-raade-gold" />
              <h2 className="text-lg font-bold">Countdown</h2>
            </div>
            <button onClick={toggleExpanded} className="text-white hover:text-raade-gold transition-colors" aria-label={isExpanded ? "Collapse countdown" : "Expand countdown"}>
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          
          <div className={`grid ${isExpanded ? 'grid-cols-4' : 'grid-cols-2'} gap-2 text-center`}>
            {Object.entries(timeLeft).map(([unit, value]) => <div key={unit} className="p-1">
                <div className="text-xl font-bold text-raade-gold">
                  {value}
                </div>
                <div className="text-xs capitalize">{unit}</div>
              </div>)}
          </div>

          {isExpanded && <div className="mt-4 text-center">
              <p className="text-xs mb-2">Join us April 11-12, 2025</p>
              <Button size="sm" className="bg-raade-gold hover:bg-raade-gold/90 text-white w-full" onClick={() => navigate("/conference/register")}>
                Register Now
              </Button>
            </div>}
        </CardContent>
      </Card>
    </div>;
};

export default CountdownTimer;

