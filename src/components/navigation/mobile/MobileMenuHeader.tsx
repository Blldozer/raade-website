
import React from "react";
import { X, Search } from "lucide-react";
import NavLogo from "../NavLogo";

interface MobileMenuHeaderProps {
  onClose: (e: React.MouseEvent) => void;
}

/**
 * MobileMenuHeader Component
 * 
 * Renders the header section of the mobile menu with:
 * - Logo
 * - Search button
 * - Close button
 * 
 * @param onClose - Function to close the menu with event handling
 */
const MobileMenuHeader = ({ onClose }: MobileMenuHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-5 border-b border-gray-200">
      <NavLogo 
        forceDarkMode={true} 
        useShortForm={true}
        forceSize="h-8"
      />
      <div className="flex items-center gap-4">
        <button 
          className="p-2 text-[#274675] hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Search"
        >
          <Search size={22} />
        </button>
        <button
          onClick={onClose}
          className="p-2 text-[#274675] hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default MobileMenuHeader;
