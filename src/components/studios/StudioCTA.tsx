
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const StudioCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="apply">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 bg-[#2b212e]">
        <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[#2b212e] via-[#3b2c40] to-[#2b212e] bg-[length:200%_100%]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9b87f5]/30 via-transparent to-transparent" />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-simula text-white mb-6">Ready to Build with Us?</h2>
          <p className="text-xl font-lora text-white/80 max-w-3xl mx-auto">
            Whether you're a student looking to create impact or an organization with a challenge that needs solving, 
            we'd love to collaborate with you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Join as a Student */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-raade-yellow-orange/20 mb-2">
                <Users className="h-8 w-8 text-raade-yellow-orange" />
              </div>
              <h3 className="text-2xl font-simula text-white">Join as a Student</h3>
              <p className="text-white/80 font-lora">
                Students from any university can join our Innovation Studios to work on 
                real-world challenges and develop market-based solutions.
              </p>
              <Link 
                to="/apply/student" 
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-8 py-2 text-sm font-medium bg-raade-yellow-orange hover:bg-raade-yellow-orange/90 text-[#2b212e] font-lora transition-all duration-300 hover:shadow-[0_0_15px_rgba(251,176,59,0.4)]"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
          
          {/* Partner with Us */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-raade-yellow-orange/20 mb-2">
                <Handshake className="h-8 w-8 text-raade-yellow-orange" />
              </div>
              <h3 className="text-2xl font-simula text-white">Submit a Challenge</h3>
              <p className="text-white/80 font-lora">
                Have a development challenge that needs innovative solutions? Partner with us and 
                work with our talented student teams.
              </p>
              <Link 
                to="/apply/partner" 
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-8 py-2 text-sm font-medium bg-transparent border-2 border-raade-yellow-orange hover:bg-raade-yellow-orange/20 text-white font-lora transition-all duration-300 hover:shadow-[0_0_15px_rgba(251,176,59,0.3)]"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudioCTA;
