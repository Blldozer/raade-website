
import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Rocket, Lightbulb, Globe, Star, Flame, Target } from "lucide-react";

const ConferenceOverview = () => {
  return <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Title Section with 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="w-full lg:w-[39%]">
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
              Africa's path to the <span className="font-['Simula_Book_Italic']">future</span>
            </h2>
          </motion.div>
          
          {/* Creative element in the filler div - enhanced with curved path */}
          <motion.div className="lg:w-[61%] hidden lg:flex items-center justify-center" initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <div className="relative h-40 w-full max-w-lg">
              {/* SVG path for curved journey */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                {/* Animated gradient path with moving dash offset */}
                <motion.path 
                  d="M10,50 C60,20 90,80 150,40 C210,0 240,70 330,50"
                  fill="none"
                  strokeWidth="2"
                  stroke="url(#gradientPath)"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, strokeDashoffset: 100 }}
                  whileInView={{ 
                    pathLength: 1,
                    transition: { duration: 2, ease: "easeOut" }
                  }}
                  animate={{ 
                    strokeDashoffset: [100, -100], 
                    transition: { 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: "linear"
                    } 
                  }}
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FBB03B" />
                    <stop offset="100%" stopColor="#FF8A6A" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Animated dots along the path at key waypoints */}
              {[
                { x: 10, y: 50, delay: 0.4 },
                { x: 60, y: 20, delay: 0.8 },
                { x: 150, y: 40, delay: 1.2 },
                { x: 240, y: 70, delay: 1.6 },
                { x: 330, y: 50, delay: 2.0 }
              ].map((pos, index) => (
                <motion.div 
                  key={index} 
                  className="absolute w-3 h-3 rounded-full bg-[#FBB03B]" 
                  style={{ left: pos.x, top: pos.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: [0, 1.5, 1], opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: pos.delay, ease: "easeOut" }}
                  animate={{
                    y: [pos.y - 3, pos.y + 3, pos.y - 3],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
              ))}
              
              {/* Alternative icons instead of Sparkles */}
              {[
                { icon: Flame, x: "15%", y: "15%", delay: 0.7, size: 16 },
                { icon: Lightbulb, x: "45%", y: "60%", delay: 1.1, size: 20 },
                { icon: Star, x: "65%", y: "25%", delay: 1.5, size: 18 },
                { icon: Target, x: "85%", y: "45%", delay: 1.9, size: 14 },
                { icon: Rocket, x: "30%", y: "75%", delay: 2.2, size: 12 }
              ].map((iconInfo, index) => {
                const IconComponent = iconInfo.icon;
                return (
                  <motion.div 
                    key={`icon-${index}`} 
                    className="absolute" 
                    style={{ left: iconInfo.x, top: iconInfo.y }}
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: iconInfo.delay, duration: 0.5 }}
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 0.9, 1],
                      transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.75, 1]
                      }
                    }}
                  >
                    <IconComponent className="text-[#FBB03B]" size={iconInfo.size} strokeWidth={1.5} />
                  </motion.div>
                );
              })}
              
              {/* Path obstruction elements */}
              {[
                { x: "38%", y: "40%", delay: 1.3, rotate: 45 },
                { x: "75%", y: "65%", delay: 1.7, rotate: -30 }
              ].map((obstacle, index) => (
                <motion.div 
                  key={`obstacle-${index}`} 
                  className="absolute w-6 h-1 bg-[#FBB03B]/30 rounded-full" 
                  style={{ 
                    left: obstacle.x, 
                    top: obstacle.y,
                    transform: `rotate(${obstacle.rotate}deg)`
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: obstacle.delay, duration: 0.5 }}
                  animate={{
                    width: ["1.5rem", "1rem", "1.5rem"],
                    opacity: [0.3, 0.5, 0.3],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Content Section with reversed 39/61 split */}
        <div className="flex flex-col lg:flex-row mb-16">
          <div className="lg:w-[39%]"></div> {/* Spacer div */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="w-full lg:w-[61%] mt-8 lg:mt-0">
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
                <h3 className="text-xl font-simula text-center text-white font-extrabold">Innovation Showcase</h3>
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
                <h3 className="text-xl font-simula text-center text-white font-extrabold">Global Networking</h3>
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
                <h3 className="text-xl font-simula text-center text-white font-extrabold">Thought Leadership</h3>
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
    </section>;
};

export default ConferenceOverview;
