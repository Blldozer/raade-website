import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * BackButton Component
 * 
 * Provides a styled back button to return to the conference speakers section
 */
const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="ghost" 
      className="flex items-center mb-8 text-white hover:text-[#FBB03B]"
      onClick={() => navigate("/conference#speakers-section")}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      <span className="font-montserrat">Back to Conference</span>
    </Button>
  );
};

export default BackButton;
