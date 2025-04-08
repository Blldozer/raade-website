
import { X } from "lucide-react";
import NavLogo from "../NavLogo";

interface MobileNavHeaderProps {
  onClose: () => void;
}

/**
 * MobileNavHeader Component
 * 
 * Renders the header section of the mobile navigation overlay
 * Contains the logo and close button
 * 
 * @param onClose - Function to call when close button is clicked
 */
const MobileNavHeader = ({ onClose }: MobileNavHeaderProps) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log("Close button clicked in mobile nav header");
    onClose();
  };

  return (
    <div className="sticky top-0 flex justify-between items-center p-4 border-b border-white/20 bg-[#274675] shadow-md z-20">
      <NavLogo 
        forceBlackLogo={false} 
        useShortForm={true}
        forceSize="h-8"
      />
      <button
        onClick={handleClose}
        className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
        aria-label="Close menu"
        type="button"
      >
        <X size={24} className="text-white" />
      </button>
    </div>
  );
};

export default MobileNavHeader;
