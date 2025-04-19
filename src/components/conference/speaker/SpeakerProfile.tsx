import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSpeakerById } from "../data/speakersData";
import BackButton from "./components/BackButton";
import SpeakerSidebar from "./components/SpeakerSidebar";
import SpeakerMainContent from "./components/SpeakerMainContent";
import SpeakerNotFound from "./components/SpeakerNotFound";

/**
 * SpeakerProfile Component
 * 
 * Main container component that orchestrates the display of a speaker's profile page
 * Coordinates between sidebar and main content areas
 * 
 * Features:
 * - Responsive layout (stacked on mobile, side-by-side on desktop)
 * - Dynamic data loading based on speaker ID from URL
 * - Page title management
 * - Proper fallback for invalid speaker IDs
 */
const SpeakerProfile = () => {
  const { speakerId } = useParams<{ speakerId: string }>();
  const speaker = getSpeakerById(speakerId || "");

  useEffect(() => {
    // Update page title with speaker name
    if (speaker) {
      document.title = `${speaker.name} | RAADE Day Forum`;
    }
    
    // Scroll to top when component loads
    window.scrollTo(0, 0);
  }, [speaker]);

  // Handle case when speaker is not found
  if (!speaker) {
    return <SpeakerNotFound />;
  }

  return (
    <div className="bg-black min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <BackButton />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar with speaker image and basic info */}
          <div className="md:col-span-1">
            <SpeakerSidebar speaker={speaker} />
          </div>
          
          {/* Main content area with bio and speaking details */}
          <div className="md:col-span-2">
            <SpeakerMainContent speaker={speaker} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerProfile;
