
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const StudioCTA = () => {
  return (
    <section className="py-24 bg-raade-navy" id="apply">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
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
            className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
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
              <Button
                size="lg"
                className="mt-4 bg-raade-yellow-orange hover:bg-raade-yellow-orange/80 text-white font-lora"
                asChild
              >
                <Link to="/apply/student">
                  Apply Now
                </Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Partner with Us */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
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
              <Button
                size="lg"
                className="mt-4 bg-transparent border-2 border-raade-yellow-orange hover:bg-raade-yellow-orange/20 text-white font-lora"
                asChild
              >
                <Link to="/apply/partner">
                  Partner With Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudioCTA;
