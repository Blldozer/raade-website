import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
const ConferenceOverview = () => {
  return <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-3xl md:text-4xl font-bold text-raade-navy mb-4 font-simula">AFRICA'S PATH TO THE FUTURE</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-lora">At RAADE's Annual Conference, we will come together to translate bold ideas into continent-wide impact. This isn't just a conference—it's where change-makers like you come together to shape tomorrow. Because we know Africa's future won't be built by distant strategies, but by people in rooms like this, turning possibilities into reality.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div className="scroll-animate" initial={{
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
            <div className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-lg transition-shadow bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 text-[#FBB03B] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5" />
                    <line x1="12" y1="12" x2="20" y2="7.5" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <line x1="12" y1="12" x2="4" y2="7.5" />
                    <line x1="16" y1="5.25" x2="8" y2="9.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-simula text-center">Innovation Showcase</h3>
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-600 font-lora">
                  Discover groundbreaking solutions developed by RAADE's Innovation Studios
                  and other leading African initiatives.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="scroll-animate" initial={{
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
            <div className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-lg transition-shadow bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 text-[#FBB03B] mb-4">
                  <Users className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-simula text-center">Global Networking</h3>
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-600 font-lora">
                  Connect with African organizations, investors, academics, and students
                  passionate about sustainable development.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="scroll-animate" initial={{
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
            <div className="h-full border-t-4 border-t-[#FBB03B] hover:shadow-lg transition-shadow bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 text-[#FBB03B] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-simula text-center">Thought Leadership</h3>
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-600 font-lora">
                  Engage with compelling talks, panels, and workshops that challenge conventional
                  thinking about African development.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="aspect-video max-w-4xl mx-auto bg-gray-200 mb-8 rounded-xl overflow-hidden">
            {/* Placeholder for promotional video */}
            <div className="w-full h-full flex items-center justify-center bg-raade-navy/10">
              <p className="text-raade-navy font-medium font-lora">Conference Promotional Video</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center bg-[#FBB03B]/10 px-6 py-3 rounded-full">
              <Calendar className="h-5 w-5 text-[#FBB03B] mr-2" />
              <p className="text-raade-navy font-lora font-medium">April 11-12, 2025</p>
            </div>
            <div className="flex items-center bg-[#FBB03B]/10 px-6 py-3 rounded-full">
              <MapPin className="h-5 w-5 text-[#FBB03B] mr-2" />
              <p className="text-raade-navy font-lora font-medium">Rice University, Houston, TX</p>
            </div>
            <div className="flex items-center bg-[#FBB03B]/10 px-6 py-3 rounded-full">
              <Users className="h-5 w-5 text-[#FBB03B] mr-2" />
              <p className="text-raade-navy font-lora font-medium">200+ Attendees</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ConferenceOverview;