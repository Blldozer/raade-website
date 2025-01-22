import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import InnovationStudios from "@/components/InnovationStudios";
import Conference from "@/components/Conference";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <InnovationStudios />
      <Conference />
    </div>
  );
};

export default Index;