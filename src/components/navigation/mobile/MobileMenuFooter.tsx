import React from "react";
import { motion } from "framer-motion";
import { useNavigation } from "@/hooks/navigation/useNavigation";

interface MobileNavFooterProps {
  onLinkClick: () => void;
}

/**
 * MobileNavFooter Component
 * 
 * Renders the footer section of the mobile menu with:
 * - Gold CTA button with hover effects (maintaining gold color)
 * - Fade-in animations for smooth appearance
 * - Responsive padding for better touch targets
 * - Consistent navigation to the 'join' section
 * - Uses the same navigation logic as JoinButton
 * 
 * @param onLinkClick - Function to call when a link is clicked
 */
const MobileNavFooter = ({ onLinkClick }: MobileNavFooterProps) => {
  const { handleNavigation } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onLinkClick();
    handleNavigation(href);
  };

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Two-column layout for buttons */}
      <div className="p-5 grid grid-cols-2 gap-4">
        {/* Donate Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.a
            href="/conference#donation"
            className="block w-full py-3.5 px-4 bg-white text-[#FBB03B] border-2 border-[#FBB03B] text-center rounded-md font-alegreyasans font-bold text-lg transition-colors shadow-md hover:shadow-lg hover:bg-[#FBB03B]/10"
            onClick={(e) => handleClick(e, "/conference#donation")}
            whileHover={{ y: -2 }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Donate
          </motion.a>
        </motion.div>

        {/* Join Us Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.a
            href="/#join"
            className="block w-full py-3.5 px-4 bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-[#274675] text-center rounded-md font-alegreyasans font-bold text-lg transition-colors shadow-md hover:shadow-lg"
            onClick={(e) => handleClick(e, "/#join")}
            whileHover={{ y: -2 }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Join Us
          </motion.a>
        </motion.div>
      </div>

      {/* Copyright or other info */}
      <motion.div 
        className="border-t border-white/10 p-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-sm text-white/80 font-alegreyasans">
          &copy; {new Date().getFullYear()} RAADE. All rights reserved.
        </p>
        <p className="text-xs text-white/60 mt-1 font-alegreyasans">
          Rice Association for African Development
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MobileNavFooter;
