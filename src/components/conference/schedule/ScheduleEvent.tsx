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

/**
 * ScheduleEvent component - Displays individual event details in the conference schedule
 * 
 * Features:
 * - Table-like layout with time on the left and session details on the right
 * - Elegant typography using Simula Book and Lora fonts
 * - Color-coded event types for quick visual identification
 * - Consistent RAADE branding throughout
 */
const ScheduleEvent = ({ event, index }: ScheduleEventProps) => {
  // Animation variant for individual schedule events
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  };

  // Get event type color and icon styling
  const getEventTypeStyles = (type: string) => {
    switch(type) {
      case "keynote":
        return {
          borderColor: "#FBB03B",
          bgColor: "bg-[#FBB03B]/10",
          textColor: "text-[#FBB03B]",
          icon: "🎤"
        };
      case "panel":
        return {
          borderColor: "#274675",
          bgColor: "bg-raade-navy/10",
          textColor: "text-raade-navy",
          icon: "👥"
        };
      case "workshop":
        return {
          borderColor: "#4CAF50",
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          icon: "🧩"
        };
      case "showcase":
        return {
          borderColor: "#9C27B0",
          bgColor: "bg-purple-100",
          textColor: "text-purple-700",
          icon: "🌟"
        };
      case "social":
        return {
          borderColor: "#2196F3",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          icon: "🥂"
        };
      case "break":
        return {
          borderColor: "#9E9E9E",
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          icon: "☕"
        };
      case "ceremony":
        return {
          borderColor: "#F44336",
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          icon: "🎭"
        };
      case "call-to-action":
        return {
          borderColor: "#E91E63",
          bgColor: "bg-pink-100",
          textColor: "text-pink-700",
          icon: "✨"
        };
      case "fireside":
        return {
          borderColor: "#FF9800",
          bgColor: "bg-orange-100",
          textColor: "text-orange-700",
          icon: "🔥"
        };
      default:
        return {
          borderColor: "#9E9E9E",
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          icon: "📌"
        };
    }
  };

  const styles = getEventTypeStyles(event.type);

  return (
    <motion.div
      variants={itemVariant}
      className="flex mb-4 hover:shadow-md transition-shadow duration-300 border-b border-gray-100 pb-4"
    >
      {/* Time Column - Fixed width */}
      <div className="w-1/4 pr-4">
        <div className="font-sans font-semibold text-raade-navy">{event.time}</div>
        <div className={`text-sm ${styles.textColor} font-medium inline-flex items-center mt-1`}>
          <span className="mr-1">{styles.icon}</span>
          <span className="capitalize font-lora italic">{event.type}</span>
        </div>
      </div>
      
      {/* Content Column - Takes remaining width */}
      <div className="w-3/4 pl-4 border-l-4" style={{ borderLeftColor: styles.borderColor }}>
        <div className={`${styles.bgColor} p-4 rounded-lg`}>
          <h3 className="text-lg font-bold text-raade-navy font-simula mb-1">{event.title}</h3>
          {event.description && (
            <p className="text-gray-600 mb-3 font-lora text-sm md:text-base italic">{event.description}</p>
          )}
          
          <div className="flex flex-wrap gap-3 text-sm">
            {event.location && (
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 mr-1 text-gray-500" />
                <span className="font-lora text-gray-600">{event.location}</span>
              </div>
            )}
            
            {event.speaker && (
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                <Users className="w-3.5 h-3.5 mr-1 text-[#FBB03B]" />
                <span className="font-lora text-gray-600">{event.speaker}</span>
              </div>
            )}
            
            {event.capacity && (
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
                <span className="font-lora text-gray-600">{event.capacity}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleEvent;
