
import { useNavigate, useLocation } from "react-router-dom";

interface JoinButtonProps {
  buttonStyles: string;
  onClick?: () => void;
}

/**
 * JoinButton Component - Navigation button to the "join" section
 * 
 * Features:
 * - Cross-page navigation support with consistent section targeting
 * - Smooth scrolling to the join section
 * - Handles both same-page and different-page navigation cases
 * - Uses standardized "build-with-us" section ID
 */
const JoinButton = ({ buttonStyles, onClick }: JoinButtonProps) => {
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
      navigate('/', { state: { scrollToSection: "build-with-us" } });
    } else {
      // If we're already on home page, just scroll to the section
      console.log("JoinButton: On homepage, scrolling directly");
      const joinSection = document.getElementById('build-with-us');
      if (joinSection) {
        joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn("JoinButton: Could not find 'build-with-us' section element");
      }
    }
  };

  return (
    <a
      href="/#build-with-us"
      className={`px-6 py-2 rounded-md transition-all duration-300 border-2 text-lg font-alegreyasans font-bold ${buttonStyles}`}
      onClick={handleJoinClick}
    >
      Join Us
    </a>
  );
};

export default JoinButton;
