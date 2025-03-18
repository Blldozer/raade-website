
import InnovationStudiosSection from "@/components/InnovationStudios";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import StudioOverview from "@/components/studios/StudioOverview";
import StudioCTA from "@/components/studios/StudioCTA";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollDownButton from "@/components/hero/components/ScrollDownButton";
import { useNavBackground } from "@/hooks/useNavBackground";

/**
 * InnovationStudios Component - Main page for the Innovation Studios program
 * 
 * Features:
 * - Animated hero with gradient background
 * - Section-based navigation
 * - Proper navbar background contrast based on scroll position
 * - Smooth section transitions
 */
const InnovationStudios = () => {
  const location = useLocation();
  const overviewRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string>("hero");

  // Initialize with 'light' for proper contrast over the dark purple hero background
  // This ensures the light version of the navbar is shown initially
  useLayoutEffect(() => {
    document.body.setAttribute('data-nav-background', 'light');
    
    return () => {
      document.body.removeAttribute('data-nav-background');
    };
  }, []);
  
  // Use the hook to manage scroll-based background changes
  useNavBackground('light');

  // Track scroll position to determine current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Set section based on scroll position
      if (scrollPosition < viewportHeight * 0.7) {
        setCurrentSection("hero");
      } 
      // Check if we're in overview section
      else if (overviewRef.current && 
          scrollPosition >= overviewRef.current.offsetTop - 100 && 
          scrollPosition < projectsRef.current?.offsetTop! - 100) {
        setCurrentSection("overview");
      }
      // Check if we're in projects section
      else if (projectsRef.current && 
          scrollPosition >= projectsRef.current.offsetTop - 100 && 
          scrollPosition < applyRef.current?.offsetTop! - 100) {
        setCurrentSection("projects");
      }
      // Check if we're in apply section
      else if (applyRef.current && 
          scrollPosition >= applyRef.current.offsetTop - 100) {
        setCurrentSection("apply");
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
      }, 300);
    }
    
    // Also handle navigation via state (when coming from another page)
    else if (location.state && location.state.scrollToSection) {
      setTimeout(() => {
        const sectionId = location.state.scrollToSection;
        if (sectionId === 'overview' && overviewRef.current) {
          overviewRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        } else if (sectionId === 'projects' && projectsRef.current) {
          projectsRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        } else if (sectionId === 'apply' && applyRef.current) {
          applyRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 300);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const scrollToContent = () => {
    if (overviewRef.current) {
      overviewRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const Hero = () => {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center innovation-studios-hero" data-background="dark">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0 bg-[#2b212e]">
          <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[#2b212e] via-[#3b2c40] to-[#2b212e] bg-[length:200%_100%]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9b87f5]/30 via-transparent to-transparent" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20 flex flex-col justify-between h-[calc(100vh-120px)]">
          <div className="max-w-4xl pl-8 sm:pl-12 pt-32 sm:pt-36">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="space-y-14 md:space-y-20">
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
          </div>
          
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1.2,
          duration: 0.5
        }} className="mt-auto mb-24 text-xl md:text-2xl text-white/90 font-lora max-w-2xl pl-8 sm:pl-12"> A project-driven innovation studio creating market-based solutions for Africa's most pressing challenges.</motion.p>
        </div>

        {/* Add scroll down indicator */}
        <ScrollDownButton onClick={scrollToContent} />
      </div>
    );
  };

  return (
    <div>
      {/* Single Navigation component at the top level */}
      <Navigation isHeroPage={true} forceDarkMode={false} />
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
    </div>
  );
};

export default InnovationStudios;
