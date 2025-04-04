
/**
 * Speaker Utility Functions
 * 
 * Contains helper functions for working with speaker data
 */
import { Speaker } from "../types/Speaker";
import { speakersList } from "../speakersList";

/**
 * Find a speaker by their unique ID
 * 
 * @param id - Unique identifier for the speaker
 * @returns Speaker object if found, undefined otherwise
 */
export const getSpeakerById = (id: string): Speaker | undefined => {
  return speakersList.find(speaker => speaker.id === id);
};
