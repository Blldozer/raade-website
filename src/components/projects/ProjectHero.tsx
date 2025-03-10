
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-[#FBB03B] text-white border-none font-lora">
              {sector}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-simula text-white mb-4 max-w-3xl">
              {name}
            </h1>
            <div className="flex items-center text-xl text-white/90 font-lora max-w-2xl">
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
  );
};

export default ProjectHero;
