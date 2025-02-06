
import Hero from "@/components/hero/Hero";
import WhyWeCantWait from "@/components/sections/WhyWeCantWait";
import WhatWeAreBuilding from "@/components/sections/WhatWeAreBuilding";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhatWeAreBuilding />
      <WhyWeCantWait />
    </div>
  );
};

export default Index;
