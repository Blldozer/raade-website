
/**
 * Speaker Data Exports
 * 
 * Main entry point for speaker data that maintains the original API
 * for backward compatibility with existing components
 */
import { Speaker } from "./types/Speaker";
import { speakersList } from "./speakersList";
import { getSpeakerById } from "./utils/speakerUtils";

// Re-export the Speaker interface and data for backward compatibility
export type { Speaker };
export { speakersList, getSpeakerById };
