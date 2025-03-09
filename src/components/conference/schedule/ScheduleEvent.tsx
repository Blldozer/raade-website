
import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Users } from "lucide-react";

export interface ScheduleEventProps {
  event: {
    time: string;
    title: string;
    description: string;
    location: string;
    type: string;
    speaker?: string;
    capacity?: string;
  };
  index: number;
}

const ScheduleEvent = ({ event, index }: ScheduleEventProps) => {
  const getEventTypeClass = (type: string) => {
    switch(type) {
      case "keynote":
        return "border-l-[#FBB03B]";
      case "panel":
        return "border-l-raade-navy";
      case "workshop":
        return "border-l-green-500";
      case "showcase":
        return "border-l-purple-500";
      case "social":
      case "break":
        return "border-l-gray-400";
      case "ceremony":
        return "border-l-red-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <motion.div
      key={`event-${index}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex flex-col md:flex-row mb-4 p-4 border-l-4 ${getEventTypeClass(event.type)} bg-gray-50 rounded-r-md hover:shadow-md transition-shadow`}
    >
      <div className="w-full md:w-1/4 mb-2 md:mb-0">
        <p className="font-semibold text-raade-navy font-montserrat">{event.time}</p>
      </div>
      <div className="w-full md:w-3/4">
        <h3 className="text-lg font-bold text-raade-navy font-montserrat">{event.title}</h3>
        <p className="text-gray-600 mb-2 font-opensans">{event.description}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="font-opensans">{event.location}</span>
          </div>
          
          {event.speaker && (
            <div className="flex items-center text-[#FBB03B]">
              <Users className="w-4 h-4 mr-1" />
              <span className="font-opensans">{event.speaker}</span>
            </div>
          )}
          
          {event.capacity && (
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-opensans">{event.capacity}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleEvent;
