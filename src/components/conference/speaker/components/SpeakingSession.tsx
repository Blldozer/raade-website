import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

/**
 * SpeakingSession Component
 * 
 * Displays details about a speaker's presentation session
 * Currently hidden for all speakers until schedule is finalized
 * 
 * @param title - Title of the speaking session
 * @param description - Description of the speaking session
 * @param date - Date of the session (e.g., "April 11")
 * @param time - Time of the session (e.g., "10:00 AM - 11:00 AM")
 */
type SpeakingSessionProps = {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
};

const SpeakingSession = ({ title, description, date, time }: SpeakingSessionProps) => {
  // Temporarily hidden for all speakers
  return null;
  
  /* Original implementation preserved for when needed again
  if (!title) return null;
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-raade-navy font-montserrat">Speaking At</h2>
      <Card className="border-[#FBB03B]/20">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-2 text-raade-navy font-montserrat">{title}</h3>
          {description && <p className="text-gray-600 mb-4 font-opensans">{description}</p>}
          
          <div className="flex flex-wrap gap-4 items-center text-sm">
            {date && (
              <div className="flex items-center text-gray-500">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="font-opensans">{date}</span>
              </div>
            )}
            
            {time && (
              <div className="flex items-center text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                <span className="font-opensans">{time}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
  */
};

export default SpeakingSession;
