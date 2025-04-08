
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
const allSpeakerArrays = [leadershipSpeakers, entrepreneurSpeakers, financeSpeakers];

/**
 * Complete list of all conference speakers
 * Arranged in the specific display order requested
 */
export const speakersList: Speaker[] = [
  // Ordered according to client request
  getSpeakerById("oby-ezekwesili", allSpeakerArrays)!, // 1. Obiageli first
  getSpeakerById("peter-obi", allSpeakerArrays)!, // 2. Obi second
  getSpeakerById("yomi-jemibewon", allSpeakerArrays)!, // 3. Yomi third
  getSpeakerById("mezuo-nwuneli", allSpeakerArrays)!, // 4. Mezuo fourth
  getSpeakerById("alexander-byrd", allSpeakerArrays)!, // 5. Dr. Byrd fifth
  getSpeakerById("tomiwa-igun", allSpeakerArrays)!, // 6. Tomiwa sixth
  getSpeakerById("ismael-fanny", allSpeakerArrays)!, // 7. Ismael seventh
  getSpeakerById("uzoma-alexander-eze", allSpeakerArrays)!, // 8. Uzoma eighth
].filter(Boolean); // Remove any undefined speakers (safety check)
