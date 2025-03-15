
import NavLinks from "./NavLinks";
import { useNavigation } from "./context/NavigationContext";

interface DesktopNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  className?: string;
  forceDarkMode?: boolean;
}

/**
 * DesktopNav Component
 * 
 * Renders the desktop version of the navigation with links
 * Uses the navigation context for styling decisions
 * 
 * @param isScrolled - Whether the page has been scrolled (legacy prop, use context instead)
 * @param isHeroPage - Whether this is displayed on a hero section (legacy prop, use context instead)
 * @param className - Additional CSS classes to apply
 * @param forceDarkMode - Whether to force dark mode styling (legacy prop, use context instead)
 */
const DesktopNav = ({ 
  isScrolled = false, 
  isHeroPage = false, 
  className = "", 
  forceDarkMode = false 
}: DesktopNavProps) => {
  // Use the navigation context for styling
  const { state } = useNavigation();
  
  // Prioritize context values but fall back to props for backward compatibility
  const actualIsScrolled = state.isScrolled || isScrolled;
  const actualIsHeroPage = state.isHeroPage || isHeroPage;
  const actualForceDarkMode = forceDarkMode || !state.isDarkBackground;
  
  return (
    <div className={`hidden md:flex items-center space-x-8 ${className}`}>
      <NavLinks 
        isScrolled={actualIsScrolled} 
        isHeroPage={actualIsHeroPage} 
        forceDarkMode={actualForceDarkMode} 
      />
    </div>
  );
};

export default DesktopNav;
