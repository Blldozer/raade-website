// This is the right code for the hamburger implementation
import React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavButtonProps {
  onClick: () => void;
  forceDarkMode?: boolean;
}

/**
 * MobileNavButton Component
 * 
 * Renders a clean hamburger menu button for mobile navigation
 * 
 * @param onClick - Function to call when the button is clicked
 * @param forceDarkMode - Whether to force dark mode styling
 */
const MobileNavButton = ({ 
  onClick, 
  forceDarkMode = false 
}: MobileNavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-full transition-colors",
        forceDarkMode 
          ? "text-[#274675] hover:bg-gray-100/10" 
          : "text-[#F9F5EB] hover:bg-[#274675]/10"
      )}
      aria-label="Open menu"
    >
      <Menu size={24} />
    </button>
  );
};

export default MobileNavButton;
