
import React from "react";
import FeatureCard from "./FeatureCard";
import { Rocket, Globe, Lightbulb } from "lucide-react";

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-12">
      <FeatureCard 
        icon={Rocket}
        title="Innovation Showcase"
        description="Discover solutions developed by RAADE's Innovation Studios and other leading African initiatives."
      />
      
      <FeatureCard 
        icon={Globe}
        title="Global Networking"
        description="Connect with African organizations, investors, academics, and students passionate about sustainable development."
        delay={0.2}
      />
      
      <FeatureCard 
        icon={Lightbulb}
        title="Thought Leadership"
        description="Engage with compelling talks, panels, and workshops that challenge conventional thinking about African development."
        delay={0.4}
      />
    </div>
  );
};

export default FeatureCards;
