
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import TeamMembersList from "./TeamMembersList";
import { teamMembers } from "./TeamData";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import TeamImageSkeleton from "./team/TeamImageSkeleton";

/**
 * Team component - Displays the team section with proper state management
 * Features progressive loading and error handling for reliable rendering
 * Uses intersection observer to trigger animations only when visible
 * Has light background which requires a dark navbar (navy text)
 */
const Team = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isMobile = useIsMobile();

  // Initialize component with improved state management - reduced delay to 50ms
  useEffect(() => {
    console.log("Team component mounted");
    
    // Reduced timeout to allow browser to settle after initial render
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log("Team component marked as loaded");
    }, 50); // Reduced from 200ms to 50ms for faster loading
    
    // Proper cleanup to prevent memory leaks and state updates after unmount
    return () => {
      console.log("Team component unmounting");
      clearTimeout(timer);
    };
  }, []);

  // Error boundary fallback for graceful degradation
  if (hasError) {
    return (
      <section id="team" className="about-content-section py-24 bg-white" data-background="light">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-simula mb-6">Meet the team</h2>
          <p className="text-xl font-lora text-black">
            We're having trouble loading our team information. 
            Please try refreshing the page.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="about-content-section py-24 bg-white" data-background="light" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="w-full lg:w-[39%]"
          >
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula">
              Meet the <span className="font-['Simula_Book_Italic']">team</span>
            </h2>
          </motion.div>
          <div className="lg:w-[61%]"></div>
        </div>

        <div className="flex flex-col lg:flex-row mb-16">
          <div className="lg:w-[39%]"></div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="w-full lg:w-[61%] mt-8 lg:mt-0"
          >
            <p className="text-xl font-lora text-black leading-relaxed">
              Meet the visionaries who refused to wait for change. Driven by deep conviction and extraordinary determination, our team transforms challenges into opportunities through sheer force of will. We're not just talking about African development - we're dedicating our minds, hearts, and hands to making it happen, one breakthrough solution at a time.
            </p>
          </motion.div>
        </div>

        {/* Show smaller number of skeletons while team data is initializing */}
        {!isLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Reduced number of placeholder skeletons for faster perceived loading */}
            {[...Array(isMobile ? 3 : 6)].map((_, index) => (
              <TeamImageSkeleton key={index} />
            ))}
          </div>
        ) : (
          <TeamMembersList 
            teamMembers={teamMembers} 
            isInView={isInView}
            isLoaded={isLoaded}
          />
        )}
      </div>
    </section>
  );
};

export default Team;
