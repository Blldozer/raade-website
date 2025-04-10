
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

/**
 * ScheduleHeader component - Displays the title and description for the conference schedule
 * 
 * Features:
 * - Animated heading with RAADE brand styling
 * - Responsive layout for all device sizes
 * - Visual emphasis on key event information
 * - Consistent typography with the rest of the site
 */
const ScheduleHeader = () => {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center justify-center mb-4">
        <div className="h-0.5 w-8 bg-[#FBB03B] mr-4"></div>
        <span className="text-sm uppercase tracking-wider font-montserrat text-gray-500">April 11-12, 2025</span>
        <div className="h-0.5 w-8 bg-[#FBB03B] ml-4"></div>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold text-raade-navy mb-4 font-montserrat">
        Conference Schedule
      </h2>
      
      <p className="text-lg text-gray-600 max-w-3xl mx-auto font-opensans mb-6">
        Two days of inspiring talks, interactive workshops, and valuable networking.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
        <div className="flex items-center bg-white px-5 py-2 rounded-full shadow-sm">
          <Calendar className="w-5 h-5 text-[#FBB03B] mr-2" />
          <span className="font-opensans">April 11-12, 2025</span>
        </div>
        
        <div className="flex items-center bg-white px-5 py-2 rounded-full shadow-sm">
          <Clock className="w-5 h-5 text-[#FBB03B] mr-2" />
          <span className="font-opensans">9:00 AM - 10:00 PM</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleHeader;
