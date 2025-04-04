
import React from "react";
import { Linkedin, Twitter, Globe } from "lucide-react";

/**
 * SpeakerSocialLinks Component
 * 
 * Displays social media links for a speaker with proper icons and hover states
 * 
 * @param linkedin - LinkedIn profile URL
 * @param twitter - Twitter profile URL
 * @param website - Personal/company website URL
 * @param speakerName - Speaker's name for accessibility labels
 */
type SpeakerSocialLinksProps = {
  linkedin?: string;
  twitter?: string;
  website?: string;
  speakerName: string;
};

const SpeakerSocialLinks = ({ linkedin, twitter, website, speakerName }: SpeakerSocialLinksProps) => {
  if (!linkedin && !twitter && !website) return null;
  
  return (
    <div className="flex space-x-3 mb-6">
      {linkedin && (
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#0077B5] transition-colors"
          aria-label={`LinkedIn profile of ${speakerName}`}
        >
          <Linkedin size={20} />
        </a>
      )}
      {twitter && (
        <a 
          href={twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#1DA1F2] transition-colors"
          aria-label={`Twitter profile of ${speakerName}`}
        >
          <Twitter size={20} />
        </a>
      )}
      {website && (
        <a 
          href={website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-raade-navy transition-colors"
          aria-label={`Website of ${speakerName}`}
        >
          <Globe size={20} />
        </a>
      )}
    </div>
  );
};

export default SpeakerSocialLinks;
