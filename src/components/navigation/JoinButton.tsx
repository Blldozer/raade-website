
import { useNavigate, useLocation } from "react-router-dom";

interface JoinButtonProps {
  buttonStyles: string;
  onClick?: () => void;
}

/**
 * JoinButton Component - Navigation button to the "join" section
 * 
 * Features:
 * - Cross-page navigation support
 * - Smooth scrolling to the join section
 * - Consistent section targeting with ID "join"
 * - Handles both same-page and different-page navigation cases
 * - Resilient to React Router context errors
 */
const JoinButton = ({ buttonStyles, onClick }: JoinButtonProps) => {
  // Use try-catch to handle cases where component is rendered outside Router context
  try {
    const navigate = useNavigate();
    const location = useLocation();

    // Handle consistent navigation to the join section
    const handleJoinClick = (e: React.MouseEvent) => {
      e.preventDefault();
      
      // Call the onClick callback if provided (for mobile menu closing)
      if (onClick) onClick();
      
      console.log("JoinButton: Navigating to join section, current path:", location.pathname);
      
      // If we're not on the home page, navigate to home and then scroll
      if (location.pathname !== '/') {
        console.log("JoinButton: Not on homepage, navigating with state");
        navigate('/', { state: { scrollToJoin: true } });
      } else {
        // If we're already on home page, just scroll to the section
        console.log("JoinButton: On homepage, scrolling directly");
        const joinSection = document.getElementById('join');
        if (joinSection) {
          joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn("JoinButton: Could not find 'join' section element");
        }
      }
    };

    return (
      <a
        href="/#join"
        className={`px-6 py-2 rounded-md transition-all duration-300 border-2 text-lg font-alegreyasans font-bold ${buttonStyles}`}
        onClick={handleJoinClick}
      >
        Join Us
      </a>
    );
  } catch (error) {
    // Fallback for when component is used outside Router context
    console.warn("JoinButton: Router context not available, using fallback behavior", error);
    
    // Simple fallback that just does basic anchor behavior
    const handleFallbackClick = (e: React.MouseEvent) => {
      // Call the onClick callback if provided
      if (onClick) onClick();
      
      // Don't prevent default - let the browser handle the navigation
      console.log("JoinButton: Using fallback navigation to /#join");
    };
    
    return (
      <a
        href="/#join"
        className={`px-6 py-2 rounded-md transition-all duration-300 border-2 text-lg font-alegreyasans font-bold ${buttonStyles}`}
        onClick={handleFallbackClick}
      >
        Join Us
      </a>
    );
  }
};

export default JoinButton;
