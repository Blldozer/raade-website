
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/ProjectData";

const sectors = ["All", "Healthcare", "Technology", "Education", "Energy", "Business"] as const;

/**
 * ProjectsShowcase Component
 * 
 * Displays filterable grid of project cards with:
 * - Filter buttons by sector
 * - Responsive image thumbnails with hover effects
 * - Dynamic badges for project sectors
 * - Challenge information appearing on hover
 * - Partner information on a single line with external link when available
 */
const ProjectsShowcase = () => {
  const [selectedSector, setSelectedSector] = useState<typeof sectors[number]>("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Create a memoized filtered projects array that only updates when selectedSector changes
  const filteredProjects = projects.filter(project => 
    selectedSector === "All" || 
    project.sector === selectedSector || 
    project.sectors?.includes(selectedSector)
  );

  const handleSectorChange = (sector: typeof sectors[number]) => {
    // Only update if it's actually different to prevent unnecessary re-renders
    if (sector !== selectedSector) {
      setSelectedSector(sector);
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Function to get all project sectors for display
  const getProjectSectors = (project: typeof projects[0]) => {
    if (project.sectors) {
      return project.sectors;
    }
    return [project.sector];
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Title Section - 39/61 split */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row mb-16"
        >
          <div className="w-full lg:w-[39%]">
            <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-zinc-950">
              Our Current Projects
            </h2>
          </div>
          <div className="lg:w-[61%]"></div> {/* Filler space */}
        </motion.div>

        {/* Content Section - 39/61 split reversed */}
        <div className="flex flex-col lg:flex-row mb-20">
          <div className="lg:w-[39%]"></div> {/* Filler space */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[61%]"
          >
            <div className="space-y-8 text-xl leading-relaxed font-lora text-gray-700 max-w-[800px]">
              <p>We focus on high-impact sectors where innovative solutions can create transformative change at scale. Each project addresses challenges affecting millions of people across Africa, designed not just to solve immediate problems, but to create ripple effects that transform entire communities and markets. Here are our 2024-2025 challenges.</p>
            </div>
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {sectors.map(sector => (
            <Button 
              key={sector} 
              variant={selectedSector === sector ? "default" : "outline"} 
              onClick={() => handleSectorChange(sector)}
              className={`${selectedSector === sector 
                ? "bg-[#2b212e] text-white hover:bg-[#2b212e]/90 border-none" 
                : "text-[#2b212e] border-[#2b212e]/20 hover:bg-[#2b212e]/10 hover:text-[#2b212e] hover:border-[#2b212e]"} 
                font-lora transition-all duration-300`}
            >
              {sector}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid - New Design */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
          key={selectedSector} // Add key to force re-render when sector changes
        >
          {filteredProjects.map(project => (
            <motion.div 
              key={project.name} 
              variants={itemVariants} 
              className="group" 
              onMouseEnter={() => setHoveredProject(project.name)} 
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-full rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col">
                {/* Image Container */}
                <div className="relative h-[300px] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Multiple Category Badges */}
                  <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-2 z-10">
                    {getProjectSectors(project).map((sector, index) => (
                      <Badge 
                        key={`${project.name}-${sector}-${index}`} 
                        className="bg-[#2b212e] border-none text-white font-lora"
                      >
                        {sector}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80"></div>
                  
                  {/* Challenge Overlay - Appears on Hover */}
                  <div className="absolute inset-0 flex items-end p-6 z-10">
                    <div className="transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                      <h4 className="text-white/90 text-sm font-bold mb-2 uppercase tracking-wider">Challenge:</h4>
                      <p className="text-white font-lora">{project.challenge}</p>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-simula text-[#2b212e] mb-2 group-hover:text-[#2b212e] transition-colors duration-300">
                    {project.name}
                  </h3>
                  
                  {/* Partner information with inline display */}
                  <div className="flex items-center text-[#2b212e] font-lora text-sm mb-4">
                    <span className="mr-1">Partner:</span>
                    <span>{project.partner}</span>
                    {project.partnerLink && (
                      <a 
                        href={project.partnerLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-1 inline-flex items-center text-[#2b212e] hover:text-[#2b212e]/80" 
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <Link 
                      to={`/projects/${project.slug}`} 
                      className="inline-flex items-center mt-2 text-[#2b212e] hover:text-[#2b212e]/80 transition-colors duration-300 font-lora group/link"
                    >
                      <span className="border-b border-transparent group-hover/link:border-[#2b212e] transition-all duration-300">
                        Explore Project
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
