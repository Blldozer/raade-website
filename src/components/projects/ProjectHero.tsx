
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectHeroProps {
  image: string;
  name: string;
  sector: string;
  partner: string;
  partnerLink?: string;
}

/**
 * ProjectHero Component
 * 
 * Displays the hero section for individual project pages with:
 * - Consistent grid-based layout that matches other pages
 * - Better responsive text scaling
 * - Balanced spacing and padding
 * - Improved visual hierarchy for project information
 */
const ProjectHero = ({ image, name, sector, partner, partnerLink }: ProjectHeroProps) => {
  return (
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <img 
        src={image} 
        alt={name} 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="container mx-auto px-6 py-16 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3"
            >
              <Badge className="mb-4 bg-[#FBB03B] text-white border-none font-lora">
                {sector}
              </Badge>
              <h1 className="text-[clamp(2rem,8vw,4rem)] font-simula text-white mb-4 leading-[1.2]">
                {name}
              </h1>
              <div className="flex items-center text-[clamp(1rem,3vw,1.25rem)] text-white/90 font-lora">
                <span>Partner: {partner}</span>
                {partnerLink && (
                  <a 
                    href={partnerLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 inline-flex items-center text-white/90 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
