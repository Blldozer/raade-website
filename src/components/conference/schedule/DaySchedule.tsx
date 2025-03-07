
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ScheduleEvent from "./ScheduleEvent";

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

const DaySchedule = ({ day, events }: DayScheduleProps) => {
  return (
    <TabsContent value={day} className="mt-0">
      {events.map((event, index) => (
        <ScheduleEvent 
          key={`${day}-${index}`} 
          event={event} 
          index={index} 
        />
      ))}
    </TabsContent>
  );
};

export default DaySchedule;
