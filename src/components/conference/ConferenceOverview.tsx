
import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Rocket, Lightbulb, Globe } from "lucide-react";

const ConferenceOverview = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-raade-navy mb-4 font-simula">AFRICA'S PATH TO THE FUTURE</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">
            At RAADE's Annual Conference, we will come together to translate bold ideas into continent-wide impact. 
            This isn't just a conference—it's where change-makers like you come together to shape tomorrow. 
            Because we know Africa's future won't be built by distant strategies, but by people in rooms like this, 
            turning possibilities into reality.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div 
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full border-t-4 border-t-[#8B5CF6] hover:shadow-xl transition-all duration-300 bg-white rounded-lg shadow p-6 relative overflow-hidden group-hover:translate-y-[-5px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="h-14 w-14 flex items-center justify-center mb-4 bg-gradient-to-br from-[#9061F9] to-[#8B5CF6] rounded-full text-white p-3 transform transition-transform group-hover:scale-110 duration-300">
                  <Rocket strokeWidth={1.5} size={28} className="group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-simula text-center">Innovation Showcase</h3>
              </div>
              <div className="text-center mt-4 relative z-10">
                <p className="text-gray-600 font-lora">
                  Discover groundbreaking solutions developed by RAADE's Innovation Studios
                  and other leading African initiatives.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-full border-t-4 border-t-[#8B5CF6] hover:shadow-xl transition-all duration-300 bg-white rounded-lg shadow p-6 relative overflow-hidden group-hover:translate-y-[-5px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="h-14 w-14 flex items-center justify-center mb-4 bg-gradient-to-br from-[#9061F9] to-[#8B5CF6] rounded-full text-white p-3 transform transition-transform group-hover:scale-110 duration-300">
                  <Globe strokeWidth={1.5} size={28} className="group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-simula text-center">Global Networking</h3>
              </div>
              <div className="text-center mt-4 relative z-10">
                <p className="text-gray-600 font-lora">
                  Connect with African organizations, investors, academics, and students
                  passionate about sustainable development.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="h-full border-t-4 border-t-[#8B5CF6] hover:shadow-xl transition-all duration-300 bg-white rounded-lg shadow p-6 relative overflow-hidden group-hover:translate-y-[-5px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="h-14 w-14 flex items-center justify-center mb-4 bg-gradient-to-br from-[#9061F9] to-[#8B5CF6] rounded-full text-white p-3 transform transition-transform group-hover:scale-110 duration-300">
                  <Lightbulb strokeWidth={1.5} size={28} className="group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-simula text-center">Thought Leadership</h3>
              </div>
              <div className="text-center mt-4 relative z-10">
                <p className="text-gray-600 font-lora">
                  Engage with compelling talks, panels, and workshops that challenge conventional
                  thinking about African development.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-8 text-center">
          <motion.div 
            className="aspect-video max-w-4xl mx-auto bg-gradient-to-br from-[#8B5CF6]/10 to-[#9061F9]/5 mb-8 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Placeholder for promotional video */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-[#8B5CF6] font-medium font-lora">Conference Promotional Video</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center bg-[#8B5CF6]/10 px-6 py-3 rounded-full hover:bg-[#8B5CF6]/15 transition-colors">
              <Calendar className="h-5 w-5 text-[#8B5CF6] mr-2" />
              <p className="text-raade-navy font-lora font-medium">April 11-12, 2025</p>
            </div>
            <div className="flex items-center bg-[#8B5CF6]/10 px-6 py-3 rounded-full hover:bg-[#8B5CF6]/15 transition-colors">
              <MapPin className="h-5 w-5 text-[#8B5CF6] mr-2" />
              <p className="text-raade-navy font-lora font-medium">Rice University, Houston, TX</p>
            </div>
            <div className="flex items-center bg-[#8B5CF6]/10 px-6 py-3 rounded-full hover:bg-[#8B5CF6]/15 transition-colors">
              <Users className="h-5 w-5 text-[#8B5CF6] mr-2" />
              <p className="text-raade-navy font-lora font-medium">200+ Attendees</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceOverview;
