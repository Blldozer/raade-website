import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

/**
 * ScheduleHeader component - Displays the title and description for the conference schedule
 * 
 * Features:
 * - Elegant typography using Simula font for headings and Lora for body text
 * - Consistent 39%-61% split layout matching other section headers
 * - Visual emphasis on key event information
 * - Smooth animations for better user engagement
 */
const ScheduleHeader = () => {
  return (
    <div className="mb-12">
      {/* First row: Title on left (39%), empty space on right (61%) */}
      <div className="flex flex-col lg:flex-row mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[39%] mb-6 lg:mb-0"
        >
          <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
            Conference Schedule
          </h2>
        </motion.div>
        
        {/* Empty right spacer - 61% */}
        <motion.div 
          className="lg:w-[61%]" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Intentionally empty for layout */}
        </motion.div>
      </div>

      {/* Second row: Empty space on left (39%), paragraph on right (61%) */}
      <div className="flex flex-col lg:flex-row mb-8">
        <div className="lg:w-[39%]"></div> {/* Spacer div on left */}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-[61%]"
        >
          <p className="text-lg text-gray-600 font-lora mb-4 italic">
            Conference Schedule: April 11th & April 12th, 2025
          </p>
          <p className="text-md text-gray-600 font-lora mb-6">
            Join us for two days of inspiring talks, interactive workshops, and valuable networking opportunities focused on market-creating innovations for Africa.
          </p>
        </motion.div>
      </div>
      
      {/* Event details badges - Match the paragraph layout */}
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[39%]"></div> {/* Spacer div on left */}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-[61%] flex flex-wrap gap-4"
        >
          <div className="flex items-center bg-white px-5 py-2 rounded-full shadow-sm">
            <Calendar className="w-5 h-5 text-[#FBB03B] mr-2" />
            <span className="font-lora">April 11-12, 2025</span>
          </div>
          
          <div className="flex items-center bg-white px-5 py-2 rounded-full shadow-sm">
            <Clock className="w-5 h-5 text-[#FBB03B] mr-2" />
            <span className="font-lora">Day 1: 4:00 PM - 7:30 PM<br/>Day 2: 8:00 AM - 9:00 PM</span>
          </div>
          
          <div className="flex items-center bg-white px-5 py-2 rounded-full shadow-sm">
            <MapPin className="w-5 h-5 text-[#FBB03B] mr-2" />
            <span className="font-lora">Day 1: Multicultural Center<br/>Day 2: Hudspeth Auditorium, Glasscock School of Continuing Studies</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleHeader;
