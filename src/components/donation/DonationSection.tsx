
import React, { useState } from "react";
import BackgroundDecoration from "./section/BackgroundDecoration";
import SectionTitle from "./section/SectionTitle";
import SectionDescription from "./section/SectionDescription";
import DonationFormContainer from "./section/DonationFormContainer";

/**
 * DonationSection Component
 * 
 * A full-width section that contains the donation form and impact information
 * Displayed on the conference page before the final CTA
 * 
 * Now refactored into smaller, more focused components for better maintainability
 * Manages the donation amount state and passes it to child components
 */
const DonationSection = () => {
  // State for the selected donation amount
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  
  return (
    <section className="py-16 px-4 md:px-8 bg-white relative overflow-hidden">
      <BackgroundDecoration />
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle />
        <SectionDescription />
        <DonationFormContainer 
          selectedAmount={selectedAmount} 
          setSelectedAmount={setSelectedAmount} 
        />
      </div>
    </section>
  );
};

export default DonationSection;
