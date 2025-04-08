
import { useMemo } from "react";
import { ImpactData } from "./impactTypes";

/**
 * useImpactTier Hook
 * 
 * Custom hook to determine the appropriate impact tier based on donation amount
 * Memoizes the result to prevent unnecessary recalculations
 * 
 * @param selectedAmount - The currently selected donation amount
 * @returns The appropriate impact tier data or null if no amount is selected
 */
export const useImpactTier = (selectedAmount: number | null): ImpactData => {
  return useMemo(() => {
    if (!selectedAmount) return null;
    
    if (selectedAmount < 50) {
      return {
        title: "Conference Supporter",
        description: "Your $25 donation contributes to the essential elements of our conference experience.",
        items: [
          "Fund a welcome packet for a conference attendee",
          "Support technical equipment needed for one speaker's presentation",
          "Help provide name badges for multiple participants"
        ]
      };
    } else if (selectedAmount < 100) {
      return {
        title: "Conference Contributor",
        description: "Your $50 donation helps enhance the conference experience for attendees and speakers.",
        items: [
          "Cover breakfast for two conference attendees",
          "Fund transportation for a speaker from their hotel to the conference venue",
          "Support the printing of conference materials for multiple participants"
        ]
      };
    } else if (selectedAmount < 250) {
      return {
        title: "Conference Sponsor",
        description: "Your $100 donation makes a meaningful impact on our conference programming and documentation.",
        items: [
          "Provide dinner for four conference attendees",
          "Fund a portion of the documentation costs (photography/videography)",
          "Support youth participation in RAADE's programs"
        ]
      };
    } else if (selectedAmount < 500) {
      return {
        title: "Development Advocate",
        description: "Your $250 donation helps us create a high-quality conference experience for all participants.",
        items: [
          "Sponsor a speaker's honorarium",
          "Fund part of the conference venue rental costs",
          "Support the creation of essential conference materials including recognition plaques"
        ]
      };
    } else if (selectedAmount < 1000) {
      return {
        title: "Leadership Patron",
        description: "Your $500 donation enables significant aspects of our programming and African participation.",
        items: [
          "Fund a half-day workshop for African entrepreneurs",
          "Sponsor multiple regional attendees' participation",
          "Support an Innovation Studio project with mentoring and resources"
        ]
      };
    } else {
      return {
        title: "Transformation Leader",
        description: "Your generous donation of $1,000 or more enables transformative impact across our entire initiative.",
        items: [
          "Sponsor a complete Studio Innovation project tackling a specific challenge",
          "Fund travel and accommodation for international speakers",
          "Support multiple aspects of the conference including venue, meals, and documentation",
          "Help establish sustainable partnerships between Rice University and African organizations"
        ]
      };
    }
  }, [selectedAmount]);
};
