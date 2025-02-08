
import Hero from "@/components/hero/Hero";
import WhyWeCantWait from "@/components/sections/WhyWeCantWait";
import WhatWeAreBuilding from "@/components/sections/WhatWeAreBuilding";
import FutureShowcase from "@/components/sections/FutureShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FutureShowcase />
      <WhyWeCantWait />
      <WhatWeAreBuilding />
    </div>
  );
};

export default Index;

