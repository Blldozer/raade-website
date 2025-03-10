
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Globe, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ConferenceFinalCta = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-raade-navy to-raade-navy/90 z-0">
        <div className="absolute inset-0 bg-[url('/public/raade-eboard-baker-institute-cmp.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[length:30px_30px] opacity-10" 
             style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)" }}></div>
      </div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column - Main content */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-simula leading-tight">
                Be Part of Africa's <span className="text-[#FBB03B]">Innovation Journey</span>
              </h2>
              
              <div className="mb-8 space-y-4 font-lora">
                <p className="text-xl text-white/90">
                  Join us at the RAADE African Development Forum 2025 to connect, collaborate, and create sustainable solutions for Africa's development challenges.
                </p>
                
                <div className="bg-white/10 p-4 rounded-lg border-l-4 border-[#FBB03B] mt-4">
                  <p className="font-bold text-[#FBB03B]">Limited seats available!</p>
                  <p className="text-white/80">Early bird registration closes in 3 weeks.</p>
                </div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  size="lg" 
                  className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora px-8 py-6 text-lg group relative overflow-hidden"
                  onClick={() => navigate("/conference/register")}
                >
                  <span className="relative z-10 flex items-center">
                    Register Now
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FBB03B] to-[#FF8A6A] group-hover:scale-110 transition-transform duration-500 ease-out z-0"></span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right column - Benefits and details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-2xl font-simula text-white mb-4">What to Expect:</h3>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start text-white/90">
                <div className="bg-[#FBB03B]/20 p-2 rounded-full mr-3 mt-1">
                  <Users className="h-5 w-5 text-[#FBB03B]" />
                </div>
                <div>
                  <span className="font-bold block text-white">Network with Leaders</span>
                  <span className="text-white/80 font-lora">Connect with innovators, investors, and change-makers</span>
                </div>
              </li>
              
              <li className="flex items-start text-white/90">
                <div className="bg-[#FBB03B]/20 p-2 rounded-full mr-3 mt-1">
                  <Globe className="h-5 w-5 text-[#FBB03B]" />
                </div>
                <div>
                  <span className="font-bold block text-white">Global Insights</span>
                  <span className="text-white/80 font-lora">Gain perspectives from experts across continents</span>
                </div>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 text-white/90 pt-4 border-t border-white/20">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#FBB03B]" />
                <p className="font-lora">April 11-12, 2025</p>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#FBB03B]" />
                <p className="font-lora">Rice University, Houston, TX</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Social proof */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center text-white/80"
        >
          <p className="font-lora italic">
            "Join over <span className="text-white font-semibold">200+ attendees</span> from <span className="text-white font-semibold">25+ countries</span> committed to innovation in African development."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConferenceFinalCta;
