
import { Speaker } from "../types/Speaker";
import { leadershipSpeakers } from "../speakers/leadershipSpeakers";
import { entrepreneurSpeakers } from "../speakers/entrepreneurSpeakers";
import { financeSpeakers } from "../speakers/financeSpeakers";

/**
 * Get a speaker by their ID across all categories
 * 
 * @param id Speaker's unique identifier
 * @returns Speaker object or undefined if not found
 */
export const getSpeakerById = (id: string): Speaker | undefined => {
  // Combine all speaker categories
  const allSpeakers = [
    ...leadershipSpeakers,
    ...entrepreneurSpeakers,
    ...financeSpeakers
  ];
  
  // Find speaker with matching ID
  return allSpeakers.find(speaker => speaker.id === id);
};
