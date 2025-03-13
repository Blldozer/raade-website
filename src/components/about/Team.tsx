
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import TeamMembersList from "./TeamMembersList";
import { teamMembers } from "./TeamData";

const Team = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [hasRendered, setHasRendered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("Team component mounted");
    setHasRendered(true);
    
    // Mark the component as loaded after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log("Team component fully loaded");
    }, 100);
    
    return () => {
      console.log("Team component unmounted");
      clearTimeout(timer);
    };
  }, []);

  if (!hasRendered) {
    return <div id="team" className="py-24 bg-white">Loading team information...</div>;
  }

  return (
    <section id="team" className="py-24 bg-white" ref={sectionRef}>
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
            <p className="text-xl font-lora text-gray-700 leading-relaxed">
              Meet the visionaries who refused to wait for change. Driven by deep conviction and extraordinary determination, our team transforms challenges into opportunities through sheer force of will. We're not just talking about African development - we're dedicating our minds, hearts, and hands to making it happen, one breakthrough solution at a time.
            </p>
          </motion.div>
        </div>

        <TeamMembersList 
          teamMembers={teamMembers} 
          isInView={isInView}
          isLoaded={isLoaded}
        />
      </div>
    </section>
  );
};

export default Team;
