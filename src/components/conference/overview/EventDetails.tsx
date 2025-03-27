import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="mt-8 text-center">
      {/* Temporarily hide video placeholder */}
      {/* <motion.div 
        className="aspect-video max-w-4xl mx-auto bg-gradient-to-br from-[#FBB03B]/10 to-[#FF9848]/5 mb-8 rounded-xl overflow-hidden shadow-lg" 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-[#FBB03B] font-medium font-lora">Conference Promotional Video</p>
        </div>
      </motion.div> */}
      
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mt-8" 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center bg-[#FBB03B]/10 px-6 py-3 rounded-full hover:bg-[#FBB03B]/15 transition-colors">
          <Calendar className="h-5 w-5 text-[#FBB03B] mr-2" />
          <p className="text-raade-navy font-lora font-medium">April 11-12, 2025</p>
        </div>
        <div className="flex items-center bg-[#FBB03B]/10 px-6 py-3 rounded-full hover:bg-[#FBB03B]/15 transition-colors">
          <MapPin className="h-5 w-5 text-[#FBB03B] mr-2" />
          <p className="text-raade-navy font-lora font-medium">Rice University, Houston, TX</p>
        </div>
        <div className="flex items-center bg-[#FBB03B]/10 px-6 py-3 rounded-full hover:bg-[#FBB03B]/15 transition-colors">
          <Users className="h-5 w-5 text-[#FBB03B] mr-2" />
          <p className="text-raade-navy font-lora font-medium">100+ Attendees</p>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
