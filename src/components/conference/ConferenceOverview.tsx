
import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Rocket, Lightbulb, Globe } from "lucide-react";

const ConferenceOverview = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Title Section with 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              Africa's path to the <span className="font-['Simula_Book_Italic']">future</span>
            </h2>
          </motion.div>
          <div className="lg:w-[61%]"></div> {/* Spacer div for maintaining the split */}
        </div>

        {/* Content Section with reversed 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-16">
          <div className="lg:w-[39%]"></div> {/* Spacer div */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%] mt-8 lg:mt-0"
          >
            <p className="text-xl font-lora text-gray-700 leading-relaxed max-w-[800px]">
              At RAADE's Annual Conference, we will come together to translate bold ideas into 
              continent-wide impact. This isn't just a conference—it's where change-makers like you 
              come together to shape tomorrow. Because we know Africa's future won't be built by 
              distant strategies, but by people in rooms like this, turning possibilities into reality.
            </p>
          </motion.div>
        </div>
        
        {/* Feature Cards Section - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div className="group" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }}>
            <div className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all duration-300 bg-[#FBB03B]/90 rounded-lg shadow p-6 relative overflow-hidden group-hover:translate-y-[-5px]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="h-14 w-14 flex items-center justify-center mb-4 bg-white rounded-full text-[#FBB03B] p-3 transform transition-transform group-hover:scale-110 duration-300">
                  <Rocket strokeWidth={1.5} size={28} className="group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-simula text-center text-white">Innovation Showcase</h3>
              </div>
              <div className="text-center mt-4 relative z-10">
                <p className="text-white font-lora">
                  Discover groundbreaking solutions developed by RAADE's Innovation Studios
                  and other leading African initiatives.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="group" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <div className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all duration-300 bg-[#FBB03B]/90 rounded-lg shadow p-6 relative overflow-hidden group-hover:translate-y-[-5px]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="h-14 w-14 flex items-center justify-center mb-4 bg-white rounded-full text-[#FBB03B] p-3 transform transition-transform group-hover:scale-110 duration-300">
                  <Globe strokeWidth={1.5} size={28} className="group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-simula text-center text-white">Global Networking</h3>
              </div>
              <div className="text-center mt-4 relative z-10">
                <p className="text-white font-lora">
                  Connect with African organizations, investors, academics, and students
                  passionate about sustainable development.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="group" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }}>
            <div className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-xl transition-all duration-300 bg-[#FBB03B]/90 rounded-lg shadow p-6 relative overflow-hidden group-hover:translate-y-[-5px]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="h-14 w-14 flex items-center justify-center mb-4 bg-white rounded-full text-[#FBB03B] p-3 transform transition-transform group-hover:scale-110 duration-300">
                  <Lightbulb strokeWidth={1.5} size={28} className="group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-simula text-center text-white">Thought Leadership</h3>
              </div>
              <div className="text-center mt-4 relative z-10">
                <p className="text-white font-lora">
                  Engage with compelling talks, panels, and workshops that challenge conventional
                  thinking about African development.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Video and Event Details Section */}
        <div className="mt-8 text-center">
          <motion.div className="aspect-video max-w-4xl mx-auto bg-gradient-to-br from-[#FBB03B]/10 to-[#FF9848]/5 mb-8 rounded-xl overflow-hidden shadow-lg" initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }}>
            {/* Placeholder for promotional video */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-[#FBB03B] font-medium font-lora">Conference Promotional Video</p>
            </div>
          </motion.div>
          
          <motion.div className="flex flex-wrap justify-center gap-4 mt-8" initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }}>
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
              <p className="text-raade-navy font-lora font-medium">200+ Attendees</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceOverview;
