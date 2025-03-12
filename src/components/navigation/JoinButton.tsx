
import { useNavigate, useLocation } from "react-router-dom";

interface JoinButtonProps {
  buttonStyles: string;
  onClick?: () => void;
}

const JoinButton = ({ buttonStyles, onClick }: JoinButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll to the join section
  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    
    // If we're not on the home page, navigate to home and then scroll
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToJoin: true } });
    } else {
      // If we're already on home page, just scroll to the section
      const joinSection = document.getElementById('join');
      if (joinSection) {
        joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
};

export default JoinButton;
