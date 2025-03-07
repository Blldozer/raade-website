
import { useEffect, useState } from "react";
import { Timer, ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
}

const CountdownTimer = ({ targetDate, className }: CountdownTimerProps) => {
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
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [CONFERENCE_DATE]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`fixed left-0 top-1/3 z-50 transition-all duration-300 ${isExpanded ? 'translate-x-0' : 'translate-x-[-70%]'} ${className || ''}`}
    >
      <Card className={`bg-raade-navy text-white shadow-lg hover:shadow-xl transition-shadow rounded-r-lg ${isExpanded ? 'rounded-l-lg' : 'rounded-l-none'}`}>
        <CardContent className={`p-4 transition-all duration-300 ${isExpanded ? 'w-[320px]' : 'w-[150px]'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-raade-gold" />
              <h2 className="text-lg font-bold">Countdown</h2>
            </div>
            <button 
              onClick={toggleExpanded}
              className="text-white hover:text-raade-gold transition-colors"
              aria-label={isExpanded ? "Collapse countdown" : "Expand countdown"}
            >
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          
          <div className={`grid ${isExpanded ? 'grid-cols-4' : 'grid-cols-2'} gap-2 text-center`}>
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="p-1">
                <div className="text-xl font-bold text-raade-gold">
                  {value}
                </div>
                <div className="text-xs capitalize">{unit}</div>
              </div>
            ))}
          </div>

          {isExpanded && (
            <div className="mt-4 text-center">
              <p className="text-xs mb-2">Join us April 11-12, 2025</p>
              <Button 
                size="sm" 
                className="bg-raade-gold hover:bg-raade-gold/90 text-white w-full"
                onClick={() => navigate("/conference/register")}
              >
                Register Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CountdownTimer;
