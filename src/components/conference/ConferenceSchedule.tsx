
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleHeader from "./schedule/ScheduleHeader";
import DaySchedule from "./schedule/DaySchedule";
import { scheduleDay1, scheduleDay2 } from "./schedule/scheduleData";

const ConferenceSchedule = () => {
  const [activeDay, setActiveDay] = useState("day1");

  return (
    <section id="schedule" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <ScheduleHeader />
        
        <Tabs defaultValue="day1" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger 
                value="day1" 
                className="text-lg font-simula data-[state=active]:bg-[#FBB03B] data-[state=active]:text-white"
                onClick={() => setActiveDay("day1")}
              >
                Day 1 (April 11)
              </TabsTrigger>
              <TabsTrigger 
                value="day2" 
                className="text-lg font-simula data-[state=active]:bg-[#FBB03B] data-[state=active]:text-white"
                onClick={() => setActiveDay("day2")}
              >
                Day 2 (April 12)
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mt-8">
            <div className="flex mb-4 px-4">
              <div className="w-1/4 font-simula text-gray-500 text-sm">Time</div>
              <div className="w-3/4 font-simula text-gray-500 text-sm">Session</div>
            </div>
            
            <DaySchedule day="day1" events={scheduleDay1} />
            <DaySchedule day="day2" events={scheduleDay2} />
          </div>
        </Tabs>
        
        <div className="bg-[#FBB03B]/10 p-6 rounded-lg mt-12 text-center">
          <p className="text-gray-700 font-lora">
            This schedule is subject to change. Please check back for updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConferenceSchedule;
