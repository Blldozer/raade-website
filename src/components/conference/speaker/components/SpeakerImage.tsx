import React from "react";
import { getSpeakerImagePosition, createImageFallback, getSpeakerImageUrl } from "@/utils/speakerImageUtils";

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
        src={getSpeakerImageUrl(speakerId, 'jpg')}
        alt={name}
        onError={(e) => {
          // Try jpeg if jpg not found
          (e.target as HTMLImageElement).src = getSpeakerImageUrl(speakerId, 'jpeg');
          (e.target as HTMLImageElement).onerror = (e2) => {
            // Try png if jpeg not found
            const target = e.target as HTMLImageElement;
            target.src = getSpeakerImageUrl(speakerId, 'png');
            target.onerror = (e3) => {
              // Fallback to placeholder if no image format works
              target.src = "";
              target.alt = imagePlaceholder;
              target.style.display = "none";
              (target.parentElement as HTMLElement).innerHTML = createImageFallback(
                speakerId, 
                imagePlaceholder, 
                rounded
              );
            };
          };
        }}
        className={`w-full h-full ${roundedClass} ${getSpeakerImagePosition(speakerId)}`}
      />
    </div>
  );
};

export default SpeakerImage;
