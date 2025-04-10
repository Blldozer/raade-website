
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
                className="text-lg font-montserrat font-semibold data-[state=active]:bg-[#FBB03B] data-[state=active]:text-white"
                onClick={() => setActiveDay("day1")}
              >
                Day 1: Welcome Day<br/><span className="text-sm">(April 11)</span>
              </TabsTrigger>
              <TabsTrigger 
                value="day2" 
                className="text-lg font-montserrat font-semibold data-[state=active]:bg-[#FBB03B] data-[state=active]:text-white"
                onClick={() => setActiveDay("day2")}
              >
                Day 2: Main Conference<br/><span className="text-sm">(April 12)</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mt-8 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex mb-4 px-4 border-b pb-2">
              <div className="w-1/4 font-montserrat font-semibold text-gray-500 text-sm">Time</div>
              <div className="w-3/4 font-montserrat font-semibold text-gray-500 text-sm">Session</div>
            </div>
            
            <TabsContent value="day1">
              <DaySchedule day="day1" events={scheduleDay1} />
            </TabsContent>
            
            <TabsContent value="day2">
              <DaySchedule day="day2" events={scheduleDay2} />
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="bg-[#FBB03B]/10 p-6 rounded-lg mt-12 text-center">
          <p className="text-gray-700 font-opensans">
            This schedule is tentative and subject to change. Please check back for updates.
          </p>
          <p className="text-gray-700 font-opensans mt-2">
            <strong>Venue:</strong> Rice University, 6100 Main St, Houston, TX 77005
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConferenceSchedule;
