import React from "react";
import { motion } from "framer-motion";
import SpeakerImage from "./SpeakerImage";
import SpeakerSocialLinks from "./SpeakerSocialLinks";
import ExpertiseTags from "./ExpertiseTags";
import { Speaker } from "../../data/speakersData";

/**
 * SpeakerSidebar Component
 * 
 * Displays the left sidebar with speaker's image, name, role, and expertise
 * 
 * @param speaker - Speaker object containing all relevant information
 */
type SpeakerSidebarProps = {
  speaker: Speaker;
};

const SpeakerSidebar = ({ speaker }: SpeakerSidebarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24"
    >
      <SpeakerImage 
        speakerId={speaker.id}
        name={speaker.name}
        imagePlaceholder={speaker.imagePlaceholder}
        rounded={true}
      />
      
      <h1 className="text-2xl font-bold text-raade-navy font-simula mb-2 mt-4">{speaker.name}</h1>
      <p className="text-[#FBB03B] font-medium mb-1 font-lora">{speaker.role}</p>
      <p className="text-gray-600 mb-4 font-lora italic">{speaker.organization}</p>
      
      {speaker.social && (
        <SpeakerSocialLinks 
          linkedin={speaker.social.linkedin}
          twitter={speaker.social.twitter}
          website={speaker.social.website}
          speakerName={speaker.name}
        />
      )}
      
      {speaker.expertise && (
        <ExpertiseTags expertise={speaker.expertise} />
      )}
    </motion.div>
  );
};

export default SpeakerSidebar;
