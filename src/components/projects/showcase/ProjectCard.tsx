
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Project } from "@/data/ProjectData";

interface ProjectCardProps {
  project: Project;
  setHoveredProject: (name: string | null) => void;
  itemVariants: Variants;
}

/**
 * ProjectCard Component
 * 
 * Displays an individual project card with:
 * - Responsive image thumbnail with hover effects and error handling
 * - Dynamic badges for project sectors
 * - Challenge information appearing on hover
 * - Partner information on a single line with external link when available
 * 
 * Features:
 * - Image error handling with retry mechanism
 * - Loading states for better mobile performance
 * - Optimized for all device types
 * 
 * @param project - The project data to display
 * @param setHoveredProject - Function to track hover state
 * @param itemVariants - Animation variants for the card
 */
const ProjectCard = ({ project, setHoveredProject, itemVariants }: ProjectCardProps) => {
  // Track image loading and error states
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Get project sectors for display
  const getProjectSectors = (project: Project) => {
    if (project.sectors) {
      return project.sectors;
    }
    return [project.sector];
  };

  // Handle image load error with retry logic
  const handleImageError = () => {
    console.log(`Image load error for project: ${project.name}, retry: ${retryCount}`);
    
    if (retryCount < 2) {
      // Try to reload the image
      const timer = setTimeout(() => {
        setRetryCount(retryCount + 1);
        setImageError(false); // Reset error to try loading again
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // After retries, show error state
      console.error(`Failed to load image for ${project.name} after ${retryCount} retries`);
      setImageError(true);
    }
  };

  // Generate placeholder background color based on project name
  const getPlaceholderColor = () => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'
    ];
    
    // Simple hash of the project name to get consistent color
    const hashCode = project.name.split('').reduce(
      (hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0
    );
    return colors[Math.abs(hashCode) % colors.length];
  };

  return (
    <motion.div 
      variants={itemVariants} 
      className="group" 
      onMouseEnter={() => setHoveredProject(project.name)} 
      onMouseLeave={() => setHoveredProject(null)}
    >
      <div className="relative h-full rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col">
        {/* Image Container */}
        <div className="relative h-[300px] overflow-hidden">
          {/* Placeholder before image loads */}
          <div className={`absolute inset-0 ${getPlaceholderColor()} flex items-center justify-center`}>
            {!imageLoaded && !imageError && (
              <div className="text-white font-bold">{project.name.split(' ')[0]}</div>
            )}
            {imageError && (
              <div className="text-white text-center p-4">
                <div className="font-bold mb-1">{project.name}</div>
                <div className="text-sm">{project.sector}</div>
              </div>
            )}
          </div>
          
          {/* Actual image with error handling */}
          {!imageError && (
            <img 
              src={`${project.image}?${retryCount}`} // Add retry param to force reload
              alt={project.name} 
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
              loading="eager" // Load eagerly for better mobile performance
            />
          )}
          
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
  );
};

export default ProjectCard;
