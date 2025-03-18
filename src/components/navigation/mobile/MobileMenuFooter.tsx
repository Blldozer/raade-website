
import React from "react";

interface MobileMenuFooterProps {
  onNavigation: (href: string) => void;
}

/**
 * MobileMenuFooter Component
 * 
 * Renders the footer section of the mobile menu with:
 * - Copyright information
 * - Call to action button
 * 
 * @param onNavigation - Function to handle navigation
 */
const MobileMenuFooter = ({ onNavigation }: MobileMenuFooterProps) => {
  return (
    <>
      {/* Main CTA Button */}
      <div className="p-4">
        <a
          href="/#build-with-us"
          className="block w-full py-3 px-6 bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-[#274675] text-center rounded-md font-alegreyasans font-bold transition-colors"
          onClick={(e) => {
            e.preventDefault();
            onNavigation("/#build-with-us");
          }}
        >
          Join Us
        </a>
      </div>
      
      {/* Copyright or other info */}
      <div className="border-t border-gray-200 p-3 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} RAADE. All rights reserved.
      </div>
    </>
  );
};

export default MobileMenuFooter;
