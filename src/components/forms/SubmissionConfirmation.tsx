
import { Check, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SubmissionConfirmationProps {
  title: string;
  message: string;
  buttonText?: string;
  customMessage?: React.ReactNode;
  icon?: React.ReactNode;
  buttonAction?: () => void;
}

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
    if (buttonAction) {
      buttonAction();
    } else {
      navigate('/');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#121212] p-8 rounded-lg border border-[#333] max-w-xl mx-auto text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-500/20 p-4">
          {icon || <Check className="h-16 w-16 text-green-500" />}
        </div>
      </div>
      
      <h2 className="text-2xl font-simula text-white mb-4">{title}</h2>
      <p className="text-white/80 font-lora mb-4">{message}</p>
      
      {customMessage && <div className="mb-8">{customMessage}</div>}
      
      <Button 
        onClick={handleButtonClick}
        className="bg-[#FBB03B] hover:bg-[#FBB03B]/80 text-white font-lora"
      >
        <Home className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>
    </motion.div>
  );
};

export default SubmissionConfirmation;
