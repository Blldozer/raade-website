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
        "p-2 hover:bg-white/10 rounded-md transition-all duration-200 flex flex-col justify-center items-center gap-1.5",
        forceDarkMode ? "text-[#274675]" : "text-white"
      )}
      aria-label="Open menu"
      type="button"
    >
      <span className="sr-only">Menu</span>
      <div className="flex flex-col justify-center items-center gap-1.5">
        <span className={cn(
          "block w-6 h-0.5 transition-all duration-200",
          forceDarkMode ? "bg-[#274675]" : "bg-white"
        )}></span>
        <span className={cn(
          "block w-6 h-0.5 transition-all duration-200",
          forceDarkMode ? "bg-[#274675]" : "bg-white"
        )}></span>
        <span className={cn(
          "block w-6 h-0.5 transition-all duration-200",
          forceDarkMode ? "bg-[#274675]" : "bg-white"
        )}></span>
      </div>
    </button>
  );
};

export default MobileNavButton;
