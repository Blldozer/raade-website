import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, ChevronDown, Sparkles, Globe, Users } from "lucide-react";
const ConferenceHero = () => {
  const navigate = useNavigate();
  return <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FBB03B] via-[#FF9848] to-[#FF8A6A] z-0">
        {/* Africa outline pattern */}
        <div className="absolute right-0 bottom-0 lg:right-20 lg:bottom-20 opacity-10 w-[600px] h-[600px]">
          <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M355.5,6.9c-0.9,0.4-1.8,1.6-1.9,2.5c-0.1,0.9-0.9,2.3-1.7,3c-1.1,0.9-1.3,1.5-0.6,2.1c0.7,0.7,0.7,1.3,0,2.2
              c-1,1.3-0.4,4.3,1,5.2c0.4,0.3,0.4,1.1-0.1,2c-0.5,0.8-0.5,2.6-0.1,4.4c0.4,1.6,0.6,4.5,0.5,6.3..." fill="white" />
          </svg>
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0 z-10">
          <motion.div className="absolute top-[20%] left-[15%]" animate={{
          y: [0, 15, 0]
        }} transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}>
            <Sparkles className="w-12 h-12 text-white/20" />
          </motion.div>
          <motion.div className="absolute top-[30%] right-[20%]" animate={{
          y: [0, -15, 0]
        }} transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}>
            <Globe className="w-16 h-16 text-white/20" />
          </motion.div>
          <motion.div className="absolute bottom-[25%] left-[25%]" animate={{
          y: [0, 10, 0]
        }} transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}>
            <Users className="w-14 h-14 text-white/20" />
          </motion.div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto relative z-20 pt-20 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:pr-12 py-10 z-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="space-y-6">
            <p className="text-xl font-medium text-white font-lora">Join us at the RAADE African Development Forum</p>
            
            <div className="space-y-2">
              <motion.h2 initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="text-5xl lg:text-6xl font-bold font-simula text-white">
                AFRICA 
              </motion.h2>
              <motion.h2 initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} className="text-5xl lg:text-6xl font-bold font-simula text-white">
                INNOVATION
              </motion.h2>
              <motion.div initial={{
              opacity: 0,
              width: 0
            }} animate={{
              opacity: 1,
              width: "60%"
            }} transition={{
              duration: 0.8,
              delay: 0.6
            }} className="h-1 bg-[#FBB03B] mt-2 mb-5" />
              <p className="text-2xl font-simula text-white mt-2">
                Building Pathways to the Future
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center">
                <Calendar className="mr-3 h-6 w-6 text-[#FBB03B]" />
                <p className="text-white font-lora font-medium text-lg">April 11-12, 2025</p>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 h-6 w-6 text-[#FBB03B]" />
                <p className="text-white font-lora font-medium text-lg">Rice University, Houston, TX</p>
              </div>
            </div>

            <p className="text-lg text-white/90 max-w-lg font-lora">
              The RAADE Forum brings together innovative minds to discuss sustainable 
              solutions for Africa's development. With a spotlight on student-led innovation,
              this forum is the foremost platform for changemakers passionate about 
              advancing Africa's future.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => navigate("/conference/register")} className="px-8 py-3 bg-[#FBB03B] text-white rounded-md font-medium transition-all hover:bg-[#FBB03B]/90 font-lora shadow-md">
                Register Now
              </motion.button>
              
              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => {
              const scheduleSection = document.getElementById('schedule');
              scheduleSection?.scrollIntoView({
                behavior: 'smooth'
              });
            }} className="px-8 py-3 border-2 border-white text-white rounded-md font-medium transition-all hover:bg-white/10 font-lora">
                View Schedule
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center z-10 py-12">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="w-full max-w-xl">
            <div className="relative">
              <motion.div className="relative z-20 text-center" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.8,
              delay: 0.5
            }}>
                <div className="relative mb-8">
                  <motion.div className="absolute -inset-6 rounded-lg bg-white/10 backdrop-blur-sm" initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  duration: 0.4,
                  delay: 0.6
                }} />
                  <h2 className="relative text-7xl md:text-8xl font-bold font-simula text-white leading-tight tracking-tighter">
                    <span className="drop-shadow-lg">BUILDING</span> 
                    <br />
                    <span className="text-[#FBB03B] drop-shadow-lg">TOMORROW</span>
                  </h2>
                </div>
                
                <motion.div initial={{
                width: 0
              }} animate={{
                width: "100%"
              }} transition={{
                duration: 1,
                delay: 0.8
              }} className="h-0.5 bg-white/30 my-4 mx-auto" />
                
                <div className="mt-12 space-y-4">
                  <h3 className="text-xl font-semibold text-white font-simula">Join Industry Leaders & Innovators</h3>
                  
                  {/* Forum highlights buttons */}
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    <motion.div className="group px-5 py-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all" whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }}>
                      <p className="text-white font-lora font-medium">25+ Speakers</p>
                    </motion.div>
                    <motion.div className="group px-5 py-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all" whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }}>
                      <p className="text-white font-lora font-medium">15 Workshops</p>
                    </motion.div>
                    <motion.div className="group px-5 py-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all" whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }}>
                      <p className="text-white font-lora font-medium">200+ Attendees</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.5,
      duration: 0.8
    }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="flex flex-col items-center">
          <p className="text-white/80 text-sm mb-2 font-lora">Scroll to explore</p>
          <ChevronDown className="text-white/80 h-6 w-6" />
        </motion.div>
      </motion.div>
    </div>;
};
export default ConferenceHero;