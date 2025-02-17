
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Text */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-[39%] flex flex-col justify-center bg-[#3C403A] relative"
      >
        <div className="px-8 lg:px-12 py-16 lg:py-24 max-w-[600px] mx-auto">
          <h1 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-[#FFFDD0] mb-8">
            Who we are
          </h1>
          
          <p className="text-[clamp(1rem,1.2vw,1.25rem)] leading-relaxed text-white font-lora">
            RAADE pioneers innovative approaches to African development by connecting
            students with African organizations to create scalable solutions for
            pressing challenges.
          </p>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-[61%] h-screen relative"
      >
        <img
          src="raade-innov-team-core-2.jpg"
          alt="RAADE Innovation Studio Team at Rice Business School"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>
    </div>
  );
};

export default AboutHero;
