
/**
 * Utility functions to manage speaker image display and positioning
 */

/**
 * Returns tailwind classes for optimal image positioning based on speaker ID
 * 
 * This ensures faces are properly centered in the frame and prevents cropping issues
 * with custom positioning for specific speakers that need adjustment
 * 
 * @param speakerId - The unique identifier for the speaker
 * @returns A string of Tailwind CSS classes for image positioning
 */
export const getSpeakerImagePosition = (speakerId: string): string => {
  const positionMap: Record<string, string> = {
    // Adjust these values based on each speaker's image needs
    "tomiwa-igun": "object-cover object-[center_top]",
    "mezuo-nwuneli": "object-cover object-[center_top]",
    "ismael-fanny": "object-cover object-[center_top]",
    "oby-ezekwesili": "object-cover object-[center_40%]",
    "bunmi-akinyemiju": "object-cover object-[center_30%]",
    "yomi-jemibewon": "object-cover object-[center_30%]",
    // Default positioning for others
    "default": "object-cover object-[center_center]"
  };
  
  return positionMap[speakerId] || positionMap.default;
};

/**
 * Creates a fallback element when speaker images fail to load
 * 
 * @param speakerId - The unique identifier for the speaker
 * @param placeholder - Text to display in the placeholder
 * @param isRounded - Whether to use rounded corners
 * @returns HTML string for the placeholder element
 */
export const createImageFallback = (speakerId: string, placeholder: string, isRounded: boolean = false): string => {
  const roundedClass = isRounded ? "rounded-lg" : "";
  
  return `<div class="absolute inset-0 flex items-center justify-center bg-raade-navy/10 ${roundedClass}">
    <p class="text-raade-navy font-medium text-xl">${placeholder}</p>
  </div>`;
};
