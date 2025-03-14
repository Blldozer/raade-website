
import { Search, X } from "lucide-react";
import NavLogo from "../NavLogo";

interface MobileNavHeaderProps {
  onClose: () => void;
}

/**
 * MobileNavHeader Component
 * 
 * Renders the header section of the mobile navigation overlay
 * Contains the logo, search button, and close button
 * 
 * @param onClose - Function to call when close button is clicked
 */
const MobileNavHeader = ({ onClose }: MobileNavHeaderProps) => {
  return (
    <div className="sticky top-0 flex justify-between items-center p-4 border-b border-white/20 bg-[#274675] shadow-md">
      <NavLogo 
        forceDarkMode={false} 
        useShortForm={true}
        forceSize="h-8"
      />
      <div className="flex items-center gap-4">
        <button 
          className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
          aria-label="Search"
        >
          <Search size={24} />
        </button>
        <button
          onClick={onClose}
          className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default MobileNavHeader;
