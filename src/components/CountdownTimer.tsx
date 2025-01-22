import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const CONFERENCE_DATE = new Date('2025-04-11T09:00:00');

const CountdownTimer = () => {
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
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="bg-raade-navy text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Timer className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Conference Countdown</h2>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="p-4">
                <div className="text-3xl md:text-4xl font-bold text-raade-gold">
                  {value}
                </div>
                <div className="text-sm md:text-base capitalize">{unit}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountdownTimer;