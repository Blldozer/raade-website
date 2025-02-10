
import React from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import CountUp from 'react-countup';

// Register ScrollTrigger and ScrollToPlugin plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface TransitionHookProps {
  isScrollingRef: React.MutableRefObject<boolean>;
}

const TransitionHook = ({ isScrollingRef }: TransitionHookProps) => {
  const scrollToNextSection = () => {
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    const nextSection = document.getElementById('join');
    if (nextSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: nextSection,
          offsetY: 0
        },
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 100);
        }
      });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-between py-20 bg-cream">
      <div className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A365D] font-alegreyasans">
              Every day we wait
              <br />
              is another <span className="text-raade-gold-start">
                <CountUp
                  end={25}
                  duration={2.5}
                  suffix="%"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </span> opportunity lost.
            </h2>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center pb-12"
      >
        <p className="text-lg text-[#1A365D]/60 font-merriweather mb-6">
          Here's how you can get involved
        </p>
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={scrollToNextSection}
          className="cursor-pointer p-4 group"
          aria-label="Scroll to next section"
        >
          <div className="w-6 h-6 mx-auto border-b-2 border-r-2 border-[#1A365D]/30 rotate-45 transition-all duration-300 group-hover:border-[#1A365D] group-hover:scale-110" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default TransitionHook;
