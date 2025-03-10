import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import gsap from 'gsap';
const TransitionStat = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('future-showcase');
    if (nextSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: nextSection,
          offsetY: 0
        },
        ease: "power2.inOut"
      });
    }
  };
  return <section className="min-h-screen flex flex-col justify-between py-20 bg-cream relative bg-white">
      <div className="flex-grow flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: "-20%"
        }} transition={{
          duration: 0.8
        }} className="space-y-8">
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1A365D] mb-6 font-Montserrat rounded-3xl">
              By 2050, <span className="text-raade-gold-start"><CountUp end={25} duration={2.5} /></span>% of people
              <br />will be African.
            </div>
            <p className="text-xl md:text-2xl text-[#1A365D]/80 max-w-3xl mx-auto font-merriweather">
              The systems we build today will shape their tomorrow.
            </p>
          </motion.div>
        </div>
      </div>
      
      <motion.div initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.8,
      delay: 0.5
    }} className="text-center pb-12">
        <p className="text-lg text-[#1A365D]/60 font-merriweather mb-6">
          Here's what we are building...
        </p>
        <motion.button animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} onClick={scrollToNextSection} className="cursor-pointer p-4 group" aria-label="Scroll to next section">
          <div className="w-6 h-6 mx-auto border-b-2 border-r-2 border-[#1A365D]/30 rotate-45 transition-all duration-300 group-hover:border-[#1A365D] group-hover:scale-110" />
        </motion.button>
      </motion.div>
    </section>;
};
export default TransitionStat;