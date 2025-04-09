import { useNavigate, useLocation } from "react-router-dom";

interface DonateButtonProps {
  buttonStyles: string;
  onClick?: () => void;
}

/**
 * DonateButton Component - Navigation button to the "donation" section
 * 
 * Features:
 * - Cross-page navigation support
 * - Smooth scrolling to the donation section 
 * - Consistent section targeting with ID "donation"
 * - Handles both same-page and different-page navigation cases
 * - Resilient to React Router context errors
 */
const DonateButton = ({ buttonStyles, onClick }: DonateButtonProps) => {
  // Use try-catch to handle cases where component is rendered outside Router context
  try {
    const navigate = useNavigate();
    const location = useLocation();

    // Handle consistent navigation to the donation section
    const handleDonateClick = (e: React.MouseEvent) => {
      e.preventDefault();
      
      // Call the onClick callback if provided (for mobile menu closing)
      if (onClick) onClick();
      
      // If we're not on the conference page, navigate to conference and then scroll
      if (location.pathname !== '/conference') {
        navigate('/conference', { state: { scrollToDonation: true } });
      } else {
        // If we're already on conference page, just scroll to the section
        const donationSection = document.getElementById('donation');
        if (donationSection) {
          donationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn("DonateButton: Could not find 'donation' section element");
        }
      }
    };

    return (
      <a
        href="/conference#donation"
        className={`px-6 py-2 rounded-md transition-all duration-300 border-2 text-lg font-alegreyasans font-bold ${buttonStyles}`}
        onClick={handleDonateClick}
      >
        Donate
      </a>
    );
  } catch (error) {
    // Fallback for when component is used outside Router context
    console.warn("DonateButton: Router context not available, using fallback behavior", error);
    
    // Simple fallback that just does basic anchor behavior
    const handleFallbackClick = (e: React.MouseEvent) => {
      // Call the onClick callback if provided
      if (onClick) onClick();
      
      // Don't prevent default - let the browser handle the navigation
      console.log("DonateButton: Using fallback navigation to /conference#donation");
    };
    
    return (
      <a
        href="/conference#donation"
        className={`px-6 py-2 rounded-md transition-all duration-300 border-2 text-lg font-alegreyasans font-bold ${buttonStyles}`}
        onClick={handleFallbackClick}
      >
        Donate
      </a>
    );
  }
};

export default DonateButton;
