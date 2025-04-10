
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ScheduleEvent from "./ScheduleEvent";
import { motion } from "framer-motion";

export interface DayScheduleProps {
  day: string;
  events: Array<{
    time: string;
    title: string;
    description: string;
    location: string;
    type: string;
    speaker?: string;
    capacity?: string;
  }>;
}

/**
 * DaySchedule component - Displays the events for a specific conference day
 * 
 * Features:
 * - Elegant typography with Simula Book and Lora fonts
 * - Staggered animation for event listings
 * - Responsive design for all device sizes
 * - Automatic mapping of events from data source
 * - Visual consistency with RAADE brand
 * 
 * Animation considerations:
 * - Uses staggered reveals for better mobile performance
 * - Keeps animations subtle to avoid distracting from content
 */
const DaySchedule = ({ day, events }: DayScheduleProps) => {
  // Animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <TabsContent value={day} className="mt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event, index) => (
          <ScheduleEvent 
            key={`${day}-${index}`} 
            event={event} 
            index={index} 
          />
        ))}
      </motion.div>
    </TabsContent>
  );
};

export default DaySchedule;
