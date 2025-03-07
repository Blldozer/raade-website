
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Users } from "lucide-react";

const ConferenceSchedule = () => {
  const [activeDay, setActiveDay] = useState("day1");
  
  const scheduleDay1 = [
    {
      time: "8:00 AM - 9:00 AM",
      title: "Registration & Breakfast",
      description: "Check-in, collect conference materials, and enjoy breakfast.",
      location: "Main Lobby",
      type: "break"
    },
    {
      time: "9:00 AM - 9:30 AM",
      title: "Opening Ceremony",
      description: "Welcome address by RAADE leadership and Rice University representatives.",
      location: "Grand Hall",
      type: "ceremony"
    },
    {
      time: "9:30 AM - 10:30 AM",
      title: "Keynote: The Future of African Innovation",
      description: "Dr. Sarah Nkandu explores emerging trends in innovation across Africa.",
      location: "Grand Hall",
      speaker: "Dr. Sarah Nkandu",
      type: "keynote"
    },
    {
      time: "10:45 AM - 12:15 PM",
      title: "Panel: Sustainable Development Through Innovation",
      description: "Industry leaders discuss how innovation can address development challenges.",
      location: "Room A",
      type: "panel"
    },
    {
      time: "12:15 PM - 1:30 PM",
      title: "Networking Lunch",
      description: "Connect with fellow attendees over lunch.",
      location: "Dining Hall",
      type: "break"
    },
    {
      time: "1:30 PM - 3:00 PM",
      title: "Workshop: Human-Centered Design",
      description: "Hands-on workshop applying design thinking to development challenges.",
      location: "Workshop Room 1",
      capacity: "Limited to 40 participants",
      type: "workshop"
    },
    {
      time: "3:15 PM - 4:45 PM",
      title: "RAADE Projects Showcase",
      description: "Student teams present their innovation studio projects and outcomes.",
      location: "Exhibition Hall",
      type: "showcase"
    },
    {
      time: "5:00 PM - 6:30 PM",
      title: "Evening Reception & Networking",
      description: "Meet fellow attendees, speakers, and partners in a relaxed setting.",
      location: "Garden Terrace",
      type: "social"
    }
  ];
  
  const scheduleDay2 = [
    {
      time: "8:30 AM - 9:00 AM",
      title: "Morning Coffee",
      description: "Start your day with coffee and light refreshments.",
      location: "Main Lobby",
      type: "break"
    },
    {
      time: "9:00 AM - 10:00 AM",
      title: "Keynote: Building Innovation Ecosystems",
      description: "Michael Nkrumah discusses investment strategies for innovation in Africa.",
      location: "Grand Hall",
      speaker: "Michael Nkrumah",
      type: "keynote"
    },
    {
      time: "10:15 AM - 11:45 AM",
      title: "Panel: Technology Transfer & Scaling Solutions",
      description: "Experts share insights on taking innovations from concept to scale.",
      location: "Room A",
      type: "panel"
    },
    {
      time: "12:00 PM - 1:15 PM",
      title: "Networking Lunch",
      description: "Continue building connections over lunch.",
      location: "Dining Hall",
      type: "break"
    },
    {
      time: "1:30 PM - 3:00 PM",
      title: "Workshop: Building Partnerships for Impact",
      description: "Interactive session on creating effective cross-sector partnerships.",
      location: "Workshop Room 1",
      capacity: "Limited to 40 participants",
      type: "workshop"
    },
    {
      time: "3:15 PM - 4:15 PM",
      title: "Closing Keynote: The Path Forward",
      description: "Dr. Fatima Ahmed outlines a vision for the future of African development.",
      location: "Grand Hall",
      speaker: "Dr. Fatima Ahmed",
      type: "keynote"
    },
    {
      time: "4:15 PM - 5:00 PM",
      title: "Closing Ceremony & Next Steps",
      description: "Reflections on the conference and announcement of future initiatives.",
      location: "Grand Hall",
      type: "ceremony"
    }
  ];
  
  const getEventTypeClass = (type) => {
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
    <section id="schedule" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-4xl font-bold text-raade-navy mb-4 font-simula">Conference Schedule</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            Two days of inspiring talks, interactive workshops, and valuable networking.
          </p>
        </div>
        
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
            
            <TabsContent value="day1" className="mt-0">
              {scheduleDay1.map((event, index) => (
                <motion.div
                  key={`day1-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex flex-col md:flex-row mb-4 p-4 border-l-4 ${getEventTypeClass(event.type)} bg-gray-50 rounded-r-md hover:shadow-md transition-shadow`}
                >
                  <div className="w-full md:w-1/4 mb-2 md:mb-0">
                    <p className="font-semibold text-raade-navy font-simula">{event.time}</p>
                  </div>
                  <div className="w-full md:w-3/4">
                    <h3 className="text-lg font-bold text-raade-navy font-simula">{event.title}</h3>
                    <p className="text-gray-600 mb-2 font-lora">{event.description}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                      
                      {event.speaker && (
                        <div className="flex items-center text-[#FBB03B]">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{event.speaker}</span>
                        </div>
                      )}
                      
                      {event.capacity && (
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{event.capacity}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
            
            <TabsContent value="day2" className="mt-0">
              {scheduleDay2.map((event, index) => (
                <motion.div
                  key={`day2-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex flex-col md:flex-row mb-4 p-4 border-l-4 ${getEventTypeClass(event.type)} bg-gray-50 rounded-r-md hover:shadow-md transition-shadow`}
                >
                  <div className="w-full md:w-1/4 mb-2 md:mb-0">
                    <p className="font-semibold text-raade-navy font-simula">{event.time}</p>
                  </div>
                  <div className="w-full md:w-3/4">
                    <h3 className="text-lg font-bold text-raade-navy font-simula">{event.title}</h3>
                    <p className="text-gray-600 mb-2 font-lora">{event.description}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                      
                      {event.speaker && (
                        <div className="flex items-center text-[#FBB03B]">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{event.speaker}</span>
                        </div>
                      )}
                      
                      {event.capacity && (
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{event.capacity}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
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
