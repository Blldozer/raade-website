
import React, { useRef, memo, useCallback } from 'react';
import AnimatedText from '../AnimatedText';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const HeroContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use useCallback to memoize event handlers
  const handleJoinClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    // Always use the consistent 'join' ID
    const joinSection = document.getElementById('join');
    if (joinSection) {
      // Use native scrollIntoView for better performance
      joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn("HeroContent: Could not find 'join' section element");
    }
  }, []);
  
  return (
    <div 
      className="relative z-30 pt-[var(--navbar-height)]" 
      ref={contentRef}
    >
      <div className="fluid-container h-screen flex flex-col justify-center">
        <div className="space-y-[clamp(1rem,2vw,2rem)] max-w-[min(90%,1200px)] mx-auto pointer-events-auto">
          <AnimatedText />

          <p className="text-[length:var(--fluid-body)] text-white/90 max-w-[min(100%,800px)] font-merriweather content-fade-in">
            The future of Africa isn't a distant dream - it's being built today, by innovators and changemakers
            like you. Join a community of students and partners creating sustainable solutions through market-driven innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-[clamp(0.5rem,1vw,1rem)] content-fade-in" style={{animationDelay: '100ms'}}>
            <a 
              href="/#join"
              onClick={handleJoinClick}
              className="w-full sm:w-auto px-[clamp(1.5rem,2vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] bg-raade-gold-start text-[#1A365D] rounded-lg font-semibold 
                transition-transform duration-300 text-[length:var(--fluid-body)] font-alegreyasans relative overflow-hidden hover:shadow-[0_0_20px_rgba(251,176,59,0.5)]"
              aria-label="Start Building Today"
            >
              <span className="relative z-10">Start Building Today</span>
              {/* Replace hover gradient with simpler effect for better performance */}
              <div 
                className="absolute inset-0 bg-raade-gold-middle opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            </a>
            <Link 
              to="/studios" 
              className="w-full sm:w-auto px-[clamp(1.5rem,2vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] border-2 border-raade-gold-start text-raade-gold-start rounded-lg 
                font-semibold transition-colors duration-300 text-[length:var(--fluid-body)] font-alegreyasans hover:bg-raade-gold-start hover:text-white"
              aria-label="Explore Our Impact"
            >
              <span className="relative z-10">Explore Our Impact</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(HeroContent);
