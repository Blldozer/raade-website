
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/navigation/useNavigation";

export interface JoinButtonProps {
  buttonStyles?: string;
}

/**
 * JoinButton Component
 * 
 * Call-to-action button in the navigation bar
 * Different styling based on context and page position
 */
const JoinButton: React.FC<JoinButtonProps> = ({ 
  buttonStyles = "bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
}) => {
  const { handleNavigation } = useNavigation();

  const handleClick = () => {
    handleNavigation("/#join");
  };

  return (
    <Button 
      className={`rounded-full px-5 py-2 ${buttonStyles}`}
      onClick={handleClick}
    >
      Get Involved
    </Button>
  );
};

export default JoinButton;
