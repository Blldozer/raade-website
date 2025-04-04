
/**
 * Speaker Interface
 * 
 * Defines the structure for speaker data throughout the application
 */
export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  imagePlaceholder: string;
  bio: string;
  fullBio?: string;
  expertise?: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  speaking?: {
    title?: string;
    description?: string;
    time?: string;
    date?: string;
  };
}
