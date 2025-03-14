
import { cn } from "@/lib/utils";

interface MobileNavButtonProps {
  onClick: () => void;
  forceDarkMode?: boolean;
}

/**
 * MobileNavButton Component
 * 
 * Renders the hamburger menu button that toggles the mobile navigation
 * Adapts styling based on page context (dark/light mode)
 * 
 * @param onClick - Function to call when button is clicked
 * @param forceDarkMode - Whether to force dark styling regardless of context
 */
const MobileNavButton = ({ onClick, forceDarkMode = false }: MobileNavButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log("Mobile nav button clicked");
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 hover:bg-white/10 rounded-md transition-all duration-200",
        forceDarkMode ? "text-[#274675]" : "text-white"
      )}
      aria-label="Open menu"
      type="button"
    >
      <span className="sr-only">Menu</span>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <path 
          d="M3 12H21M3 6H21M3 18H21" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default MobileNavButton;
