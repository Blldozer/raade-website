
import React from 'react';
import BackgroundEffects from './join/BackgroundEffects';
import SectionHeader from './join/SectionHeader';
import InnovationStudiosCard from './join/InnovationStudiosCard';
import ConferenceCard from './join/ConferenceCard';
import PartnerCTA from './join/PartnerCTA';

const JoinSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden py-20 md:py-32">
      {/* Background elements */}
      <BackgroundEffects />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <SectionHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Innovation Studios Card */}
          <InnovationStudiosCard />

          {/* Conference Card */}
          <ConferenceCard />
        </div>
        
        {/* Partner submission CTA */}
        <PartnerCTA />
      </div>
    </section>
  );
};

export default JoinSection;
