
import React from "react";
import TitleSection from "./overview/TitleSection";
import ContentSection from "./overview/ContentSection";
import FeatureCards from "./overview/FeatureCards";
import EventDetails from "./overview/EventDetails";

const ConferenceOverview = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Title Section with 39/61 split */}
        <TitleSection />

        {/* Content Section with reversed 39/61 split */}
        <ContentSection />
        
        {/* Feature Cards Section - Full Width */}
        <FeatureCards />
        
        {/* Video and Event Details Section */}
        <EventDetails />
      </div>
    </section>
  );
};

export default ConferenceOverview;
