
import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { teamMembers } from "./about/TeamData";
import { useInView } from "framer-motion";

/**
 * TeamProfiles Component - Displays the team members grid with optimized image loading
 * 
 * Features:
 * - Progressive image loading with priority for visible items
 * - Intersection-based loading for better performance
 * - Staggered animations for visual appeal
 * - Responsive grid layout for all device sizes
 */
const TeamProfiles = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [loadedCount, setLoadedCount] = useState(0);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Track loading progress for better user feedback
  const handleImageLoad = () => {
    setLoadedCount(prev => {
      const newCount = prev + 1;
      console.log(`Image loaded: ${newCount}/${teamMembers.length}`);
      return newCount;
    });
  };

  // Set initial load complete after all visible images are loaded or timeout
  useEffect(() => {
    if (isInView) {
      // Set a reasonable timeout for initial load state
      const timer = setTimeout(() => {
        if (!isInitialLoadComplete) {
          console.log('Setting initial load complete after timeout');
          setIsInitialLoadComplete(true);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isInView, isInitialLoadComplete]);

  // Mark loading complete when all images are loaded
  useEffect(() => {
    if (loadedCount >= Math.min(6, teamMembers.length)) {
      console.log('Initial visible images loaded');
      setIsInitialLoadComplete(true);
    }
  }, [loadedCount]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section ref={sectionRef} className="py-32 bg-white">
      <div className="container px-4 mx-auto max-w-[1400px]">
        <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-center mb-8">
          Our Team
        </h2>
        <p className="text-xl font-lora text-center mb-24 max-w-2xl mx-auto text-gray-700">
          The minds behind RAADE's mission to transform African development
        </p>
        
        {/* Loading indicator shown only during initial load */}
        {isInView && !isInitialLoadComplete && (
          <div className="w-full mb-12 bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#FBB03B] h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(loadedCount / Math.min(6, teamMembers.length)) * 100}%` }}
            />
          </div>
        )}
        
        {/* Team members grid with staggered animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.name}
              variants={item}
              className="flex flex-col"
            >
              <Card className="border-none shadow-none transition-all duration-300 hover:scale-105">
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#3C403A] rounded-lg">
                  {/* Prioritize loading for first visible elements */}
                  <img
                    src={`/raade-individual-e-board-photos/${member.name.split(" ").join("-")}-raade-website-image.jpg`}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading={index < 6 ? "eager" : "lazy"}
                    onLoad={() => handleImageLoad()}
                    onError={(e) => {
                      console.error(`Error loading image for ${member.name}`);
                      // Fallback to initials if image fails
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      
                      // Add initials element if it doesn't exist
                      const initialsEl = document.createElement('span');
                      initialsEl.className = 'text-white text-3xl font-bold';
                      initialsEl.textContent = member.name.split(' ').map(n => n[0]).join('');
                      e.currentTarget.parentElement?.appendChild(initialsEl);
                    }}
                  />
                </div>
                <h3 className="font-simula font-bold text-2xl mb-1">
                  {member.name}
                </h3>
                <p className="font-lora text-gray-600 text-lg">
                  {member.position}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamProfiles;
