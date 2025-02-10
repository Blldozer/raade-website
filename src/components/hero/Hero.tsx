
import React, { useEffect, useRef } from 'react';
import Navigation from '../Navigation';
import AnimatedText from './AnimatedText';
import ParticleField from './ParticleField';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('transition-stat');
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

  useEffect(() => {
    const video = videoRef.current;
    const content = contentRef.current;
    
    if (!video || !content) return;

    const tl = gsap.timeline();
    
    // Initial fade in
    tl.fromTo(content,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Parallax effect for video
    gsap.to(video, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: video,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#1A365D]/60 via-[#2A466D]/65 to-[#1A365D]/70 backdrop-blur-[4px]" />
      
      {/* Particle effect */}
      <div className="relative z-20">
        <ParticleField />
      </div>
      
      {/* Navigation */}
      <div className="relative z-50">
        <Navigation />
      </div>
      
      {/* Main content */}
      <div className="relative z-30" ref={contentRef}>
        <div className="max-w-7xl mx-auto px-4 h-screen flex flex-col justify-center">
          <div className="space-y-4 md:space-y-8 max-w-3xl pointer-events-auto">
            {/* Animated text component */}
            <AnimatedText />

            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl font-merriweather">
              The future of Africa isn't a distant dream - it's being built today, by innovators and changemakers
              like you. Join a community of students and partners creating sustainable solutions through market-driven innovation.
            </p>

            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => window.location.href = "#studios"}
                className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-raade-gold-start text-[#1A365D] rounded-lg font-semibold 
                  transition-all duration-300 text-lg font-alegreyasans relative overflow-hidden hover:shadow-[0_0_20px_rgba(251,176,59,0.5)]"
              >
                <span className="relative z-10">Start Building Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-raade-gold-start via-raade-gold-middle to-raade-gold-end opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button 
                onClick={() => window.location.href = "#conference"}
                className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border-2 border-raade-gold-start text-raade-gold-start rounded-lg 
                  font-semibold transition-all duration-300 text-lg font-alegreyasans hover:bg-raade-gold-start hover:text-white relative overflow-hidden"
              >
                <span className="relative z-10">Explore Our Impact</span>
              </button>
            </div>
          </div>
        </div>

        {/* Down arrow navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50"
        >
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
            <div className="w-6 h-6 mx-auto border-b-2 border-r-2 border-white/30 rotate-45 transition-all duration-300 group-hover:border-white group-hover:scale-110" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
