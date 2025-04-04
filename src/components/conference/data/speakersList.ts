
/**
 * Main Speakers List
 * 
 * Aggregates speaker data from various category files
 */
import { Speaker } from "./types/Speaker";
import { leadershipSpeakers } from "./speakers/leadershipSpeakers";
import { entrepreneurSpeakers } from "./speakers/entrepreneurSpeakers";
import { financeSpeakers } from "./speakers/financeSpeakers";

/**
 * Complete list of all conference speakers
 */
export const speakersList: Speaker[] = [
  ...leadershipSpeakers,
  ...entrepreneurSpeakers,
  ...financeSpeakers
];
