
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import CountdownTimer from '../CountdownTimer';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const ConferencePromo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(
      section.querySelector('.promo-content'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-raade-navy overflow-hidden"
    >
      {/* Background pattern/decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] rounded-full bg-raade-gold-start blur-[100px]"></div>
          <div className="absolute bottom-[-15%] right-[-5%] w-[35%] h-[50%] rounded-full bg-raade-gold-end blur-[100px]"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="promo-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Conference Info */}
          <div className="text-white space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-raade-gold-start font-medium tracking-wider uppercase text-sm mb-3">
                Mark Your Calendar
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-simula leading-tight">
                RAADE Annual Conference 2025
              </h2>
              <p className="mt-4 text-xl text-white/80 font-lora">
                Join us for a transformative gathering focused on innovative solutions 
                for African development challenges.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-raade-gold-start mr-2" />
                <span className="font-lora text-white/90">April 11-12, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-raade-gold-start mr-2" />
                <span className="font-lora text-white/90">Rice University, Houston</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link 
                to="/conference" 
                className="inline-flex items-center mt-6 px-6 py-3 bg-raade-gold-start text-raade-navy rounded-lg font-bold text-lg hover:bg-raade-gold-end transition-all duration-300 group"
              >
                Learn More
                <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
          
          {/* Right side: Countdown */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white font-simula">Time Remaining</h3>
              <p className="text-white/70 font-lora mt-2">Don't miss this opportunity to connect and collaborate</p>
            </div>
            
            <div className="flex justify-center mb-8">
              <CountdownTimer 
                targetDate="2025-04-11T09:00:00" 
                variant="floating"
                colorScheme={{
                  text: "text-white",
                  accent: "text-raade-gold-start",
                  dropdownBg: "bg-raade-navy"
                }}
              />
            </div>
            
            <div className="text-center">
              <Link 
                to="/conference/register" 
                className="inline-block px-8 py-4 bg-raade-gold-start text-raade-navy rounded-lg font-bold text-lg hover:bg-raade-gold-end transition-all duration-300 w-full sm:w-auto"
              >
                Register Now
              </Link>
              <p className="mt-3 text-sm text-white/60 font-lora">
                Early bird registration now open
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConferencePromo;
