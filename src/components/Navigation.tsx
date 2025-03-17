
import NavigationContainer from "./navigation/NavigationContainer";

interface NavigationProps {
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  useShortFormLogo?: boolean;
}

/**
 * Navigation Component - Main navigation bar for the website
 * 
 * This component has been refactored for better maintainability.
 * It delegates all functionality to NavigationContainer which provides
 * a context for sharing navigation state across components.
 */
const Navigation = ({ 
  isHeroPage = false, 
  forceDarkMode = false,
  useShortFormLogo = false 
}: NavigationProps) => {
  return (
    <NavigationContainer
      isHeroPage={isHeroPage}
      forceDarkMode={forceDarkMode}
      useShortFormLogo={useShortFormLogo}
    />
  );
};

export default Navigation;
