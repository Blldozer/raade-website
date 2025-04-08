
// This is the right code for the hamburger implementation
import React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavBackgroundStyle } from '@/hooks/navigation/useNavBackgroundStyle';

interface MobileNavButtonProps {
  onClick: () => void;
  forceDarkMode?: boolean;
}

/**
 * MobileNavButton Component
 * 
 * Renders a clean hamburger menu button for mobile navigation
 * Uses context to determine proper text color based on background
 * 
 * @param onClick - Function to call when the button is clicked
 * @param forceDarkMode - Whether to force dark mode styling
 */
const MobileNavButton = ({ 
  onClick, 
  forceDarkMode = false 
}: MobileNavButtonProps) => {
  // Get background style information
  const { isAgainstDarkBackground } = useNavBackgroundStyle();
  
  // Determine button color based on background context
  const buttonColor = isAgainstDarkBackground
    ? "text-white hover:bg-white/10" // White button against dark backgrounds
    : "text-[#274675] hover:bg-gray-100/10"; // Dark button against light backgrounds

  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-full transition-colors",
        buttonColor
      )}
      aria-label="Open menu"
    >
      <Menu size={24} />
    </button>
  );
};

export default MobileNavButton;
