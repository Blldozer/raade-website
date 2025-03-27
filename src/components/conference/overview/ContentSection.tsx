import React from "react";
import { motion } from "framer-motion";

const ContentSection = () => {
  return <div className="flex flex-col lg:flex-row mb-16">
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
        <p className="text-xl font-lora text-black leading-relaxed max-w-[800px]">
          At RAADE's African development forum, we will come together to <span className="font-bold italic">translate bold ideas into continent-wide impact</span>. This isn't just another gathering—it's where change-makers like you come together to <span className="font-bold italic">shape tomorrow</span>. Because we know Africa's future won't be built by distant strategies, but by people in rooms like this, turning possibilities into reality.
        </p>
      </motion.div>
    </div>;
};

export default ContentSection;
