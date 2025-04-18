import React from "react";
import { getSpeakerImagePosition, createImageFallback } from "@/utils/speakerImageUtils";

/**
 * SpeakerImage Component
 * 
 * Displays the speaker's image with proper positioning and fallback handling
 * 
 * @param speakerId - The unique identifier for the speaker
 * @param name - The speaker's name for alt text and fallback
 * @param imagePlaceholder - Text to display if image cannot be loaded
 * @param rounded - Whether to use rounded corners for the image
 */
type SpeakerImageProps = {
  speakerId: string;
  name: string;
  imagePlaceholder: string;
  rounded?: boolean;
};

const SpeakerImage = ({ speakerId, name, imagePlaceholder, rounded = true }: SpeakerImageProps) => {
  const roundedClass = rounded ? "rounded-lg" : "";
  
  return (
    <div className={`aspect-square bg-gray-200 ${roundedClass} relative overflow-hidden`}>
      <img 
        src={`/Speaker Images/${
          speakerId === "ijeoma-anadu-okoli" ? "ijeoma-okoli" : 
          speakerId === "ismael-fanny" ? "ismael-fanny2" : 
          speakerId === "oby-ezekwesili" ? "obiageli-ezekwesili" : 
          speakerId
        }.jpg`} 
        alt={name}
        onError={(e) => {
          // Try jpeg if jpg not found
          (e.target as HTMLImageElement).src = `/Speaker Images/${
            speakerId === "ijeoma-anadu-okoli" ? "ijeoma-okoli" : 
            speakerId === "ismael-fanny" ? "ismael-fanny" : 
            speakerId === "oby-ezekwesili" ? "obiageli-ezekwesili" : 
            speakerId
          }.jpeg`;
          (e.target as HTMLImageElement).onerror = (e2) => {
            // Fallback to placeholder if neither image format works
            const target = e.target as HTMLImageElement;
            target.src = "";
            target.alt = imagePlaceholder;
            target.style.display = "none";
            (target.parentElement as HTMLElement).innerHTML = createImageFallback(
              speakerId, 
              imagePlaceholder, 
              rounded
            );
          };
        }}
        className={`w-full h-full ${roundedClass} ${getSpeakerImagePosition(speakerId)}`}
      />
    </div>
  );
};

export default SpeakerImage;
