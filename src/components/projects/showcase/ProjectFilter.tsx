
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProjectFilterProps {
  sectors: readonly string[];
  selectedSector: string;
  onSectorChange: (sector: string) => void;
}

/**
 * ProjectFilter Component
 * 
 * Displays filter buttons for project sectors:
 * - Shows all available sector options
 * - Handles selection state
 * - Applies custom styling for selected/unselected state
 * 
 * @param sectors - Array of available sectors
 * @param selectedSector - Currently selected sector
 * @param onSectorChange - Callback when sector selection changes
 */
const ProjectFilter = ({ sectors, selectedSector, onSectorChange }: ProjectFilterProps) => {
  return (
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
          onClick={() => onSectorChange(sector)}
          className={`${selectedSector === sector 
            ? "bg-[#2b212e] text-white hover:bg-[#2b212e]/90 border-none" 
            : "text-[#2b212e] border-[#2b212e]/20 hover:bg-[#2b212e]/10 hover:text-[#2b212e] hover:border-[#2b212e]"} 
            font-lora transition-all duration-300`}
        >
          {sector}
        </Button>
      ))}
    </motion.div>
  );
};

export default ProjectFilter;
