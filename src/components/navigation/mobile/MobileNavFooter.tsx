
import { Link } from "react-router-dom";

interface MobileNavFooterProps {
  onLinkClick: () => void;
}

/**
 * MobileNavFooter Component
 * 
 * Renders the footer section of the mobile navigation with CTA button
 * Fixed at the bottom of the screen for consistent accessibility
 * 
 * @param onLinkClick - Function to call when the link is clicked
 */
const MobileNavFooter = ({ onLinkClick }: MobileNavFooterProps) => {
  return (
    <div className="sticky bottom-0 w-full border-t border-white/20 py-4 px-6 bg-[#1c3151] shadow-lg">
      <Link
        to="/#build-with-us"
        className="block w-full py-3 px-6 bg-[#FBB03B] hover:bg-[#FBB03B]/80 text-[#274675] text-center rounded-md font-medium text-lg transition-colors"
        onClick={onLinkClick}
      >
        Join Us
      </Link>
    </div>
  );
};

export default MobileNavFooter;
