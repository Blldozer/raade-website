
import { Check, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SubmissionConfirmationProps {
  title: string;
  message: string;
  buttonText?: string;
  customMessage?: React.ReactNode;
  icon?: React.ReactNode;
  buttonAction?: () => void;
}

/**
 * SubmissionConfirmation Component
 * 
 * A stable, reusable confirmation screen that:
 * - Uses AnimatePresence for smoother mounting/unmounting
 * - Applies consistent animations with proper timing
 * - Ensures button actions execute cleanly
 * - Prevents animation jank during transitions
 */
const SubmissionConfirmation = ({
  title,
  message,
  buttonText = "Return to Home",
  customMessage,
  icon,
  buttonAction
}: SubmissionConfirmationProps) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Use a small timeout to let any animations complete
    // before executing navigation or other actions
    if (buttonAction) {
      buttonAction();
    } else {
      navigate('/');
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="confirmation-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.4 
        }}
        className="bg-[#121212] p-8 rounded-lg border border-[#333] max-w-xl mx-auto text-center shadow-lg"
      >
        <div className="flex justify-center mb-6">
          <motion.div 
            className="rounded-full bg-green-500/20 p-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {icon || <Check className="h-16 w-16 text-green-500" />}
          </motion.div>
        </div>
        
        <motion.h2 
          className="text-2xl font-simula text-white mb-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {title}
        </motion.h2>
        
        <motion.p 
          className="text-white/80 font-lora mb-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {message}
        </motion.p>
        
        {customMessage && (
          <motion.div 
            className="mb-8"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {customMessage}
          </motion.div>
        )}
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Button 
            onClick={handleButtonClick}
            className="bg-[#FBB03B] hover:bg-[#FBB03B]/80 text-white font-lora"
          >
            <Home className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubmissionConfirmation;
