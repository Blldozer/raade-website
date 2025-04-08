
import { Button } from "@/components/ui/button";

interface ContinueButtonProps {
  onContinue: () => void;
}

/**
 * ContinueButton Component
 * 
 * "Return to Conference" button that appears after successful registration
 */
const ContinueButton = ({ onContinue }: ContinueButtonProps) => {
  return (
    <Button 
      onClick={onContinue}
      className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora
        dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
        transition-colors duration-300"
    >
      Return to Conference
    </Button>
  );
};

export default ContinueButton;
