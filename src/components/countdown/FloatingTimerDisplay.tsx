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
    iconColor: "text-raade-gold"
  };
  const timerColors = colors || defaultColors;

  // Determine if we need to add a background for light mode
  // If text is dark (indicating we're on a light background), add a navy background
  const needsBackground = timerColors.text?.includes('text-gray') || timerColors.text?.includes('text-black') || timerColors.text?.includes('text-raade-navy');
  const cardBackground = needsBackground ? "bg-raade-navy text-white" : "bg-raade-navy";
  return <div className={`fixed left-0 top-1/3 z-50 transition-all duration-300 ${isExpanded ? 'translate-x-0' : 'translate-x-[-70%]'} ${className || ''}`}>
      <Card className={`${cardBackground} ${timerColors.text} shadow-lg hover:shadow-xl transition-shadow rounded-r-lg ${isExpanded ? 'rounded-l-lg' : 'rounded-l-none'}`}>
        
      </Card>
    </div>;
};
export default FloatingTimerDisplay;