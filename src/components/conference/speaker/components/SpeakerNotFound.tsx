
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * SpeakerNotFound Component
 * 
 * Displays a message when a speaker cannot be found
 */
const SpeakerNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-semibold mb-4">Speaker not found</h2>
      <Button onClick={() => navigate("/conference")} className="mt-4">
        Return to Conference
      </Button>
    </div>
  );
};

export default SpeakerNotFound;
