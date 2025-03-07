import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
const ConferenceHero = () => {
  const navigate = useNavigate();
  return <div className="relative min-h-screen bg-[#F4F5F4] overflow-hidden">
      {/* Background dots */}
      <div className="absolute inset-0 z-0">
        {[...Array(10)].map((_, index) => <div key={index} className="absolute w-2 h-2 rounded-full bg-gray-300" style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.2
      }} />)}
      </div>

      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-2/5 lg:pr-12 py-12 z-10 bg-raade-Oslo gray bg-raade-Oslo gray bg-raade-Oslo gray bg-[raade-yellow-orange] bg-raade-orange">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="space-y-6">
            <p className="text-lg font-medium text-raade-navy font-lora">
              Join us at the Annual RAADE Conference
            </p>
            
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold font-simula text-raade-navy">
                AFRICA INNOVATION
              </h2>
              <h2 className="text-3xl lg:text-4xl font-bold font-simula text-[#FBB03B]">
                BUILDING & DESIGNING
              </h2>
              <p className="text-xl font-simula text-raade-navy">
                Pathways to Sustainable Development
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-[#FBB03B]" />
                <p className="text-raade-navy font-lora">April 11-12, 2025</p>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-[#FBB03B]" />
                <p className="text-raade-navy font-lora">Rice University, Houston, TX</p>
              </div>
            </div>

            <p className="text-gray-600 max-w-lg font-lora">
              The RAADE Conference brings together innovative minds to discuss sustainable 
              solutions for Africa's development. With a spotlight on student-led innovation,
              this conference is the foremost platform for changemakers passionate about 
              advancing Africa's future.
            </p>

            <button onClick={() => navigate("/conference/register")} className="px-8 py-3 bg-[#FBB03B] text-white rounded-md font-medium transition-colors hover:bg-[#FBB03B]/90 font-lora">
              Get Tickets
            </button>
          </motion.div>
        </div>

        {/* Right Content - Conference Logo & Image */}
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center z-10 py-12">
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="w-full max-w-md">
            <div className="relative">
              <img src="/lovable-uploads/98ae9a06-bde0-482e-8844-28a4bf0ef528.png" alt="RAADE Conference Logo" className="mx-auto w-24 h-24 object-contain mb-6" />
              <div className="text-center">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-raade-navy font-simula mb-4">
                  AFRICA
                </h1>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-simula text-raade-navy">
                  NOW & NEXT
                </h2>
              </div>
            </div>
            
            <div className="mt-16 text-center space-y-4">
              <p className="text-lg font-simula text-raade-navy">Conference Highlights</p>
              <div className="flex justify-center space-x-4">
                <div className="px-4 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-sm font-lora text-raade-navy">Speakers</p>
                </div>
                <div className="px-4 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-sm font-lora text-raade-navy">Sponsors</p>
                </div>
                <div className="px-4 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-sm font-lora text-raade-navy">Schedule</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default ConferenceHero;