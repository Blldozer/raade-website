
/**
 * Main Speakers List
 * 
 * Aggregates speaker data from various category files
 * and arranges them in the specific order requested for display
 */
import { Speaker } from "./types/Speaker";
import { leadershipSpeakers } from "./speakers/leadershipSpeakers";
import { entrepreneurSpeakers } from "./speakers/entrepreneurSpeakers";
import { financeSpeakers } from "./speakers/financeSpeakers";
import { academicSpeakers } from "./speakers/academicSpeakers";

/**
 * Helper function to get a speaker by ID from any category
 * @param id Speaker identifier
 * @param speakerArrays Arrays of speakers to search through
 * @returns Speaker object or undefined if not found
 */
const getSpeakerById = (id: string, speakerArrays: Speaker[][]) => {
  for (const array of speakerArrays) {
    const found = array.find(speaker => speaker.id === id);
    if (found) return found;
  }
  return undefined;
};

// Arrays to search through
const allSpeakerArrays = [leadershipSpeakers, entrepreneurSpeakers, financeSpeakers, academicSpeakers];

/**
 * Complete list of all conference speakers
 * Arranged in the specific display order requested
 */
export const speakersList: Speaker[] = [
  getSpeakerById("oby-ezekwesili", allSpeakerArrays)!,
  getSpeakerById("peter-obi", allSpeakerArrays)!,
  getSpeakerById("yomi-jemibewon", allSpeakerArrays)!,
  getSpeakerById("mezuo-nwuneli", allSpeakerArrays)!,
  getSpeakerById("alexander-byrd", allSpeakerArrays)!,
  getSpeakerById("tomiwa-igun", allSpeakerArrays)!,
  getSpeakerById("uzoma-alexander-eze", allSpeakerArrays)!,
  getSpeakerById("idris-bello", allSpeakerArrays)!,
  getSpeakerById("june-madete", allSpeakerArrays)!,
  getSpeakerById("ismael-fanny", allSpeakerArrays)!,
].filter(Boolean); // Remove any undefined speakers (safety check)
