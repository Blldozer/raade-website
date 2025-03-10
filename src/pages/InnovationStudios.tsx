
import InnovationStudiosSection from "@/components/InnovationStudios";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import StudioOverview from "@/components/studios/StudioOverview";
import StudioCTA from "@/components/studios/StudioCTA";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const InnovationStudios = () => {
  const location = useLocation();
  const overviewRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string>("hero");

  // Track scroll position to determine current section for proper nav contrast
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Set dark mode for hero section (which has dark background)
      if (scrollPosition < viewportHeight * 0.7) {
        setCurrentSection("hero");
        document.body.setAttribute('data-nav-background', 'dark');
      } 
      // Check if we're in overview section
      else if (overviewRef.current && 
          scrollPosition >= overviewRef.current.offsetTop - 100 && 
          scrollPosition < projectsRef.current?.offsetTop! - 100) {
        setCurrentSection("overview");
        document.body.setAttribute('data-nav-background', 'light');
      }
      // Check if we're in projects section
      else if (projectsRef.current && 
          scrollPosition >= projectsRef.current.offsetTop - 100 && 
          scrollPosition < applyRef.current?.offsetTop! - 100) {
        setCurrentSection("projects");
        document.body.setAttribute('data-nav-background', 'light');
      }
      // Check if we're in apply section
      else if (applyRef.current && 
          scrollPosition >= applyRef.current.offsetTop - 100) {
        setCurrentSection("apply");
        document.body.setAttribute('data-nav-background', 'light');
      }
    };

    // Initial call to set the correct section
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Handle scrolling to sections based on hash
    if (location.hash) {
      setTimeout(() => {
        const hash = location.hash.replace('#', '');
        if (hash === 'overview' && overviewRef.current) {
          overviewRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        } else if (hash === 'projects' && projectsRef.current) {
          projectsRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        } else if (hash === 'apply' && applyRef.current) {
          applyRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    }
    
    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const Hero = () => {
    return <div className="min-h-screen relative overflow-hidden flex items-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0 bg-[#2b212e]">
          <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[#2b212e] via-[#3b2c40] to-[#2b212e] bg-[length:200%_100%]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9b87f5]/30 via-transparent to-transparent" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="space-y-6">
              {["Design.", "Build.", "Scale."].map((word, index) => <motion.div key={word} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.2 + 0.3,
              duration: 0.5
            }}>
                  <h1 className="text-7xl md:text-9xl font-simula text-white">
                    {word}
                  </h1>
                </motion.div>)}
            </motion.div>
            
            <motion.p initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 1.2,
            duration: 0.5
          }} className="mt-12 text-xl md:text-2xl text-white/90 font-lora max-w-2xl"> A project-driven innovation studio creating market-based solutions for Africa's most pressing challenges.</motion.p>
          </div>
        </div>
      </div>;
  };

  return <div>
      <Navigation isHeroPage={true} forceDarkMode={currentSection !== "hero"} />
      <div>
        <Hero />
        <div ref={overviewRef} id="overview">
          <StudioOverview />
        </div>
        <div ref={projectsRef} id="projects">
          <ProjectsShowcase />
        </div>
        <div ref={applyRef} id="apply">
          <StudioCTA />
        </div>
      </div>
    </div>;
};

export default InnovationStudios;
