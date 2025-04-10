import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronDown, CalendarPlus } from "lucide-react";

/**
 * AddToCalendarButton component - Creates calendar links for various platforms
 */
const AddToCalendarButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Conference details for calendar events
  const eventDetails = {
    title: "RAADE Conference 2025",
    startDate: "20250411T160000",
    endDate: "20250412T210000",
    description: "Conference focusing on market-creating innovations for Africa. Join us for inspiring talks, interactive workshops, and valuable networking opportunities.",
    location: "Rice University, Houston, TX"
  };

  // Generate calendar links
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
  
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${eventDetails.startDate}`,
    `DTEND:${eventDetails.endDate}`,
    `SUMMARY:${eventDetails.title}`,
    `DESCRIPTION:${eventDetails.description}`,
    `LOCATION:${eventDetails.location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\n");

  const icsBlob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const icsUrl = URL.createObjectURL(icsBlob);
  
  return (
    <div className="relative z-10">
      <button 
        className="flex items-center bg-white px-5 py-2 rounded-full shadow-sm hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarPlus className="w-5 h-5 text-[#FBB03B] mr-2" />
        <span className="font-lora">Add to Calendar</span>
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <a 
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Google Calendar
            </a>
            <a 
              href={icsUrl}
              download="raade_conference_2025.ics"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              iCal/Outlook
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

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
            <div className="font-lora">
              <a 
                href="https://maps.app.goo.gl/5wJH9GK5aCZx9BkU8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Day 1: Multicultural Center
              </a>
              <br/>
              <a 
                href="https://maps.app.goo.gl/72W5FcG2U4Ve23vN7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Day 2: Hudspeth Auditorium, Glasscock School of Continuing Studies
              </a>
            </div>
          </div>

          <AddToCalendarButton />
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleHeader;
