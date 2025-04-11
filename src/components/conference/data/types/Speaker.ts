/**
 * Speaker Interface
 * 
 * Defines the structure for speaker data throughout the application
 */

export interface SpeakingSession {
  title: string;
  description: string;
  time: string;
  date: string;
}

export interface AdditionalSession {
  title: string;
  role: string;
  description?: string;
  time: string;
  date: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  imagePlaceholder: string;
  bio: string;
  fullBio: string;
  expertise: string[];
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
    email?: string;
  };
  speaking: SpeakingSession;
  additionalSessions?: AdditionalSession[];
}
