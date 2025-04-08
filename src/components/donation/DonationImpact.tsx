
import React from "react";
import ImpactStatement from "./impact/ImpactStatement";
import ImpactList from "./impact/ImpactList";
import EmptyState from "./impact/EmptyState";
import ImpactFooter from "./impact/ImpactFooter";
import { useImpactTier } from "./impact/useImpactTier";

interface DonationImpactProps {
  selectedAmount: number | null;
}

/**
 * DonationImpact Component
 * 
 * A container component that displays the impact of different donation amounts
 * Shows detailed impact information based on selected donation amount
 * Uses smaller, focused sub-components for better maintainability
 * 
 * @param selectedAmount - Currently selected donation amount
 */
const DonationImpact = ({ selectedAmount }: DonationImpactProps) => {
  // Use custom hook to determine the appropriate impact tier
  const impact = useImpactTier(selectedAmount);
  
  // Display empty state if no amount is selected
  if (!impact) {
    return <EmptyState />;
  }
  
  return (
    <div className="bg-gradient-to-br from-[#274675] to-[#1e3a5f] p-6 rounded-lg text-white h-full flex flex-col">
      <h3 className="text-2xl font-simula mb-4">Your Impact</h3>
      
      <div className="mb-4">
        <ImpactStatement impact={impact} />
      </div>
      
      <h4 className="font-semibold mb-2">Your donation will help:</h4>
      <ImpactList impact={impact} />
      
      <ImpactFooter />
    </div>
  );
};

export default DonationImpact;
