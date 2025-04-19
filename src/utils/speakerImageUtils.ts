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
    "idris-bello": "object-cover object-[center_top]",
    "ijeoma-anadu-okoli": "object-cover object-[center_30%]",
    // Default positioning for others
    "default": "object-cover object-[center_center]"
  };
  
  return positionMap[speakerId] || positionMap.default;
};

/**
 * Image version mapping to force cache-busting when images are updated
 * Increment these values when updating images for specific speakers
 */
export const speakerImageVersions: Record<string, number> = {
  // Speakers with updated images - increment these values when updating their images
  "oby-ezekwesili": 2,  // Updated April 2025
  "ismael-fanny": 2,    // Updated April 2025
  "june-madete": 2,     // Updated April 2025
  // Default version for other speakers
  "default": 1
};

/**
 * Gets the speaker image URL with cache-busting version parameter
 * 
 * @param speakerId - The unique identifier for the speaker
 * @param extension - The image file extension (jpg, jpeg, png)
 * @returns The full image URL with version parameter for cache-busting
 */
export const getSpeakerImageUrl = (speakerId: string, extension: string): string => {
  const normalizedId = 
    speakerId === "oby-ezekwesili" ? "oby-ezekwesili" : 
    speakerId === "ismael-fanny" ? "ismael-fanny" : 
    speakerId === "june-madete" ? "june-madete" : 
    speakerId === "ijeoma-anadu-okoli" ? "ijeoma-okoli" : 
    speakerId;
  
  // Get the version for this speaker or use default
  const version = speakerImageVersions[speakerId] || speakerImageVersions.default;
  
  return `/Speaker Images/${normalizedId}.${extension}?v=${version}`;
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
