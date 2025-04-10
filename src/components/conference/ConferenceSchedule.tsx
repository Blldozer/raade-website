import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleHeader from "./schedule/ScheduleHeader";
import DaySchedule from "./schedule/DaySchedule";
import { scheduleDay1, scheduleDay2 } from "./schedule/scheduleData";
import { motion } from "framer-motion";

/**
 * ConferenceSchedule component - Displays the conference agenda in a tabbed interface
 * 
 * Features:
 * - Elegant typography using Simula Book and Lora fonts
 * - Responsive design for all device sizes
 * - Interactive tab navigation between conference days
 * - Consistent RAADE branding and styling
 * - Visual indicators for different event types
 * - Smooth animations for better user experience
 * 
 * Design considerations:
 * - Uses Simula Book for headings and Lora for body text
 * - Incorporates RAADE's navy blue and yellow-orange brand colors
 * - Implements subtle animations for mobile and desktop
 * - Uses consistent spacing and padding for optimal readability
 */
const ConferenceSchedule = () => {
  const [activeDay, setActiveDay] = useState("day1");

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="schedule" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <ScheduleHeader />
        
        <div className="relative rounded-xl bg-white shadow-md p-6 md:p-8">
          <Tabs defaultValue="day1" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-gray-100 rounded-lg">
                <TabsTrigger 
                  value="day1" 
                  className="text-base md:text-lg font-simula rounded-md transition-all duration-300
                    data-[state=active]:bg-raade-navy data-[state=active]:text-white 
                    data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600
                    data-[state=inactive]:hover:bg-gray-200"
                  onClick={() => setActiveDay("day1")}
                >
                  <span className="hidden md:inline">Day 1</span>
                  <span className="md:hidden">April 11</span>
                  <span className="hidden md:inline"> (April 11)</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="day2" 
                  className="text-base md:text-lg font-simula rounded-md transition-all duration-300
                    data-[state=active]:bg-raade-navy data-[state=active]:text-white 
                    data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600
                    data-[state=inactive]:hover:bg-gray-200"
                  onClick={() => setActiveDay("day2")}
                >
                  <span className="hidden md:inline">Day 2</span>
                  <span className="md:hidden">April 12</span>
                  <span className="hidden md:inline"> (April 12)</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="mt-8">
              <div className="flex mb-4 px-4 border-b border-gray-200 pb-2">
                <div className="w-1/4 font-simula text-raade-navy text-sm">TIME</div>
                <div className="w-3/4 font-simula text-raade-navy text-sm">SESSION</div>
              </div>
              
              <div className="overflow-hidden">
                <DaySchedule day="day1" events={scheduleDay1} />
                <DaySchedule day="day2" events={scheduleDay2} />
              </div>
            </div>
          </Tabs>
          
          <div className="bg-[#FBB03B]/10 p-6 rounded-lg mt-12 border border-[#FBB03B]/20">
            <p className="text-gray-700 font-lora text-center italic">
              This schedule is subject to change. Please check back for updates before the event.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ConferenceSchedule;
