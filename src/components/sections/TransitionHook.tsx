
import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const TransitionHook = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('join');
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

  return (
    <section 
      id="transition-hook"
      ref={sectionRef} 
      className="min-h-screen flex flex-col justify-between section-padding bg-[#3C403A]"
    >
      <div ref={contentRef} className="flex-grow flex items-center">
        <div className="fluid-container text-center">
          <h2 className="fluid-h2 font-bold text-white font-alegreyasans max-w-4xl mx-auto">
            Every day we wait
            <br className="hidden sm:block" />
            is another <span className="text-raade-gold-start">opportunity lost</span>.
          </h2>
        </div>
      </div>
      
      <div className="text-center pb-[clamp(2rem,4vw,3rem)]">
        <p className="fluid-body text-white/80 font-merriweather mb-[clamp(1rem,2vw,1.5rem)] max-w-lg mx-auto">
          Here's how you can get involved
        </p>
        <button
          onClick={scrollToNextSection}
          className="cursor-pointer p-4 group"
          aria-label="Scroll to next section"
        >
          <div className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] mx-auto border-b-2 border-r-2 border-white/30 rotate-45 transition-all duration-300 group-hover:border-white group-hover:scale-110" />
        </button>
      </div>
    </section>
  );
};

export default TransitionHook;
