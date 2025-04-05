import * as React from "react";
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
        src={`/Speaker Images/${speakerId}.jpg`} 
        alt={name}
        onError={(e) => {
          try {
            // Try jpeg if jpg not found
            const target = e.target as HTMLImageElement;
            if (!target) return; // Guard against null target
            
            target.src = `/Speaker Images/${speakerId}.jpeg`;
            target.onerror = (e2) => {
              try {
                // Fallback to placeholder if neither image format works
                if (!target || !target.parentElement) return; // Guard against null elements
                
                target.src = "";
                target.alt = imagePlaceholder || name;
                target.style.display = "none";
                
                // Safer DOM manipulation
                const parent = target.parentElement;
                if (parent) {
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = `flex items-center justify-center w-full h-full bg-gray-100 ${rounded ? "rounded-lg" : ""}`;
                  fallbackDiv.innerHTML = `<span class="text-3xl font-bold text-gray-400">${imagePlaceholder || name.charAt(0)}</span>`;
                  parent.appendChild(fallbackDiv);
                }
              } catch (err) {
                console.warn('Error in image fallback:', err);
              }
            };
          } catch (err) {
            console.warn('Error in image error handler:', err);
          }
        }}
        className={`w-full h-full ${roundedClass} ${getSpeakerImagePosition(speakerId)}`}
      />
    </div>
  );
};

export default SpeakerImage;
