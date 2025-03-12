import React, { useRef } from 'react';
import AnimatedText from '../AnimatedText';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const HeroContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
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

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home and then scroll
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToJoin: true } });
    } else {
      // If we're already on home page, just scroll to the section
      const joinSection = document.getElementById('join');
      if (joinSection) {
        joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  return (
    <div className="relative z-30 pt-[var(--navbar-height)]" ref={contentRef}>
      <div className="fluid-container h-screen flex flex-col justify-center">
        <div className="space-y-[clamp(1rem,2vw,2rem)] max-w-[min(90%,1200px)] mx-auto pointer-events-auto">
          <AnimatedText />

          <p className="text-[length:var(--fluid-body)] text-white/90 max-w-[min(100%,800px)] font-merriweather">
            The future of Africa isn't a distant dream - it's being built today, by innovators and changemakers
            like you. Join a community of students and partners creating sustainable solutions through market-driven innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-[clamp(0.5rem,1vw,1rem)]">
            <a 
              href="/#join"
              onClick={handleJoinClick}
              className="group w-full sm:w-auto px-[clamp(1.5rem,2vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] bg-raade-gold-start text-[#1A365D] rounded-lg font-semibold 
                transition-all duration-300 text-[length:var(--fluid-body)] font-alegreyasans relative overflow-hidden hover:shadow-[0_0_20px_rgba(251,176,59,0.5)]"
            >
              <span className="relative z-10">Start Building Today</span>
              <a 
                href="/#join"
                onClick={handleJoinClick}
                className="absolute inset-0 bg-gradient-to-r from-raade-gold-start via-raade-gold-middle to-raade-gold-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
            <Link 
              to="/studios" 
              className="group w-full sm:w-auto px-[clamp(1.5rem,2vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] border-2 border-raade-gold-start text-raade-gold-start rounded-lg 
                font-semibold transition-all duration-300 text-[length:var(--fluid-body)] font-alegreyasans hover:bg-raade-gold-start hover:text-white relative overflow-hidden"
            >
              <span className="relative z-10">Explore Our Impact</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
