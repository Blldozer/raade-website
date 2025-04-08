
/**
 * ImpactTier Type
 * 
 * Defines the structure of an impact tier with:
 * - title: The tier name (e.g., "Conference Supporter")
 * - description: A brief explanation of what this tier means
 * - items: A list of specific impacts this donation amount enables
 */
export interface ImpactTier {
  title: string;
  description: string;
  items: string[];
}

/**
 * EmptyDonationState Type
 * 
 * Used to represent the state when no donation amount is selected
 * Contains a null value to indicate absence of selection
 */
export type EmptyDonationState = null;

/**
 * ImpactData Type
 * 
 * Represents either a valid impact tier or an empty state
 * Used for conditional rendering based on donation amount
 */
export type ImpactData = ImpactTier | EmptyDonationState;
