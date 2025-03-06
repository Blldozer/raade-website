
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  text: string;
  submittingText: string;
}

const SubmitButton = ({ isSubmitting, text, submittingText }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      disabled={isSubmitting}
      className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/80 text-white font-lora"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {submittingText}
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
