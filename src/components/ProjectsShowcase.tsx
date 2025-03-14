
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { projects } from "@/data/ProjectData";
import ProjectCard from "@/components/projects/showcase/ProjectCard";
import ProjectFilter from "@/components/projects/showcase/ProjectFilter";

const sectors = ["All", "Healthcare", "Technology", "Education", "Energy", "Business"] as const;

/**
 * ProjectsShowcase Component
 * 
 * Main container component that:
 * - Manages project filtering state
 * - Displays section header with description
 * - Renders filter buttons and project grid
 * - Handles animations and transitions
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

  // Animation variants for container and project cards
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
        <ProjectFilter 
          sectors={sectors}
          selectedSector={selectedSector}
          onSectorChange={handleSectorChange}
        />

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
          key={selectedSector} // Add key to force re-render when sector changes
        >
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.name}
              project={project}
              setHoveredProject={setHoveredProject}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
