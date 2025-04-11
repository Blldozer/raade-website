import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";

/**
 * SpeakingSession Component
 * 
 * Displays details about a speaker's presentation session
 * 
 * @param title - Title of the speaking session
 * @param description - Description of the speaking session
 * @param date - Date of the session (e.g., "April 11")
 * @param time - Time of the session (e.g., "10:00 AM - 11:00 AM")
 * @param location - Optional location of the session
 */
type SpeakingSessionProps = {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
};

const SpeakingSession = ({ title, description, date, time, location }: SpeakingSessionProps) => {
  if (!title) return null;
  
  // Map date string to full format with year and determine location
  const getFormattedDate = (dateStr?: string) => {
    if (!dateStr) return "";
    if (dateStr.includes("April 11")) return "April 11, 2025";
    if (dateStr.includes("April 12")) return "April 12, 2025";
    return `${dateStr}, 2025`;
  };
  
  // Determine location based on the date
  const getDefaultLocation = (dateStr?: string) => {
    if (!dateStr) return "";
    if (dateStr.includes("April 11")) return "Multicultural Center";
    if (dateStr.includes("April 12")) return "Hudspeth Auditorium";
    return "";
  };
  
  const formattedDate = getFormattedDate(date);
  const sessionLocation = location || getDefaultLocation(date);
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-raade-navy font-simula">Speaking At</h2>
      <Card className="border-[#FBB03B]/20">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-2 text-raade-navy font-simula">{title}</h3>
          {description && <p className="text-gray-600 mb-4 font-lora">{description}</p>}
          
          <div className="flex flex-wrap gap-4 items-center text-sm">
            {date && (
              <div className="flex items-center text-gray-500">
                <Calendar className="mr-2 h-4 w-4 text-[#FBB03B]" />
                <span className="font-lora">{formattedDate}</span>
              </div>
            )}
            
            {time && (
              <div className="flex items-center text-gray-500">
                <Clock className="mr-2 h-4 w-4 text-[#FBB03B]" />
                <span className="font-lora">{time}</span>
              </div>
            )}
            
            {sessionLocation && (
              <div className="flex items-center text-gray-500">
                <MapPin className="mr-2 h-4 w-4 text-[#FBB03B]" />
                <span className="font-lora">{sessionLocation}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeakingSession;
