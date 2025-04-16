import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Award, Bookmark } from "lucide-react";
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
  
  // Split bio into paragraphs for better readability
  const bioParagraphs = (speaker.fullBio || speaker.bio).split("\n\n").filter(Boolean);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-raade-navy font-simula flex items-center">
        <BookOpen className="mr-2 text-[#FBB03B]" size={24} />
        About
      </h2>
      
      <div className="prose max-w-none mb-8 font-lora text-gray-700">
        {bioParagraphs.map((paragraph, index) => (
          <div key={index} className="mb-4">
            <p className="leading-relaxed">{paragraph}</p>
            {index < bioParagraphs.length - 1 && <div className="my-4 border-b border-gray-100"></div>}
          </div>
        ))}
      </div>
      
      {/* Expertise section with improved styling */}
      {speaker.expertise && speaker.expertise.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 text-raade-navy font-simula flex items-center">
            <Award className="mr-2 text-[#FBB03B]" size={20} />
            Areas of Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            {speaker.expertise.map((area, index) => (
              <span 
                key={index} 
                className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Primary speaking session */}
      {speaker.speaking && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-raade-navy font-simula flex items-center">
            <Calendar className="mr-2 text-[#FBB03B]" size={20} />
            Featured Session
          </h3>
          <SpeakingSession 
            title={speaker.speaking.title}
            description={speaker.speaking.description}
            date={speaker.speaking.date}
            time={speaker.speaking.time}
          />
        </div>
      )}
      
      {/* Additional sessions if present */}
      {speaker.additionalSessions && speaker.additionalSessions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-raade-navy font-simula flex items-center">
            <Bookmark className="mr-2 text-[#FBB03B]" size={20} />
            Additional Engagements
          </h3>
          <div className="space-y-4">
            {speaker.additionalSessions.map((session, index) => (
              <SpeakingSession 
                key={index}
                title={session.title}
                description={session.description || `${speaker.name} will participate as a ${session.role} in this session.`}
                date={session.date}
                time={session.time}
                role={session.role}
                compact={true}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <Button
          onClick={() => window.location.href = '/conference#speakers'}
          className="border-[#FBB03B] text-[#FBB03B] hover:bg-[#FBB03B] hover:text-white font-lora"
        >
          View All Speakers
        </Button>
      </div>
    </motion.div>
  );
};

export default SpeakerMainContent;
