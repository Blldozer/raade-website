
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SpeakingSession from "./SpeakingSession";
import { Speaker } from "../../data/speakersData";

/**
 * SpeakerMainContent Component
 * 
 * Displays the main content area with speaker's bio, speaking session, and navigation button
 * 
 * @param speaker - Speaker object containing all relevant information
 */
type SpeakerMainContentProps = {
  speaker: Speaker;
};

const SpeakerMainContent = ({ speaker }: SpeakerMainContentProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-raade-navy font-simula">About</h2>
      <div className="prose max-w-none mb-8 font-lora text-gray-700">
        <p>{speaker.fullBio || speaker.bio}</p>
      </div>
      
      {speaker.speaking && (
        <SpeakingSession 
          title={speaker.speaking.title}
          description={speaker.speaking.description}
          date={speaker.speaking.date}
          time={speaker.speaking.time}
        />
      )}
      
      <div className="mt-12">
        <Button 
          variant="outline" 
          className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
          onClick={() => navigate("/conference#speakers")}
        >
          View All Speakers
        </Button>
      </div>
    </motion.div>
  );
};

export default SpeakerMainContent;
